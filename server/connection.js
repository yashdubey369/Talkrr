import mongoose from 'mongoose'

async function connectDB(url){

        return await mongoose.connect(url)
                             .then(()=>console.log("Connected to MongoDB"))
                             .catch((err)=>console.log("Connection Failed!!",err))

}
export default connectDB;