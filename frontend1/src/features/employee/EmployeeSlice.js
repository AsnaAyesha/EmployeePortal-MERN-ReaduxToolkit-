import {createSlice} from '@reduxjs/toolkit';

const initialState = { employees:[]}
const EmployeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
      addEmployee: (state, action) => {
        console.log(action.payload)
        state.employees = [...action.payload]
      //  state.employees.push(...action.payload);
       // state.push(action.payload);
      },
      deleteEmployee: (state, action) => {
       // console.log(action.payload);
         const {_id} = action.payload
          
         const  existingEmployee = state.employees.findIndex(employee => employee._id === _id)
         console.log(existingEmployee);
         if(existingEmployee){
         //return state.splice(existingEmployee,1)
         state.employees.splice(state.employees.findIndex((employee) => employee._id === action.payload), 1);
         }
        //const {id} = [...action.payload]
        // const {id} = action.payload
        //  const  existingEmployee = state.employees.find(employee => employee.id === id)
        //  if(existingEmployee){
        //    return state.filter(employee=> employee.id !== id)
        //  }
        //state.employees = state.employees.filter((employee) => employee.id !== action.payload.id)
      },
      updateEmployee:(state, action) =>{
           const {id, name, username,email,phone} = [...action.payload]
           const existingEmployee = state.employees.find(employee => employee.id === id)
           if(existingEmployee){
             existingEmployee.name = name;
             existingEmployee.username = username;
             existingEmployee.email = email;
             existingEmployee.phone = phone;
          }
         // state.employees = state.employees.map((employee)=>  employee.id === action.payload ? action.payload : employee)
      }
 }
})

export const {addEmployee, deleteEmployee, updateEmployee}  = EmployeeSlice.actions;
export default EmployeeSlice.reducer