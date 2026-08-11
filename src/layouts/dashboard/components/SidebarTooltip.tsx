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
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-slate-900" />

        <div className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>,
    document.body,
  );
}
