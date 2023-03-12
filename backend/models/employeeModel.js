const mongoose = require('mongoose')

const employeeSchema = new  mongoose.Schema({
     name:{
        type: String,
        require: true
     }, 
     username:{
        type: String,
        require: true
     },
     email:{
        type: String,
        require: true
     },
    phone:{
        type: Number,
        require: true
     }
},{
    timestamps: true
})

module.exports = mongoose.model('Employee', employeeSchema)