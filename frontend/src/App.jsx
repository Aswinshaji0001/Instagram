import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Email from './Components/Email/Email'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Nav from './Components/Nav/Nav'
import AddProfile from './Components/AddProfile/AddProfile'
function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")
  console.log(`appuser ${user}`);
  console.log(`appuser ${profile}`);
  
  return (
    <>
       <BrowserRouter>
       {user&& <Nav user={user} profile={profile}/>}
        <Routes>
            <Route path="/" element={<Home setUser={setUser} setProfile={setProfile}/>}> </Route>
            <Route path="/email" Component={Email}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/editprofile" element={<AddProfile setUser={setUser} setProfile={setProfile}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
