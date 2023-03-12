import axios from 'axios'
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AuthAction } from '../AuthSlice'
import './header.css'
axios.defaults.withCredentials = true
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state.AuthReducer.isLoggedIn)
    const sendLogoutRequest = async () => {
        const res = await axios.post('http://localhost:7000/api/user/logout', null, {
            withCredentials: true
        })
        if (res.status === 200) {
            return res;
        }
        return new Error("Unable TO Logout. Please try again");
    }
    const handleLogout = () => {

        sendLogoutRequest().then(() => dispatch(AuthAction.logout()))

         localStorage.clear()
        
       

        //localStorage.removeItem('token')
    }
    return (

        <div>
            <Navbar className='Headersection'>

                <Navbar.Brand href="#home"><Link to={'/'} className='LinkColor  p-4'>Employee Portal</Link></Navbar.Brand>

                <Nav className="me-auto" >

                    <Nav.Link href="#"><Link to={'/listemployee'} className='LinkColor'>Employees</Link></Nav.Link>
                    {/* <Nav.Link href="#"><Link to={'/addemployee'} className='LinkColor'>Add Employee</Link></Nav.Link> */}
                </Nav>

                {!isLoggedIn && (
                <>{" "}
                 <Nav.Link href="#"><Link to={'/'} className='LinkColor TextAlign' >Login</Link></Nav.Link>
                    <Nav.Link href="#"><Link to={'/register'} className='LinkColor TextAlign1' >Register</Link></Nav.Link>
                </>)}
                
                {isLoggedIn && (
                <>
                    <Nav.Link href="#"><Link to={'/profile'} className='LinkColor TextAlign'>Profile</Link></Nav.Link>
                    <Nav.Link href="#"><Link to={'/logout'} className='LinkColor TextAlign1' onClick={handleLogout}>Logout</Link></Nav.Link>
                </>)}  {" "}





            </Navbar>
        </div>
    )
}

export default Header
