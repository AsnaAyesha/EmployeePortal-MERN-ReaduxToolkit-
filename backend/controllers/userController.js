const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { request, response } = require('express');
//const JWT_SECRET_KEY = 'secret key'

// Registration for new user
//next is used for next step of middleware
const signup = async (request, response, next) => {
    const { name, email, password } = request.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        console.log(error)
    }
    if (existingUser) {
        console.log('User already exists', existingUser)
        return response.status(400).json({ message: 'User already exists! Login Instead' })
    }
    const hashedPassword =  bcrypt.hashSync(password)
    const newuser = new User({
        name, // name: name , password: password
        email,
        password: hashedPassword
    })
    try {
        await newuser.save()
    } catch (error) {
        console.log(error)
    }

    return response.status(201).json({ message: newuser })
}

//Login user after registration
const Login = async (request, response, next) => {
    const { email, password } = request.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        console.log(error)
        return new Error(error)
    }

    if (!existingUser) {
        return response.status(400).json({ message: 'User not found. Signup please...' })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if (!isPasswordCorrect) {
        return response.status(400).json({ message: 'Invalid email or password' })
    }
    //HSA256 token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    })

    console.log("Generated Token\n", token);
    if(request.cookies[`${existingUser._id}`]){
        request.cookies[`${existingUser._id}`] = "";
    }

    response.cookie(String(existingUser.id),token,{
        path:'/',
        expires: new Date(Date.now() + 1000 * 30), // 30 seconds
        httpOnly: true, // it is overall accessable from frontend
        sameSite: 'lax'
    })
    return response.status(200).json({ message: 'Successfully Logined In', user: existingUser, token })
}

//baerer token is used authorization
const verifyToken = (request, response, next) => { // verify the user token
   
    // const headers = request.headers[`authorization`];
    //  //console.log('token',headers)
     // generate token to the login user
    //const token = headers.split(" ")[1]
    const cookies = request.headers.cookie; //HTTP cookies help web developers give you more personal, convenient website visits.
    const token = cookies?.split('=')[1]    // split the token for verify the token,here zero index contain 1st element. 
    //console.log(token);
    if (!token) {
        response.status(404).json({ message: 'No token found' });
    }
    // decode information indicated as user
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            console.log('Invalid Token')
            return response.status(400).json({ message: 'Invalid Token' })
        }
        console.log(user.id);
        request.id = user.id; // decoded the id
    })
    next()//next is used to move next middleware getUser
}

// const verifyToken = async (req, res, next) => {
//     try {
//       let token = req.header("Authorization");
  
//       if (!token) {
//         return res.status(403).send("Access Denied");
//       }
  
//       if (token.startsWith("Bearer ")) {
//         token = token.slice(7, token.length).trimLeft();
//       }
  
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = verified;
//       next();
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
const getUser = async (request, response, next) =>{
    const userId = request.id;
    let user;
    try {
        user = await User.findById(userId,"-password") // -password is used for display all details of user without password

    } catch (error) {
        return new Error(error)
    }
    // validate  
    if(!user){
        return response.status(404).json({message:'User Not Found'})
    }
    return response.status(200).json({user})
}

// const refreshToken = (request, response, next) => { 
//     const cookies = request.headers.cookie;
//     const prevToken = cookies?.split("=")[1];
//     if (!prevToken) {
//       return response.status(400).json({ message: "Couldn't find token" });
//     }
//     jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
//       if (err) {
//         console.log(err);
//         return response.status(403).json({ message: "Authentication failed" });
//       }
//       response.clearCookie(`${user.id}`);
//       request.cookies[`${user.id}`] = "";
  
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
//         expiresIn: "35s",
//       });
//       console.log("Regenerated Token\n", token);
  
//       response.cookie(String(user.id), token, {
//         path: "/",
//         expires: new Date(Date.now() + 1000 * 30), // 30 seconds
//         httpOnly: true,
//         sameSite: "lax",
//       });
  
//       request.id = user.id;
//       next();
//     });
//   };
  
const Logout = async (request,response,next)=>{
    
    const cookies = request.headers.cookie; 
    const token = cookies?.split('=')[1]    
    //console.log(token);
    if (!token) {
        response.status(404).json({ message: 'No token found' });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return response.status(403).json({ message: "Authentication failed" });
      }
      response.clearCookie(`${user.id}`);
      request.cookies[`${user.id}`] = "";
      return response.status(200).json({message:' Successfully Logout'})
      
    })
}

module.exports = { signup, Login, verifyToken , getUser,  Logout}