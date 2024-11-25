import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './css/Home.scss'


const Home = ({ setUser,setProfile }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('Auth');
  // console.log(auth);
  useEffect(() => {
    getUser();
  },[])
  const getUser = async () => {
    if(auth!==null){
      console.log("res");
      const res = await axios.get("http://localhost:3015/api/home", { headers: { "Authorization": `Bearer ${auth}` } })
      if (res.status == 200) {
        // console.log(res.data);
        setUser(res.data.username);
        setProfile(res.data.profile.profile);
        // console.log(res);
      }
      else if(res.status==403){
        alert("error")
        navigate("/login")
      }
      else{
        alert("error")
        navigate("/login")
      }
    }
    else{
      navigate('/login')
    }
    }
     
  return (
    <div>
      <h1>HOME</h1>
    </div>
  )
}

export default Home;
