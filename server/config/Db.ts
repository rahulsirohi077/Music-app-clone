import mongoose from "mongoose"

const connectDB = (url:string)=>{
    mongoose.connect(url,{dbName:"Music-app"}).then((data)=>{
        console.log(`Connected to DB: ${data.connection.host}`)
    })
}

export {connectDB}