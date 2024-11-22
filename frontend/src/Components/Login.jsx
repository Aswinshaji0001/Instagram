import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        const res = await axios.post("http://localhost:3000/api/signin",user,{Headers:{"Content-Type":"application/json"}})
        console.log(res);
        console.log(res.data.msg);
        if(res.status==200){
            sessionStorage.setItem('Auth',res.data.token)
            alert(res.data.msg)
            navigate('/')
        }
        else{
            alert(res.data.msg);
        }

    }
  return (
    <div>
    <div className="cos">
    <div className="container">
        <h1 className='title'>Instagram</h1>
        <form id="signin" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange}/>
            </div>
            <Link to="/email">Verify mail</Link>
            <button type="submit" className="btn">Sign In</button>
        </form>
    </div>
</div>
    </div>
  )
}

export default Login
