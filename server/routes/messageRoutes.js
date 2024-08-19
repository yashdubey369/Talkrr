import express from "express"

const router=express.Router();
import { handleSendMessage,handleGetMessage } from "../controllers/message.js";
import checkAuth from "../middlewares/checkAuth.js";
router.get("/:id",checkAuth,handleGetMessage)
router.post("/send/:id",checkAuth,handleSendMessage)


export default router;