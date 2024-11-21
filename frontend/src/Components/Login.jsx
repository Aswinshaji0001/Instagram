import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:""

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
        const res = await fetch("http://localhost:3000/api/signin",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
        console.log(res);
        navigate('/')

    }
  return (
    <div>
    <div className="cos">
    <div className="container">
        <h1>Sign In</h1>
        <form id="signin" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn">Sign In</button>
        </form>
    </div>
</div>
    </div>
  )
}

export default Login
