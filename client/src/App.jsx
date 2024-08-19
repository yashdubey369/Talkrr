import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import { Navigate,Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext'

function App() {
  const {authUser}=useAuthContext();
  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center'>
       
       <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/signup' element={authUser?<Navigate to="/"/>:<SignUp/>}/>
        <Route path='/login' element={authUser?<Navigate to="/"/>: <Login/>}/>
       </Routes>
       <Toaster/>
    </div>
    </>
  )
}

export default App
