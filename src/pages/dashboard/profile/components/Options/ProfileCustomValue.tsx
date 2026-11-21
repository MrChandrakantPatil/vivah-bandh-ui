import { useState } from 'react';
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { formatProfileBirthTime } from '../../utils';
import { SelectOption } from '@/components';
import type { ProfileViewFieldConfig } from '../../types';

interface ProfileCustomValueProps {
  field: ProfileViewFieldConfig;
  value: string;
  onChange: (value: string) => void;
  isSaving?: boolean;
  error?: string | null;
}

export function ProfileCustomValue({
  field,
  value,
  onChange,
  isSaving = false,
  error,
}: ProfileCustomValueProps) {
  const inputType =
    field.type === 'number' || field.type === 'date' || field.type === 'time'
      ? field.type
      : 'text';

  const inputId = `profile-field-${field.key}`;

  const [storedHour, storedMinute] = value.split(':');

  const initialTime = {
    source: value,
    hour:
      storedHour && /^\d{2}$/.test(storedHour)
        ? String(Number(storedHour) % 12 || 12).padStart(2, '0')
        : '',
    minute: storedMinute ?? '',
    period: Number(storedHour) >= 12 ? 'PM' : 'AM',
  };

  const [time, setTime] = useState(initialTime);

  if (field.type === 'time' && time.source !== value) setTime(initialTime);

  if (field.type === 'time') {
    const hourValid =
      /^\d{1,2}$/.test(time.hour) &&
      Number(time.hour) >= 1 &&
      Number(time.hour) <= 12;

    const minuteValid =
      /^\d{1,2}$/.test(time.minute) && Number(time.minute) <= 59;

    const updateTime = (
      part: 'hour' | 'minute' | 'period',
      nextValue: string,
    ) => {
      if (isSaving || (part !== 'period' && !/^\d{0,2}$/.test(nextValue)))
        return;

      const next = { ...time, [part]: nextValue };

      const valid =
        /^\d{1,2}$/.test(next.hour) &&
        Number(next.hour) >= 1 &&
        Number(next.hour) <= 12 &&
        /^\d{1,2}$/.test(next.minute) &&
        Number(next.minute) <= 59;

      const source = valid
        ? `${String((Number(next.hour) % 12) + (next.period === 'PM' ? 12 : 0)).padStart(2, '0')}:${next.minute.padStart(2, '0')}`
        : !next.hour && !next.minute
          ? ''
          : 'invalid';

      setTime({ ...next, source });
      onChange(source);
    };

    const stepTime = (part: 'hour' | 'minute', direction: number) => {
      const min = part === 'hour' ? 1 : 0;
      const max = part === 'hour' ? 12 : 59;
      const current = time[part] === '' ? min - direction : Number(time[part]);
      const next = Math.min(max, Math.max(min, current + direction));
      updateTime(part, String(next).padStart(2, '0'));
    };

    const timeParts = [
      {
        key: 'hour' as const,
        label: 'Hour',
        value: time.hour,
        placeholder: 'HH',
        valid: hourValid,
        hint: '01-12',
      },
      {
        key: 'minute' as const,
        label: 'Minute',
        value: time.minute,
        placeholder: 'MM',
        valid: minuteValid,
        hint: '00-59',
      },
    ];

    return (
      <div className="flex-1 min-h-0 p-4 overflow-y-auto sm:p-6">
        <fieldset
          disabled={isSaving}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
        >
          <p
            id={`${inputId}-hint`}
            className="mb-2 leading-5 text-slate-500 text-xs"
          >
            Enter the hour and minute, then choose AM or PM.
          </p>

          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-3 gap-3">
              {timeParts.map((part) => (
                <div key={part.key}>
                  <label
                    htmlFor={`${inputId}-${part.key}`}
                    className="
                      block
                      mb-2
                      tracking-wide font-medium text-slate-500 text-[11px]
                      uppercase
                    "
                  >
                    {part.label}{' '}
                    <span
                      id={`${inputId}-${part.key}-hint`}
                      className={`
                        mt-1.5
                        text-[11px]
                        ${
                          part.value && !part.valid
                            ? 'text-red-600'
                            : 'text-slate-400'
                        }
                      `}
                    >
                      ({part.hint})
                    </span>
                  </label>

                  <div className="relative">
                    <input
                      id={`${inputId}-${part.key}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      value={part.value}
                      placeholder={part.placeholder}
                      required={field.required}
                      aria-invalid={Boolean(part.value && !part.valid)}
                      aria-describedby={`${inputId}-${part.key}-hint`}
                      onChange={(event) =>
                        updateTime(part.key, event.target.value)
                      }
                      onBlur={() => {
                        if (part.valid)
                          updateTime(part.key, part.value.padStart(2, '0'));
                      }}
                      className={`
                        w-full h-10 pr-9 pl-3
                        bg-white rounded-xl border
                        font-semibold text-slate-800 text-base text-center
                        transition
                        disabled:opacity-60 focus:ring-2
                        tabular-nums outline-none
                        ${
                          part.value && !part.valid
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                            : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
                        }
                      `}
                    />

                    <div
                      className="
                        absolute inset-y-1 right-1
                        flex flex-col
                        w-7
                        rounded-lg border-l border-slate-100
                        overflow-hidden
                      "
                    >
                      <button
                        type="button"
                        aria-label={`Increase ${part.label.toLowerCase()}`}
                        disabled={
                          isSaving ||
                          (part.valid &&
                            Number(part.value) >=
                              (part.key === 'hour' ? 12 : 59))
                        }
                        onClick={() => stepTime(part.key, 1)}
                        className="
                          flex flex-1 items-center justify-center
                          text-slate-500
                          hover:bg-teal-50 disabled:opacity-30 hover:text-teal-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500
                        "
                      >
                        <ChevronUp size={15} aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        aria-label={`Decrease ${part.label.toLowerCase()}`}
                        disabled={
                          isSaving ||
                          (part.valid &&
                            Number(part.value) <= (part.key === 'hour' ? 1 : 0))
                        }
                        onClick={() => stepTime(part.key, -1)}
                        className="
                          flex flex-1 items-center justify-center
                          border-t border-slate-100
                          text-slate-500
                          hover:bg-teal-50 disabled:opacity-30 hover:text-teal-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500
                        "
                      >
                        <ChevronDown size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div role="group" aria-labelledby={`${inputId}-period-label`}>
                <span
                  id={`${inputId}-period-label`}
                  className="
                    block
                    mb-2
                    tracking-wide font-medium text-slate-500 text-[11px]
                    uppercase
                  "
                >
                  AM / PM
                </span>

                <SelectOption
                  value={time.period}
                  onChange={(period) => updateTime('period', period)}
                  options={[
                    { label: 'AM', value: 'AM' },
                    { label: 'PM', value: 'PM' },
                  ]}
                  disabled={isSaving}
                  className="[&>button]:h-10 mt-0"
                />
              </div>
            </div>

            <div
              className="
                flex items-center gap-2.5
                pt-4 mt-4
                border-t border-slate-200/80
                text-teal-700
              "
              aria-live="polite"
            >
              <Clock size={17} aria-hidden="true" />

              <span className="font-medium text-sm">
                {value
                  ? formatProfileBirthTime(value)
                  : 'Select your birth time'}
              </span>
            </div>
          </div>

          {error && (
            <p
              id={`${inputId}-error`}
              role="alert"
              className="mt-2 text-red-600 text-xs"
            >
              {error}
            </p>
          )}
        </fieldset>
      </div>
    );
  }

  const stepNumber = (direction: number) => {
    if (isSaving) return;
    const min = field.min ?? 0;
    const step = field.step ?? 1;
    const current =
      value.trim() === '' || !Number.isFinite(Number(value))
        ? min - direction * step
        : Number(value);
    const next = Math.min(
      field.max ?? Infinity,
      Math.max(min, current + direction * step),
    );
    onChange(String(Number(next.toFixed(10))));
  };

  return (
    <div className="flex-1 min-h-0 p-4 overflow-y-auto sm:p-6">
      <div className="relative">
        <input
          id={inputId}
          aria-label={field.label}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={
            field.placeholder ?? `Enter ${field.label.toLowerCase()}`
          }
          required={field.required}
          maxLength={inputType === 'text' ? 200 : undefined}
          min={inputType === 'number' ? (field.min ?? 0) : undefined}
          max={inputType === 'number' ? field.max : undefined}
          step={inputType === 'number' ? (field.step ?? 1) : undefined}
          disabled={isSaving}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            w-full px-4 py-3
            bg-white rounded-xl border border-slate-200
            text-slate-700 text-sm
            transition
            disabled:opacity-60 focus:border-teal-500 focus:ring-2 focus:ring-teal-100
            outline-none
            ${
              inputType === 'number'
                ? 'pr-10 appearance-textfield [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                : ''
            }
          `}
        />

        {inputType === 'number' && (
          <div
            className="
              absolute inset-y-1 right-1
              flex flex-col
              w-7
              rounded-lg border-l border-slate-100
              overflow-hidden
            "
          >
            <button
              type="button"
              aria-label={`Increase ${field.label.toLowerCase()}`}
              disabled={
                isSaving ||
                (value !== '' &&
                  field.max != null &&
                  Number(value) >= field.max)
              }
              onClick={() => stepNumber(1)}
              className="
                flex flex-1 items-center justify-center
                text-slate-500
                hover:bg-teal-50 disabled:opacity-30 hover:text-teal-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500
              "
            >
              <ChevronUp size={15} aria-hidden="true" />
            </button>
            
            <button
              type="button"
              aria-label={`Decrease ${field.label.toLowerCase()}`}
              disabled={
                isSaving || (value !== '' && Number(value) <= (field.min ?? 0))
              }
              onClick={() => stepNumber(-1)}
              className="
                flex flex-1 items-center justify-center
                border-t border-slate-100
                text-slate-500
                hover:bg-teal-50 disabled:opacity-30 hover:text-teal-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500
              "
            >
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-2 text-red-600 text-xs"
        >
          {error}
        </p>
      )}
    </div>
  );
}
