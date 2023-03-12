import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'

const Register = () => {

    const navigate = useNavigate()

    const [input, setInput] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e) =>{
        setInput(prevState =>({
            ...prevState,[e.target.name]: e.target.value
        }))
        console.log(e.target.name,'value',e.target.value);
    }

     
    const handleSubmit = (e) =>{
        e.preventDefault()
        //console.log(input);
       
        axios.post('http://localhost:7000/api/user/signup',{
            name: input.name,
            email: input.email,
            password: input.password
      }).then((response)=>{
        alert('User Registered Successfully!', response)
        navigate('/')})
       
    }

  return (
    <div className='RegisterContainer'>
        <div className="RegisterForm">
            <div className="RegisterLeft">
                <h1 className='RegisterLeftHeading'>WELCOME BACK</h1>
                <Link to="/login">
                    <button type="button" className="RegisterLeftButton">
                        Sing in
                    </button>
                </Link>
            </div>
            <div className='RegisterRight'>
                <form className='RegisterFormRightContainer' onSubmit={handleSubmit}>
                    <h1 className='RegisterFormHeading'>CREATE ACCOUNT</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        required
                        className='RegisterInput'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        required
                        className='RegisterInput'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        required
                        className='RegisterInput'
                    />
                    {/* {error && <div className='RegisterError'>{error}</div>} */}
                    <button type="submit" className='RegisterRightButton'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
