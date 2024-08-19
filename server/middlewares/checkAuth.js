import jwt from "jsonwebtoken"
import User from "../models/user.js"

const checkAuth=async(req,res,next)=>{
    const token=req.cookies.uid
    if(!token){
        return res.status(401).json({error:"Unauthorized-No token provided"})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decoded){
        return res.status(401).json({error:"Unauthorized- Invalid Token"})
    }

    const user=await User.findById(decoded.userId).select("-password")
    if(!user){
        return res.status(401).json({error:"Unauthorized-No User Found"})
    }
    req.user=user
    next();
}

export default checkAuth;