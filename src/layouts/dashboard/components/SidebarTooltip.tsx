import { createPortal } from 'react-dom';
import type { SidebarTooltipProp } from '../types';

export function SidebarTooltip({
  visible,
  label,
  position,
}: SidebarTooltipProp) {
  if (!visible || !position) return null;

  return createPortal(
    <div
      className="fixed z-99"
      style={{
        left: position.left,
        top: position.top,
        transform: 'translateY(-50%)',
      }}
    >
      <div className="relative">
        <div
          className="
            absolute top-1/2
            w-2 h-2
            bg-slate-900
            -left-1 -translate-y-1/2 rotate-45
          "
        />

        <div
          className="
            px-3 py-2
            bg-slate-900 shadow-lg rounded-lg
            whitespace-nowrap text-white text-sm
          "
        >
          {label}
        </div>
      </div>
    </div>,
    document.body,
  );
}
