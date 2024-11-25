import mongoose, { mongo } from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{type:String},
    photos:{type:Array},
    description:{type:String}
});
export default mongoose.model.post||mongoose.model("post",postSchema);