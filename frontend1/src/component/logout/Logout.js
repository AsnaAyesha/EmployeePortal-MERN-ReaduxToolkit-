import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.removeItem('token')
       // navigate("/")
    },[])
  return (
    <div>
       {navigate("/")}
    </div>
  )
}

export default Logout
