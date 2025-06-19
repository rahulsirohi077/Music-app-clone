import mongoose from "mongoose"

const connectDB = (url)=>{
    mongoose.connect(url,{dbName:"Music-app"}).then((data)=>{
        console.log(`Connected to DB: ${data.connection.host}`)
    })
}

export {connectDB}