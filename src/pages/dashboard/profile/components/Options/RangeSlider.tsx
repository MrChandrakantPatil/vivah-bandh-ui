import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent,
} from 'react';
import { formatProfileRangeBound, getRangeDraft } from '../../utils';

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  value: {
    min: string;
    max: string;
  };
  onChange: (value: { min: string; max: string }) => void;
  disabled?: boolean;
}

export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  unit = '',
  value,
  onChange,
  disabled = false,
}: RangeSliderProps) {  
  const [activeThumb, setActiveThumb] = useState<'min' | 'max'>('min');

  const trackRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<{
    startX: number;
    startMin: number;
    startMax: number;
  } | null>(null);

  const normalizedLabel = label.toLowerCase();

  const isAgeField = normalizedLabel.includes('age');

  const isHeightField = normalizedLabel.includes('height');

  const minGap = isAgeField ? 3 : isHeightField ? 6 : step;

  const rangeUnit = isAgeField ? 'years' : isHeightField ? 'inches' : unit;

  const clamp = (number: number, lower: number, upper: number) =>
    Math.min(Math.max(number, lower), upper);

  const snap = (number: number) =>
    min + Math.round((number - min) / step) * step;

  const range = useMemo(() => {
    const normalized = getRangeDraft(
      { min, max, step, suffix: rangeUnit },
      value,
    );

    return { min: Number(normalized.min), max: Number(normalized.max) };
  }, [value, min, max, step, rangeUnit]);

  const rangeDifference = max - min;

  const minPercentage =
    rangeDifference > 0 ? ((range.min - min) / rangeDifference) * 100 : 0;

  const maxPercentage =
    rangeDifference > 0 ? ((range.max - min) / rangeDifference) * 100 : 100;

  const formatValue = (number: number) =>
    formatProfileRangeBound(number, rangeUnit);

  const updateRange = (newMin: number, newMax: number) => {
    onChange({
      min: String(newMin),
      max: String(newMax),
    });
  };

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActiveThumb('min');

    const newMin = clamp(snap(Number(event.target.value)), min, max - minGap);

    const newMax = Math.max(range.max, newMin + minGap);

    updateRange(newMin, Math.min(newMax, max));
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActiveThumb('max');

    const newMax = clamp(snap(Number(event.target.value)), min + minGap, max);

    const newMin = Math.min(range.min, newMax - minGap);

    updateRange(Math.max(newMin, min), newMax);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    dragRef.current = {
      startX: event.clientX,
      startMin: range.min,
      startMax: range.max,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || !trackRef.current) return;

    const width = trackRef.current.getBoundingClientRect().width;

    if (!width) return;

    const delta = ((event.clientX - drag.startX) / width) * rangeDifference;

    const snappedDelta = Math.round(delta / step) * step;

    const selectedWidth = drag.startMax - drag.startMin;

    const newMin = clamp(
      drag.startMin + snappedDelta,
      min,
      max - selectedWidth,
    );

    updateRange(newMin, newMin + selectedWidth);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="flex-1 min-h-0 p-4 overflow-y-auto sm:p-6">
      <p className="leading-5 text-slate-800 text-sm">
        Select a minimum {label.toLowerCase()} of{' '}
        <strong>
          {minGap} {rangeUnit}
        </strong>{' '}
        to get relevant matches.
      </p>

      <div className="relative px-3 py-8">
        <div ref={trackRef} className="relative h-1 bg-gray-300 rounded-md">
          <div
            className="absolute h-1 bg-teal-500 rounded-md"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
              cursor: disabled ? 'default' : 'grab',
              touchAction: 'none',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={range.min}
            disabled={disabled}
            onChange={handleMinChange}
            onPointerDown={() => setActiveThumb('min')}
            className="range-slider range-slider-min"
            style={{ zIndex: activeThumb === 'min' ? 5 : 3 }}
            aria-label={`Minimum ${label}`}
            aria-valuetext={formatValue(range.min)}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={range.max}
            disabled={disabled}
            onChange={handleMaxChange}
            onPointerDown={() => setActiveThumb('max')}
            className="range-slider range-slider-max"
            style={{ zIndex: activeThumb === 'max' ? 5 : 3 }}
            aria-label={`Maximum ${label}`}
            aria-valuetext={formatValue(range.max)}
          />
        </div>

        <div className="flex justify-between mt-3 text-gray-400 text-xs">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 font-medium text-gray-500 text-xs">
          Selected {label.toLowerCase()}
        </p>

        <div className="flex items-center gap-3">
          <div
            className="
              flex-1
              min-w-0 px-3 py-3
              bg-teal-50 rounded-xl border border-teal-100
            "
          >
            <p className="mb-1 text-gray-500 text-xs">Minimum</p>

            <p className="font-bold text-teal-700 text-lg">
              {formatValue(range.min)}
            </p>
          </div>

          <span className="font-medium text-gray-400 text-sm">to</span>

          <div
            className="
              flex-1
              min-w-0 px-3 py-3
              bg-teal-50 rounded-xl border border-teal-100
            "
          >
            <p className="mb-1 text-gray-500 text-xs">Maximum</p>
            
            <p className="font-bold text-teal-700 text-lg">
              {formatValue(range.max)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
