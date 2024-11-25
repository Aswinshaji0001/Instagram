import React, { useEffect, useState } from 'react'
import './css/Posts.scss'
import img from './img/img.jpg';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const Profile = ({setUser,setProfile}) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('Auth');
  const [details,getDetails]=useState([]);
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
    // console.log(details);
    const getPosts=async()=>{
      const res = await axios.get("http://localhost:3015/api/getposts", { headers: { "Authorization": `Bearer ${auth}` } })
      console.log(res);
      if(res.status==201){
          getPost(res.data.post)        
      }
      else{
        alert("error")
      }
    }
    console.log(posts);
    
  return (
    <div>
            <div className="mainc">
                <div className="leftc">
                    <div className="pic">
                      <img src={details.profile} alt="" />
                    </div>
                    <div className="details">
                        <h3>Name :{details.name}</h3>
                        <h3>Bio :{details.bio}</h3>
                        <h3>DOB :{details.dob}</h3>
                    </div>
                    <div className="buttons">
                      <Link to="/editprofile"><button className='button-3'>Edit Profile</button></Link>
                      <Link to="/addpost"><button className='button-4'>Add Post</button></Link>
                    </div>
                </div>
                <div className="rightc">
                        <h1>ALL POSTS</h1>
                        <div className="posts">
                          {posts.map((post)=>
                           <div className="post">
                           <img src={post.photos[0]} alt="" />
                           </div>
                          )}
                        </div>
                </div>
            </div>
    </div>
  )
}

export default Profile;
