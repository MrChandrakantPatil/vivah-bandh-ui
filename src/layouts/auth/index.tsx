import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="grid grid-cols-1 min-h-screen p-0 bg-[#fff9fb]">
      <Outlet />
    </div>
  );
}
