const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//Every time the user loads the website back, this cookie is sent with the request.
// This helps us keep track of the user's actions. Now to use cookies with Express,
// we will require the cookie-parser. 
//cookie-parser is a middleware which parses cookies attached to the client request object.
//cookieParser helps you to access the token stored in the cookie.
app.use(cookieParser())

//middleware - urlencoded for form submission & json for api calling
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))

//CORS stands for Cross-Origin Resource Sharing . It allows us to relax the security applied to an API
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

//router
app.use('/api/employee', require('./routes/employeeRoute'))
app.use('/api/user', require('./routes/userRoute'))

// mongodb connection
connectDB()

// port connection
PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port number: ${PORT}`))