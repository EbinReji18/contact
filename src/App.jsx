import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import Home from './Pages/Home'
import Landing from './Pages/Landing'
import Header from './Components/Header'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
