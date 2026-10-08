import { Route, Routes } from 'react-router-dom';

import { PublicLayout } from '../layouts/public';
import { DashboardLayout } from '@/layouts/dashboard';
import { AuthLayout } from '@/layouts/auth';

import { Home } from '@/pages/public/home';
import { About } from '@/pages/public/about';

import { Login } from '@/pages/auth/login';
import { Register } from '@/pages/auth/register';

import { Dashboard } from '@/pages/dashboard/home';
import { Matches } from '@/pages/dashboard/matches';
import { Profile } from '@/pages/dashboard/profile';
import { Settings } from '@/pages/dashboard/settings';
import { Help } from '@/pages/dashboard/help';
import { Upgrade } from '@/pages/dashboard/upgrade';

import { PublicRoute, ProtectedRoute } from '@/features/auth';

import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help-and-support" element={<Help />} />
            <Route path="/upgrade" element={<Upgrade />} />
          </Route>
        </Route>
      </Routes>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
