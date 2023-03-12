const { request, response } = require('express')
const asyncHandler = require('express-async-handler')
const Employee = require('../models/employeeModel')

const getEmployee = asyncHandler(async(request, response) => {
    const employees =  await Employee.find().lean()

    if(!employees){
        return response.status(400).json({message:'No Data Displayed'})
    }
    response.status(200).json(employees);
})

const addEmployee = asyncHandler (async(request,response) => {
    const {name, username, email, phone} = request.body;
    console.log(request.body)
    if(!name || !username || !email || !phone){
        return response.status(400).send({message: 'All fields required'})
    }
    const employeeObject = {name, username, email, phone}
    const employee = await Employee.create(employeeObject)
    if(!employee) {
        return response.status(400).json({message:"Employee could not be saved"})
    }
    
    response.status(200).json(employee)
    console.log(employee)
})


const updateEmployee = asyncHandler(async(request,response)=> {
    const employee = await Employee.findById(request.params.id)
    console.log(employee)
    if(!employee){
        return response.status(400).json({message: 'No ID as such was foud to update'})
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(request.params.id, request.body,{new: true})
    console.log('updated employee', updatedEmployee)
    if(!updatedEmployee){
        return response.status(400).json({message :'Unable to update employee'})
    }
    response.status(200).json(updatedEmployee)
})

const deleteEmployee = asyncHandler(async(request, response) =>{
    const employee = await Employee.findById(request.params.id)
    if(!employee){
        return response.status(400).json({message:'No ID as such exist'})
    }
    const deletedEmployee = await Employee.findByIdAndDelete(request.params.id)
    if(!deletedEmployee){
        return response.status(400).json({message:'Unable to delete this employee'})
    }
    response.status(200).json({message:'Deleted Successfully!'})
})





module.exports = {getEmployee, addEmployee, updateEmployee, deleteEmployee}