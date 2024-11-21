import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String},
    salary:{type:Number},
    experience:{type:String},
    designation:{type:String},
    phone:{type:Number},
    email:{type:String},
    profile:{type:String}
});
export default mongoose.model.user||mongoose.model("user",userSchema);