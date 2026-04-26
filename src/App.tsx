import { HashRouter, Routes, Route } from 'react-router';
import './App.css'
import Home from './pages/home';

function App() {

  return (
    <>
    <HashRouter>
      {/* 2. Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
