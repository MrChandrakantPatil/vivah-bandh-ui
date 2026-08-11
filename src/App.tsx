import { Route, Routes } from 'react-router-dom';

import { PublicLayout } from './layouts/public';
import { DashboardLayout } from '@/layouts/dashboard';

import { Home } from '@/pages/public/home';
import { About } from '@/pages/public/about';

import { Dashboard } from '@/pages/dashboard/home';
import { Chats } from '@/pages/dashboard/chats';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/matches" element={<Chats />} />
      </Route>
    </Routes>
  );
}

export default App;
