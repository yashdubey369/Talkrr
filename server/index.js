import express from "express";
// import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./connection.js"
import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import receiverRoutes  from "./routes/receiverRoutes.js"

import { app, server } from "./socket/socket.js";
// const app = express();

configDotenv();

connectDB(process.env.URL)

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/user/",userRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/receivers",receiverRoutes)
// app.get("/api", (req, res) => {
//   res.end("HomePage");
// });
 

server.listen(process.env.PORT||5000, () => console.log("Server connceted to port:5000"));
