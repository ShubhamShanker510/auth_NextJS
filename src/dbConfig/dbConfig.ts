import { log } from "console";
import mongoose from "mongoose";

export async function connectDb(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection

        connection.on('connected',()=>{
            console.log('MongoDb Connected')
        })

        connection.on('error',(err)=>{
            console.log('MongoDb Connection Error, please make sure db is up and running=>',err)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong in connection to DB=>",error);
    }
}