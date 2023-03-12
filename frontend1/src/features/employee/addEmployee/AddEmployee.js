import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../EmployeeSlice';
import './addEmployee.css'

const AddEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [values, setValues] = useState({
        name:'', username:'', email:'', phone:''
    })

    const handleAddEmployee = (e) => {
        e.preventDefault();
        setValues({name:'', username:'', email:'', phone:''})
         dispatch(addEmployee([{
             name: values.name,
             username: values.username,
             email: values.email,
             phone: values.phone
         }]))
        axios.post('http://localhost:7000/api/employee/addemployee',{
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone
      })
      .then((response)=>{
        alert('Data Saved', response)
        navigate('/listemployee')
      }) 
      
        
    }

  return (
    <div className='AddEmployeeContainer' >
      <div className='AddEmployeeForm'>
        <div className='AddEmployeeLeft'>
          <form className='AddEmployeeFormContainer' >
            <h1 className='AddEmployeeFormHeading'>ADD NEW EMPLOYEE</h1>
            <input type="text" placeholder="Name" name="name" autoComplete="off"
              className='AddEmployeeInput' value={values.name}
              onChange = {(e) => setValues({...values, name:e.target.value})}
            />
            <input type="text" placeholder="Username" name="username" autoComplete="off"
              className='AddEmployeeInput' value={values.username}
             onChange = {(e) => setValues({...values, username: e.target.value})}
            />
            <input type="email" placeholder="Email" name="email" autoComplete="off"
              className='AddEmployeeInput' value={values.email}
              onChange = {(e) => setValues({...values, email: e.target.value})}
            />
            <input type="number" placeholder="Contact Number" name="phone" autoComplete="off"
              className='AddEmployeeInput' value={values.phone}
             onChange= {(e) => setValues({...values, phone: e.target.value})}
            />
            <button className='AddFromLeftButton' onClick={handleAddEmployee}>Add</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee
