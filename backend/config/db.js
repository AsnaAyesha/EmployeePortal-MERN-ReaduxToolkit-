const mongoose = require('mongoose')

const connectDB= async( request, response) =>{
    try {
        mongoose.set('strictQuery', true)
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Unable to Connect MongoDB')
    }
}

module.exports = connectDB;