import React from 'react'
import { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './css/Add.scss'
import axios from 'axios'

const AddProfile = ({ setUser,setProfile }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('Auth');
  const [details,setDetails]=useState({
    userid:"",
    name:"",
    dob:"",
    bio:"",
    profile:""
})
useEffect(()=>{
  getDetails();
},[])
const getDetails=async()=>{
  if(auth!==null){
    try{
      const res = await axios.get("http://localhost:3015/api/profile", { headers: { "Authorization": `Bearer ${auth}` } })
      console.log(res);
      if(res.status==201){
        console.log(res.data.username);
        setUser(res.data.username)
        setProfile(res.data.profile.profile)
        setDetails(res.data.profile)

      }
      else if(res.status==403){
        alert("Error")
      }
    }catch(error){
      console.log(error);
      
    }
    }
}   
const handleChange=(e)=>{
    console.log(e.target.value);
    setDetails((pre)=>({
        ...pre,[e.target.name]:e.target.value
    }))
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(details);
    const res = await axios.put("http://localhost:3015/api/edituser",details,{headers:{"Content-Type":"application/json"}})
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
      navigate("/profile")
    }
    else{
      alert(res.data.msg)
    }
}

const handleFile=async(e)=>{
    console.log(e.target.files[0]);
    const profile = await convertTBase64(e.target.files[0]);
    console.log(profile);
    setDetails((pre)=>({...pre,profile:profile}))
}

function convertTBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    });
}
  return (
    <div>
          <div className="addform">
          <form id="frm" onSubmit={handleSubmit}>

                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" onChange={handleChange} name="name" required/>

                  <div className="prf" >
                      <img src="" className="prfimg" id="proimg" alt=""/>
                  </div>

                  <label htmlFor="profile">Profile</label>
                  <input type="file" id="profile" name="profile" onChange={handleFile} required/>

                  <label htmlFor="bio">Bio</label>
                  <input type="text" id="bio" name="bio" onChange={handleChange} required/>

                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" id="dob" name="dob" onChange={handleChange} required/>
                  <div className="buttons">
                      <button>Submit</button>
                      <button type="reset">Reset</button>
                  </div>
                  </form>
          </div>
    </div>
  )
}

export default AddProfile
