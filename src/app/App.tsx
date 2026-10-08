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
          </Route>
        </Route>
      </Routes>

      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
