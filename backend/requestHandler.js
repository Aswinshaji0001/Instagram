import userSchema from './models/user.model.js'
import profileSchema from './models/profile.model.js';
import postSchema from './models/post.model.js';
import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const {sign}=pkg;

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "aswinshaji0001@gmail.com",
      pass: "qauv folf fqwa lajb",
    },
  });

export async function signUp(req,res) {
    try{
        const {email,username,password,cpassword } = req.body;
        console.log(email,username,password,cpassword);
        if(!(email&& username&& password&& cpassword))
            return res.status(404).send({msg:"fields are empty"})
        if(password !== cpassword)
            return res.status(404).send({msg:"password not matching"})
          const user=await userSchema.findOne({email:email})
          console.log(user);
        bcrypt
        .hash(password,10)
        .then((hashedPassword)=>{
            console.log(hashedPassword);
            userSchema
            .updateOne({email},{$set:{username,password:hashedPassword}})
            .then (async()=>{
              const data=await profileSchema.create({userid:user._id})
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"not registered"})

            })
        })
    }
     catch(error){
        return res.status(404).send({msg:"error"})

    }
    
}

export async function signIn(req,res) {
   try {
    console.log(req.body);
    const{email,password}=req.body;
    const user=await userSchema.findOne({email});
    console.log(user);
    if(!(email&& password))
        return res.status(404).send({msg:"fields are empty"});
    if(user===null){
        return res.status(404).send({msg:"Invalid username"});
    }
    const success=await bcrypt.compare(password,user.password);
    console.log(success);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"});

    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    console.log(token);
    return res.status(200).send({msg:"successfully logged in",token})
   
   } catch (error) {
    return res.status(404).send({msg:"error"})
   }
}


export async function verifyMail(req,res) {
try{

    const {email}=req.body;
    console.log(req.body);
    // send mail with defined transport object
   const info = await transporter.sendMail({
       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
       to: `${email}`, // list of receivers
       subject: "OTP", // Subject line
       text: "your otp", // plain text body
       html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                font-size: 24px;
                color: #333333;
              }
              p {
                font-size: 16px;
                color: #555555;
              }
              .button {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                font-size: 18px;
                border-radius: 4px;
                margin-top: 20px;
                text-transform: uppercase;
              }
            </style>verifyMail
            </head>
            <body>
            <div class="container">
              <h1>Email Verification</h1>
              <p>Click the button below to verify your email address:</p>
              
              <a href="http://localhost:5173/signup" class="button">Verify Email</a>
            </div>
            </body>
            </html>
`, // html body
   });

   console.log("Message sent: %s", info.messageId);
   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
   userSchema.create({email}).then(()=>{
    return res.status(201).send({msg:"confirmation mail set success",email});
   })
}
catch(error){
  return res.status(404).send({msg:'error'})
}
}
export async function cou(req,res) {
  userSchema.deleteMany({}).then((e)=>{
    console.log(e);
    
  }).catch((error)=>{
    console.log("err");
    
  })
}

export async function Home(req,res) {
  try {
    // console.log("home");
    console.log(req.user.userId);
    const _id=req.user.userId;
    const user = await userSchema.findOne({_id});
    const profile = await profileSchema.findOne({userid:_id});
    // console.log(profile);
    // console.log(user);
    if(!user) 
        return res.status(403).send({msg:"Unauthorized access"})
    res.status(200).send({username:user.username,profile})
    
} catch (error) {
    res.status(404).send({msg:error})
}
}

export async function editUser(req,res){
  try{
      const {...profile}=req.body;
      // console.log(profile);
      const data=await profileSchema.updateOne({userid:profile.userid},{$set:{...profile}});
      return res.status(201).send({msg:"Edited Success"})        
  }catch(error){
      res.status(404).send({msg:error})
  }
}

export async function Profile(req,res) {
  try{
    const _id=req.user.userId;
    const profile = await profileSchema.findOne({userid:_id});
    const user =await userSchema.findOne({_id},{username:1});
    return res.status(201).send({profile,username:user.username})
  }
  catch{
    res.status(404).send({msg:error})

  }

}
export async function addPost(req,res){
  try{
      const{...post}=req.body;
       const data=await postSchema.create({...post});
      //  console.log(data);
      return res.status(201).send({msg:"success"})
  }catch(error){
      res.status(404).send({msg:error})
  }
}
export async function getPosts(req,res) {
  try{
    
    const _id=req.user.userId;
    const post = await postSchema.find({userId:_id});
    // console.log(post);
    return res.status(201).send({post})
  }
  catch(error){
    res.status(404).send({msg:error})

  }
}
export async function getPost(req,res) {
  try{
    console.log("hai");
    console.log(req.params);
    const {id}=req.params
    console.log(id);
    const post = await postSchema.findOne({_id:id});
    console.log(post);
    return res.status(201).send({post})
  }
  catch(error){
    res.status(404).send({msg:error})

  }
}
export async function deleteUser(req,res) {
  try {
      const {_id}=req.params;
      console.log(_id);
      const data=await userSchema.deleteOne({_id});
      res.status(201).send(data);
  } catch (error) {
      res.status(404).send(error);
  }   
}