const userSchema=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const productSchema=require('../model/product');
require('dotenv').config();

// get all the users
const getAllUsers=async(req,res)=>{
    try {
         const users=await userSchema.find();
         res.status(200).json({msg:'You got all the users',users})

    } catch (error) {
         console.log(error);
       res.status(404).json({msg:'errroooor getting all the users'})
    }
   
}

// add a user to the database
const addUser=async(req,res)=>{
    try {
        const {password,...rest}=req.body;
         const saltRounds = 10;
         const hash = bcrypt.hashSync(password, saltRounds);
        const newUser= new userSchema({password:hash,...rest  });
        console.log("New User", req.body);
        await newUser.save();
        res.status(200).json({ msg: 'you added new User', newUser });
    } catch (error) {
          console.log(error);
        res.send('You have a problem adding a new user');
    }
}
// get the user by its id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const user = await userSchema.findById(id);
        res.status(200).json({ msg: 'User', user });
    } catch (error) {
        console.log(error);
        res.send('You have a problem');
    }
}
// update user by id 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
         if (req.body.password) {
            const saltRounds = 10;
            const bcrypt = require('bcrypt');
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            req.body.password = hash;
        }
        const updatedUser = await userSchema.findByIdAndUpdate(id, { $set: { ...req.body } },{new:true});
        console.log("Updated User", updatedUser);
        res.status(200).json({ msg: 'User updated', updatedUser });
    } catch (error) {
        console.log(error);
        res.send('You have a problem');
    }
}
// delete a user 
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const deletedUser = await userSchema.findByIdAndDelete(id);
        res.status(200).json({ msg: 'User', deletedUser });
    } catch (error) {
        console.log(error);
        res.send('You have a problem');
    }
}


//////// sign In //////////
const signIn=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const found=userSchema.findOne({email});
        console.log(found);
        if(!found){return res.json({msg:'Emaail not found '})};
        const match=bcrypt.compare(password,found.password);
        if(!match){return res.json({msg:'false password'})}
        const payload={id:found._id};
        const token=jwt.sign(payload,process.env.JWT_SECRET)
        res.json({ msg: 'you are welcome SignIn', found, token });
        console.log('Logged in to your session successfully', email, password);
        
    } catch (error) {
           console.log(error);
    }
}
///// sign  up/////
const signUp=async(req,res)=>{
    try {
        const{userName,email,password}=req.body;
        if(!userName){
          return res.status(400).json({ error: "Username is required" });
        }
        const found =await userSchema.findOne({email});
        if(found){return res.json({ msg: 'Already registered' }) };
        const newUser=await new userSchema(req.body)
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        newUser.password = hash;
       
        newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        res.status(200).json({ msg: 'Welcome', token,
        user: {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email
           
        } });
    } catch (error) {
           console.log(error);
    }
}
module.exports={getAllUsers,addUser,getUserById,updateUser,deleteUser,signIn,signUp}