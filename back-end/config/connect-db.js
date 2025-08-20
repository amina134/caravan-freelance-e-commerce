const mongoose=require('mongoose')
require('dotenv').config()
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.uri)
        console.log('connectiong to your data base caravan');

    } catch(error){
        console.log(error)
    }
}
module.exports=connectDb
