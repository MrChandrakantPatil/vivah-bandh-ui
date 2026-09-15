import { AlertCircle, RefreshCw } from 'lucide-react';
import { Loader } from '@/components/Loader/Loader';

interface DataStateProps {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;

  loadingText?: string;
  emptyMessage?: string;

  onRetry?: () => void;
}

export function DataState({
  isLoading,
  error,
  isEmpty,
  loadingText = 'Loading...',
  emptyMessage = 'No data found.',
  onRetry,
}: DataStateProps) {
  if (isLoading) {
    return <Loader text={loadingText} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div
          className="
            flex items-center justify-center
            w-14 h-14 mb-4
            bg-red-50 rounded-full
          "
        >
          <AlertCircle size={28} className="text-red-500" />
        </div>

        <h3 className="font-semibold text-gray-800 text-lg">
          Something went wrong
        </h3>

        <p className="max-w-sm mt-2 text-gray-500 text-sm">{error}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              flex items-center gap-2
              px-5 py-2.5 mt-5
              bg-[#ea0a55] shadow-sm rounded-lg
              font-medium text-white text-sm
              transition-all duration-200
              hover:bg-[#d4084b] hover:shadow-md active:scale-95
            "
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="py-10 text-gray-500 text-center">{emptyMessage}</div>
    );
  }

  return null;
}
