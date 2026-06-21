import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components'
import { Home } from './pages';

function App() {
  return (
    <div className='w-screen flex flex-col'>
      <Header />

      <main className='w-full flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
