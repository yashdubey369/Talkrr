import express from "express";
const router=express.Router();
import {handleGetLogin,handlePostLogin,handleGetSignUp,handlePostSignUp,handleLogOut } from "../controllers/user.js";
router.get("/login",handleGetLogin);
router.post("/login",handlePostLogin);

router.get("/signup",handleGetSignUp);
router.post("/signup",handlePostSignUp);

router.get("/logout",handleLogOut);

export default router;