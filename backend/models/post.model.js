import mongoose, { mongo } from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{type:String},
    photos:{type:String},
    description:{type:String}
});
export default mongoose.model.post||mongoose.model("post",postSchema);