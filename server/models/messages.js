import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    message:{
        type:String,
        required:true,
    }

},{timestamps:true})

const Messages=mongoose.model("message",messageSchema);
export default Messages;