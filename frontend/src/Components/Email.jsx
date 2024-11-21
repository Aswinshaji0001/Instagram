import React, { useState } from 'react'
import "../css/Email.css"

const Email = () => {
    const [emp,setEmp]=useState({
        email:""
    });
    const handleChange=(e)=>{
        console.log(e.target.value);
        setEmp((pre)=>({
            ...pre,[e.target.name]:e.target.value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(emp);
        const res = await fetch("http://localhost:3000/api/otp",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emp)
        })
        console.log(res);
    }
  return (
<div>
        <div class="cos">
            <div class="container">
            <h1>Sign In</h1>
            <form id="forget" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleChange}/>
                </div>
                <button type="submit" class="btn">Send</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Email
