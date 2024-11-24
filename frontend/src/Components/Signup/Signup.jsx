import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import './css/Signup.css'


const Signup = () => {
    const navigate=useNavigate();
    const email=localStorage.getItem('email')
    const [user,setUser]=useState({
        username:"",
        email:email,
        password:"",
        cpassword:""

    });
    const handleChange=(e)=>{
        console.log(e.target.value);
        setUser((pre)=>({
            ...pre,[e.target.name]:e.target.value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(user);
        const res = await axios.post("http://localhost:3015/api/signup",user,{Headers:{"Content-Type":"application/json"}})
        console.log(res);
        console.log(res.data.msg);
        if(res.status==201){
            localStorage.removeItem('email')
            alert(res.data.msg)
            navigate('/login')
        }
        else{
            alert(res.data.msg);
        }

    }
  return (
    <div>
          <div className="cos">
<div className="container">
    <h1>Sign Up</h1>
    <form id="signup" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" id="cpassword" name="cpassword" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn">Sign Up</button>
    </form>
</div>
</div>
    </div>
  )
}

export default Signup;
