require('dotenv').config()

const express=require('express')
const app=express()
const path = require('path');
const contactRoute =require("./routes/contactRoute.js");
const cors=require('cors')
const port =process.env.port
const connectDb=require('./config/connectDb')
const productRoute = require('./routes/productRoutes')
const userRoute=require('./routes/userRoutes')
const cartRoute=require('./routes/cartRoutes')
const orderRoute=require('./routes/orderRoutes.js')
app.use(cors());
app.use('/productImages',express.static(path.join(__dirname,'public/productImages')))
app.use(express.json())
connectDb() 

// product route
app.use('/product',productRoute)

// user route
app.use('/user',userRoute)

// cart route 
app.use('/cart', cartRoute)

// contact route 
app.use("/api", contactRoute);

// order route 
app.use("/order",orderRoute)

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
}) // to run the server