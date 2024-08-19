import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken,.js";

export async function handleGetLogin(req, res) {
  res.end("Login");
}

export async function handlePostLogin(req, res) {
  try {
    const {phonenumber,password} = req.body;
    const user = await User.findOne({
          phonenumber,
    });
    const isPasswordCorrect=await bcrypt.compare(password,user?.password||"")
    if (!user || !isPasswordCorrect) return res.status(400).json({error:"Invalid Credentials"});
    // console.log(user);
    generateTokenAndSetCookie(user._id,res);
    return res.status(201).json({msg:"Success",user});
  } catch (error) {
    console.log("error in signup", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function handleGetSignUp(req, res) {
  res.end("SignUp");
}

export async function handlePostSignUp(req, res) {
  try {
    const { name, phonenumber, password, confirmpassword } = req.body;

    if (!name || !phonenumber || !password)
      return res.json({ msg: "Fields are empty" });

    if (password != confirmpassword)
      return res.json({ msg: "confirmpassword don't match with password" });

    const userExist = await User.findOne({ phonenumber });
    if (userExist) return res.json({ msg: "User already exists" });

    //  Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //creating newuser
    const entry = await User.create({
      name,
      phonenumber,
      password: hashedPassword,
    });

    //generating token AS uid and setting cookie.
    generateTokenAndSetCookie(entry._id, res);
    // console.log(entry);

    return res.status(201).json({ msg: "Success", User: entry });
  } catch (error) {
    console.log("error in signup", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function handleLogOut(req, res) {
  try {
    res.cookie("uid","",{
        maxAge:0,
    })
    res.status(200).json({msg:"Logout successfully"});
  } catch (error) {
    console.log("error in signup", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
