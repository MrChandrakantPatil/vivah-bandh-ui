import { Telescope } from 'lucide-react';

export function Help() {
  return (
    <div className="flex items-center justify-center mt-50">
      <div className="flex flex-col items-center text-center">
        <Telescope size={125} strokeWidth={1.5} className="text-(--primary)" />
        <div>
          <h1 className="font-bold text-(--text-primary) text-3xl">
            Coming Soon!
          </h1>

          <p className="mt-1.5 text-(--text-secondary) text-lg">
            We're working on something exciting. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
