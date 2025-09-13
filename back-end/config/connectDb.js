require('dotenv').config()
const mongoose=require('mongoose')

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.uri)
        console.log('connectiong to your data base caravan');

    } catch(error){
        console.log(error)
    }
}
module.exports=connectDb