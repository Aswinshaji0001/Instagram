import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
const AddPost = ({setUser,setProfile}) => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('Auth');
    const [photos,setPhotos]=useState([])
    const [post,setPost]=useState({
      userId:"",
      description:""
  })
  useEffect(()=>{
    PostAdd();
  },[])
 const PostAdd=async()=>{
    if(auth!==null){
        try{
          const res = await axios.get("http://localhost:3015/api/profile", { headers: { "Authorization": `Bearer ${auth}` } })
          console.log(res);
          if(res.status==201){
            console.log(res.data.username);
            setUser(res.data.username)
            setProfile(res.data.profile.profile)
            setPost({userId:res.data.profile.userid})
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
        setPost((pre)=>({
            ...pre,[e.target.name]:e.target.value
        }))
    } 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(post);
        const res = await axios.post("http://localhost:3015/api/addpost",{...post,photos},{headers:{"Content-Type":"application/json"}})
        console.log(res);
        if(res.status==201){
          alert(res.data.msg)
          navigate("/profile")
        }
        else if(res.status==403){
          alert(res.data.msg)
        }
        else{
          alert(res.data.msg)
        }
    }
    const handleFile=async(e)=>{
        const arr=Object.values(e.target.files)
        console.log(arr);
        arr.map(async(m)=>{
          const photos=await convertToBase64(m)
          setPhotos((pre)=>([...pre,photos]))
        })
      }
    
    function convertToBase64(file){
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
       <div className="addform" onSubmit={handleSubmit}>
          <form id="frm" >

                  <div className="prf" >
                      <img src="" className="prfimg" id="proimg"  alt=""/>
                  </div>

                  <label htmlFor="photos">Photos</label>
                  <input type="file" id="photos" name="photos" onChange={handleFile} accept="image/*" multiple/>

                  <label htmlFor="description">Description</label>
                  <input type="text" id="description" name="description" onChange={handleChange} required/>

                  <div className="buttons">
                      <button>Submit</button>
                      <button type="reset">Reset</button>
                  </div>
                  </form>
          </div>
    </div>
  )
}
export default AddPost
