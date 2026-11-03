import { logoIcon } from '@/assets/images';

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
}

export function Loader({
  fullScreen = false,
  text = 'Finding your perfect match...',
}: LoaderProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        ${fullScreen ? 'fixed inset-0 z-50 bg-white' : 'w-full min-h-75'}
      `}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="
            w-16 h-16
            rounded-full border-5 border-pink-100 border-t-[#ea0a55]
            animate-spin
          "
        />

        <div className="absolute">
          <img src={logoIcon} alt="Logo" className="w-8 animate-pulse" />
        </div>
      </div>

      <p className="font-medium text-gray-500 text-sm">{text}</p>
    </div>
  );
}
