import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
const router=express.Router()

import { handleGetReceiversForSidebar } from "../controllers/receivers.js";

router.get("/",checkAuth,handleGetReceiversForSidebar)

export default router;