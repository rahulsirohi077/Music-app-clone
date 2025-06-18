import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<SignUp/>} path='/signup'/>
        </Routes>
        <Toaster position="Bottom-center" />
      </BrowserRouter>
    </>
  )
}

export default App
