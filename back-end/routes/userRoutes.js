const express=require('express');
const userRoute=express.Router();
const { getAllUsers, addUser, getUserById, updateUser, deleteUser, signIn, signUp,fetchAccount, addFavorites,removeFavorites,getFavorites } = require('../controllers/userControllers');
const {AuthValidation}=require('../middleware/authValidation')
const { SignInValidation, SignUpValidation, Validation } = require('../middleware/signUpValidation');
userRoute.use(express.json());

//http://localhost:4100/user/allUsers
userRoute.get('/allUsers', getAllUsers);
//http://localhost:4100/user/addUser
userRoute.post('/addUser', SignUpValidation, Validation, addUser);
//http://localhost:4100/user/getUserById/:id
userRoute.get('/getUserById/:id', getUserById);
//http://localhost:4100/user/updateUser/:id
userRoute.put('/updateUser/:id', updateUser);
//http://localhost:4100/user/deleteUser/:id
userRoute.delete('/deleteUser/:id', deleteUser);
//http://localhost:4100/user/signin
userRoute.post('/signin', SignInValidation, Validation, signIn);
//http://localhost:4100/user/signup
userRoute.post('/signup', SignUpValidation, Validation, signUp);
//http://localhost:4100/user/myaccount
userRoute.get('/myaccount', AuthValidation, fetchAccount)
//http://localhost:4100/user/addFavourites
userRoute.post('/addFavourites',addFavorites)

//http://localhost:4100/user/removeFavorites
userRoute.delete('/removeFavorites',removeFavorites)

//http://localhost:4100/user/getFavorites/:Id
userRoute.get('/getFavorites/:id',getFavorites)


module.exports = userRoute;