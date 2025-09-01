require('dotenv').config()
const express=require('express')
const app=express()
const path = require('path');
const cors=require('cors')
const port =process.env.port
const connectDb=require('./config/connect-db')
const productRoute = require('./routes/productRoutes')
const userRoute=require('./routes/userRoutes')
app.use(cors());
app.use('/productImages',express.static(path.join(__dirname,'public/productImages')))

app.use(express.json())
connectDb() 

// product route
app.use('/product',productRoute)

// user route
app.use('/user',userRoute)
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
}) // to run the server