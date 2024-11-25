import React, { useEffect, useState } from 'react'
import './css/Posts.scss'
import img from './img/img.jpg';
import {Link} from 'react-router-dom'
import axios from 'axios';
const Profile = () => {
  const auth = localStorage.getItem('Auth');
  const [details,getDetails]=useState([""]);
    useEffect(()=>{
      getData();
    },[])
    const getData=async()=>{
      const res = await axios.get("http://localhost:3015/api/profile", { headers: { "Authorization": `Bearer ${auth}` } })
      console.log(res);
      if(res.status==201){
        getDetails(res.data.profile)
        
      }
    }
    console.log(details);
    
  return (
    <div>
            <div className="mainc">
                <div className="leftc">
                    <div className="pic">
                      <img src={details.profile} alt="" />
                    </div>
                    <div className="details">
                        <h3>{details.name}</h3>
                        <h3>{details.bio}</h3>
                        <h3>{details.dob}</h3>
                    </div>
                    <div className="buttons">
                      <Link to="/editprofile"><button className='button-3'>Edit Profile</button></Link>
                      <Link to="/addpost"><button className='button-4'>Add Post</button></Link>
                    </div>
                </div>
                <div className="rightc">
                        <h1>ALL POSTS</h1>
                </div>
            </div>
    </div>
  )
}

export default Profile;
