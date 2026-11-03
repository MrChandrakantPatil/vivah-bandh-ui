import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export interface MoreModalData {
  title: string;
  values: string[];
}

interface MoreModalProps {
  isOpen: boolean;
  data: MoreModalData | null;
  children?: ReactNode;
  onClose: () => void;
  maxWidth?: string;
}

export function MoreModal({
  isOpen,
  data,
  children,
  onClose,
  maxWidth = 'max-w-md',
}: MoreModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
        bg-black/40
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="more-modal-title"
        onClick={(event) => event.stopPropagation()}
        className={`
          w-full p-5
          bg-white shadow-xl rounded-2xl
          ${maxWidth}
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="more-modal-title" className="font-semibold text-slate-800">
            {data.title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              p-2 ml-auto
              rounded-full
              text-slate-400
              transition
              hover:bg-slate-100 hover:text-slate-700
            "
          >
            <X size={18} />
          </button>
        </div>

        {children ?? (
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {data.values.map((value, index) => (
              <div
                key={`${value}-${index}`}
                className="px-3 py-2 bg-pink-50 rounded-lg text-pink-700 text-sm"
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
