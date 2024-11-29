import React from 'react'
import './css/PostDetails.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import img from './img/img.jpg';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostDetails = ({setUser,setProfile}) => {
  const {id} = useParams();
  console.log(id);
  const auth = localStorage.getItem('Auth');
  const [posts,getPost]=useState({})
  const [photos,getPhotos]=useState([])
  const [details,getDetails]=useState({});
  useEffect(()=>{
    getData();
    getPosts();
  },[])
  const getData=async()=>{
    const res = await axios.get("http://localhost:3015/api/profile", { headers: { "Authorization": `Bearer ${auth}` } })
    // console.log(res);
    if(res.status==201){
      setUser(res.data.username)
      setProfile(res.data.profile.profile)
      getDetails(res.data.profile)
    }
    else{
      navigate('/')
    }
  }
  // console.log(details);
  const getPosts=async()=>{
    const res = await axios.get(`http://localhost:3015/api/getpost/${id}`, { headers: { "Authorization": `Bearer ${auth}` } })
    // console.log(res);
    if(res.status==201){
      // console.log(res.data.post.photos[0]);
        getPost(res.data.post);
        getPhotos([...res.data.post.photos])   
    }
    else{
      alert("error")
    }
  }  
  console.log(photos[0]);
  return (
    <div>
      <div className="pcontainer">
        <div className="pc">
                <div className="leftp">
                    <div className="images">
                    {
                      photos.map((photo,ind)=><img src={photo} alt="" key={ind}/>)
                    }
                    </div>
                </div>
                <div className="rightp">
                  <div className="detailsp">
                        <h1>{posts.description}</h1>
                        <h3>{posts.postTime}</h3>
                        <h3>{posts.postDate}</h3>
                  </div>
                        
                </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
