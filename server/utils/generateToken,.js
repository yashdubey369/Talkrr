import jwt from "jsonwebtoken"

function generateTokenAndSetCookie(userId,res){
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:'15d'
    })

    res.cookie("uid",token,{
        maxAge:15*24*60*60*1000,//millisecond,
        httpOnly:true,//for preventing cross-site scripting attacks
        sameSite:"strict",//For preventing cross-site forgery attacks(CSFR)
        secure: process.env.NODE_ENV!="development",
    })
}

export default generateTokenAndSetCookie;