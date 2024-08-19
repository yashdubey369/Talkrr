import Conversations from "../models/conversations.js";
import Messages from "../models/messages.js";
import { getReceiverSocketId,io} from "../socket/socket.js";
// getReceiverSoc

export async function handleSendMessage(req,res){
    // console.log({msg:`"message sent to" ${req.params.id}`});
    try {
        const message=req.body.message
        const receiverId=req.params.id
        const senderId=req.user._id
        // console.log(req.user);
        const newMessage=await Messages.create({
            senderId,
            receiverId,
            message,
        })
        // console.log(newMessage._id);
        let conversation=await Conversations.findOne({
            participants:{$all:[senderId,receiverId]},
        })
        if(!conversation){
            conversation=await Conversations.create({
                participants:[senderId,receiverId],
            })
        }
        // console.log(conversation);
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        conversation.save();
        // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        return res.status(200).json(newMessage)
    } catch (error) {
        console.log("error in sending message", error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
export async function handleGetMessage(req,res){
   try {
    const senderId=req.user._id
    const receiverId=req.params.id

    let conversation=await Conversations.findOne({
        participants:{$all:[senderId,receiverId]},
    }).populate("messages")
    if(!conversation) return res.status(401).json([])
    // console.log(conversation.messages[0].message);
    return res.status(200).json(conversation.messages)
   } catch (error) {
    console.log("error in getting message", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
   }
}