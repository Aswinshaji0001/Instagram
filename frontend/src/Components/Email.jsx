import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "../css/Email.css"


const Email = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:""
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
        const res = await fetch("http://localhost:3000/api/otp",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)

        })
        navigate('/login')
        console.log(res);
    }
  return (
<div>
        <div className="cos">
            <div className="container">
            <h1>Sign In</h1>
            <form id="forget" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn">Send</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Email
