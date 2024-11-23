import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Email from './Components/Email'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Nav from './Components/Nav'
function App() {
  const [user,setUser]=useState("")
  console.log(`appuser ${user}`);
  
  return (
    <>
       <BrowserRouter>
       {user&& <Nav user={user}/>}
        <Routes>
            <Route path="/" element={<Home setUser={setUser}/>}> </Route>
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
