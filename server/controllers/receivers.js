import User from "../models/user.js";

export async function handleGetReceiversForSidebar(req,res) {
   try {
    const loggedInUser=req.user._id;
    const allUsersExceptLoggedIn=await User.find({_id:{$ne:loggedInUser}})
    return res.status(200).json(allUsersExceptLoggedIn)
    
   } catch (error) {
    console.log("error in getting receivers", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
   }
}