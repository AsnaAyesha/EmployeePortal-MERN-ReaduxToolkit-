import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "./features/employee/EmployeeSlice";
import AuthReducer from "./component/AuthSlice";


export const store = configureStore({
    reducer: {
        counter : EmployeeReducer,AuthReducer
    }
       
    
})