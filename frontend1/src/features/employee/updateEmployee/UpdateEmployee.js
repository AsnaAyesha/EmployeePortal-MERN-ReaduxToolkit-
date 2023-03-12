import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../EmployeeSlice';
import { useState } from 'react';
import './updateEmployee.css'

const UpdateEmployee = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  

  const employees = useSelector((state)=> state.counter.employees)
  console.log( employees, params.id)
  const existingEmployee = employees.filter(employee => {
    console.log(employee._id, params.id)
   return employee._id === params.id}
    )
 console.log(existingEmployee)
  const {name, username,email,phone} = existingEmployee[0];
  const [values, setValues] = useState({
   // name:'', username:'', email:'', phone:''
  name, username, email,phone

  })

  const handleUpdateEmployee = (e) =>{
    e.preventDefault();
   
     console.log('user details',values);
    axios.patch(`http://localhost:7000/api/employee/${params.id}`,{
      
      id: params.id,
      name: values.name,
      username: values. username,
      email: values.email,
      phone: values.phone
    }).then((response) => {
      dispatch(updateEmployee([{
        id:params.id, 
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone
      }]))
      alert('Successfully updated!', response)
      navigate('/listemployee')
    })
    setValues({name:'',username:'', email:'',phone:''})

  }
  return (
    <div className='AddEmployeeContainer' >
      <div className='AddEmployeeForm'>
        <div className='AddEmployeeLeft'>
          <form className='AddEmployeeFormContainer' >
            <h1 className='AddEmployeeFormHeading'>UPDATE EMPLOYEE</h1>
            <input type="text"
              placeholder="Name"
              name="name"
              className='AddEmployeeInput'
              value={values.name}
              onChange={(e)=>setValues({...values, name: e.target.value})}
            />
            <input type="text"
              placeholder="Username"
              name="username"
              className='AddEmployeeInput'
             value={values.username}
             onChange={(e)=> setValues({...values,username: e.target.value})}
            />
            <input type="email"
              placeholder="Email"
              name="email"
              className='AddEmployeeInput'
              value={values.email}
              onChange={(e) => setValues({...values,email: e.target.value})}
            />

            <input type="number"
              placeholder="Contact Number"
              name="phone"
              className='AddEmployeeInput'
              value={values.phone}
              onChange={(e) => setValues({...values,phone: e.target.value})}
            />
            <button className='AddFromLeftButton' onClick={handleUpdateEmployee}>Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee
