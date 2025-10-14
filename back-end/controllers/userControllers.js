const userSchema=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const productSchema=require('../model/product');
const crypto = require("crypto");
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
        let {password,...rest}=req.body;
        // IF THE PASSWORD NOT PROVIDED
        if (!password) {
            password = crypto.randomBytes(6).toString("base64").slice(0, 8);
            console.log("PASSWORD GENERATED FOR ADMIN",password)
         }
         const saltRounds = 10;
         const hash = bcrypt.hashSync(password, saltRounds);
        const newUser= new userSchema({password:hash,...rest  });
        console.log("New User", req.body);
        await newUser.save();
        res.status(200).json({
        msg: "New user added successfully.",
        newUser,
        generatedPassword: password, // send it for admin display (optional)
    });
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


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);

    const updates = { ...req.body };

    // Only hash password if it's a NEW plain password
    if (updates.password) {
      const saltRounds = 10;
      updates.password = bcrypt.hashSync(updates.password, saltRounds);
    } else {
      // If no password provided → don't overwrite it
      delete updates.password;
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    console.log("Updated User", updatedUser);
    res.status(200).json({ msg: "User updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "You have a problem" });
  }
};

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
        const found= await userSchema.findOne({email});
        console.log(found);
        if(!found){  return res.status(400).json({ error: "email not found" })};
        const match= await bcrypt.compare(password,found.password);
        if(!match){   return res.status(400).json({ error: "Incorrect password" })}
        const payload={id:found._id};
        const token=jwt.sign(payload,process.env.JWT_SECRET)
        res.json({ msg: 'you are welcome SignIn', found, token });
        console.log('Logged in to your session successfully', email, password);
        
    } catch (error) {
          return res.status(500).json({ msg: "Server error" });
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
        if(found){  return res.status(400).json({ error: 'Email already registered' });};
        const newUser=await new userSchema(req.body)
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        newUser.password = hash;
       
        await newUser.save();
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
const fetchAccount = async (req, res) => {
  try {
    res.status(200).json(req.user); // send user info
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch account" });
  }
};
const addFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // find the user
    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // check if product already exists in favourites
    if (user.favorites.includes(productId)) {
      return res.status(400).json({ error: "Product already in favourites" });
    }

    // add product to favourites
    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ msg: "Product added to favourites", favorites: user.favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding to favourites" });
  }
};
const removeFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // remove the product from favourites
    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ msg: "Product removed from favourites", favorites: user.favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error removing from favourites" });
  }
};
// Get all favourite products for a user
const getFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userSchema.findById(id).populate('favorites');
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.status(200).json({
      msg: "Favourites fetched successfully",
      favorites: user.favorites
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
};
module.exports={getAllUsers,addUser,getUserById,updateUser,deleteUser,signIn,signUp,fetchAccount,removeFavorites,addFavorites,getFavorites}