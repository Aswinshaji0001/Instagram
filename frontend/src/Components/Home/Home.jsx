import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './css/Home.scss'
import like from './img/like.png'


const Home = ({ setUser,setProfile }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('Auth');
  const [posts,getPosts]=useState([]);
  // console.log(auth);
  useEffect(() => {
    getUser();
    getAllPosts();
  },[])
  const getUser = async () => {
    if(auth!==null){
      const res = await axios.get("http://localhost:3015/api/home", { headers: { "Authorization": `Bearer ${auth}` } })
      if (res.status == 200) {
        // console.log(res.data);
        setUser(res.data.username);
        setProfile(res.data.profile.profile);
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
    const getAllPosts= async()=>{
      const res = await axios.get("http://localhost:3015/api/getallposts")
      // console.log(res);
      getPosts(res.data.post);
    }
    // console.log(posts);
  const LikePost= async(id)=>{
    console.log(id);
    const res = await axios.post("http://localhost:3015/api/addlike",{id},{ headers: { "Authorization": `Bearer ${auth}` } })
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
    }
    else{
      alert("error")
    }
    
  }
  return (
    <div>
      <h1>HOME</h1>
      <div className="posts" key={posts._id}>
                          { posts.map((post,ind)=>
                           <div className="post" key={ind}>
                           <Link to={`/postdetails/${post._id}`}><img src={post.photos[0]} alt="" /></Link><hr />
                           <div className="like">
                            <img src={like} onClick={()=>LikePost(post._id)} alt="" />
                            <p>{post.likes.length}</p>
                            </div>
                           </div>
                          )}
        </div>
    </div>

  )
}

export default Home;
