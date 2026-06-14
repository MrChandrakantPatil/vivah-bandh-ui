import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components'
import { HomePage } from './pages';

function App() {
  return (
    <div className='w-screen flex flex-col'>
      <Header />

      <main className='w-full flex-1'>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
