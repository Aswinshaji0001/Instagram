import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Email from './Components/Email'
import Signup from './Components/Signup'
import Login from './Components/Login'
function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
            <Route path="/" Component={Home}> </Route>
            <Route path="/email" Component={Email}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route path="/login" Component={Login}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
