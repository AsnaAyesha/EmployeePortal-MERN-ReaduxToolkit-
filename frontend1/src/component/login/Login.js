import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AuthAction } from '../AuthSlice'
import './login.css'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const [token, setToken] = useState()

     useEffect(() => {
         if (localStorage.getItem('token')) {
             setToken(localStorage.getItem('token'))
         }
     }, [])

    const handleChange = (e) => {
        setInput(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
        console.log(e.target.name, 'value', e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(AuthAction.login([{
            email: input.email,
            password: input.password
        }]))
        axios.post('http://localhost:7000/api/user/login', {
            email: input.email,
            password: input.password
        }).then((response) => {
            alert('User Login Successfully!', response)
             setToken(response.data.token)
             localStorage.setItem('token', response.data.token)

            navigate('/profile')
        })
    }

    return (
        <>
          {
                token === "" ? <h1>You are logged in...</h1> : 
            <div className='LoginContainer' >
                <div className='LoginForm'>
                    <div className='LoginLeft'>
                        <form className='LoginFormLeftContainer' onSubmit={handleSubmit} >
                            <h1 className='LoginFormHeading'>LOGIN ACCOUNT</h1>
                            <input type="email"
                                placeholder="Email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                required
                                className='LoginInput'
                            />

                            <input type="password"
                                placeholder="Password"
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                required
                                className='LoginInput'
                            />
                            {/* {error && <div className='LoginError'>{error}</div>} */}
                            <button className='LoginLeftButton'>Login</button>
                        </form>
                    </div>
                    <div className='LoginRight'>
                        <h1 className='LoginRightHeading'>NEW HERE</h1>
                        <Link to={'/register'}><button className='LoginRightButton'>Register</button></Link>
                    </div>
                </div>
            </div>
            } 
        </>
    )
}

export default Login
