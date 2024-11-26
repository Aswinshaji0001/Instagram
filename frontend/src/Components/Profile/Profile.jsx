import React, { useEffect, useState } from 'react'
import './css/Posts.scss'
import img from './img/img.jpg';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const Profile = ({setUser,setProfile}) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('Auth');
  const [details,getDetails]=useState({});
  const [posts,getPost]=useState([])
    useEffect(()=>{
      getData();
      getPosts();
    },[])
    const getData=async()=>{
      const res = await axios.get("http://localhost:3015/api/profile", { headers: { "Authorization": `Bearer ${auth}` } })
      // console.log(res);
      if(res.status==201){
        getDetails(res.data.profile)
        setUser(res.data.username)
        setProfile(res.data.profile.profile)
        
      }
      else{
        navigate('/')
      }
    }
    console.log(details);
    console.log(details.userid);
    const getPosts=async()=>{
      const res = await axios.get("http://localhost:3015/api/getposts", { headers: { "Authorization": `Bearer ${auth}` } })
      if(res.status==201){
          getPost(res.data.post)        
      }
      else{
        alert("error")
      }
    } 
    const logout=()=>{
      localStorage.removeItem('Auth')
      navigate('/login')
    }  
    const deleteAccount=async()=>{
      const id=details.userid;
      console.log(details.userid);
      const res = await axios.get(`http://localhost:3015/api/deleteuser/${id}`, { headers: { "Authorization": `Bearer ${auth}` } })
      if(res.status==201){
        console.log("success");
        
      }
      else{
        console.log("Failed");
        
      }
      
    } 
  return (
    <div>
            <div className="mainc">
                <div className="leftc">
                  <div className="all">
                  <div className="alldetails">
                  <div className="pic">
                    <div className="pics">
                    <img src={details.profile} alt="" />
                    </div>
                    </div>
                    <div className="details">
                        <h1>{details.name}</h1>
                        <h3>{details.bio}</h3>
                        <h3>{details.dob}</h3>
                    </div>
                  </div>
                  </div>
                    <div className="buttons">
                      <Link to="/editprofile"><button className='button-3'>{details?"Edit Profile":"Add Profile"}</button></Link>
                      <button className='button-5' onClick={deleteAccount}>Delete Account</button>
                      <button className='button-5' onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className="rightc">
                        <h1>ALL POSTS</h1>
                        <div className="btns">
                        <Link to="/addpost"><button className='button-4'>Add Post</button></Link>
                        </div>
                        <div className="posts" key={posts._id}>
                          {posts.map((post)=>
                           <div className="post">
                           <Link to={`/postdetails/${post._id}`}><img src={post.photos[0]} alt="" /></Link>
                           </div>
                          )}
                        </div>
                </div>
            </div>
    </div>
  )
}

export default Profile;
