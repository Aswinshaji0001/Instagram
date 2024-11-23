import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "../css/Email.css"
import axios from 'axios'

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
        const res = await axios.post("http://localhost:3015/api/otp",user,{Headers:{"Content-Type":"application/json"}})
        console.log(res);
        console.log(res.data.msg);
        if(res.status==201){
            localStorage.setItem('email',user.email)
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

export default Email;
