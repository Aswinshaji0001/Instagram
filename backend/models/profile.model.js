import mongoose, { mongo } from "mongoose";

const profileSchema=new mongoose.Schema({
    userid:{type:String},
    name:{type:String},
    profile:{type:String},
    bio:{type:String},
    dob:{type:String}
});
export default mongoose.model.profile||mongoose.model("profile",profileSchema);