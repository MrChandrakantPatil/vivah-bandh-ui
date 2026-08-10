import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { DashboardLayout } from '@/pages/Dashboard/DashboardLayout';
import { Home } from '@/pages/Home/Home';
import { Dashboard } from '@/pages/Dashboard/pages/Home/DashboardHome';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="w-screen flex flex-col">
      {!isDashboard && <Header />}

      <main className="w-full flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
