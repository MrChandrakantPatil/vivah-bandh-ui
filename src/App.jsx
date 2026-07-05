import { Route, Routes, useLocation } from 'react-router-dom';
import { Header, Footer } from './components'
import { DashboardLayout } from "./components/dashboard";
import { Home, Dashboard } from './pages';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className='w-screen flex flex-col'>
      {!isDashboard && <Header />}

      <main className='w-full flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </main>

      {!isDashboard && <Footer />}
    </div>
  )
}

export default App
