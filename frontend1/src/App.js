import logo from './logo.svg';
import './App.css';
import Header from './component/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/home/Home';
import Footer from './component/footer/Footer';
import ListEmployee from './features/employee/listEmployee/ListEmployee';
import AddEmployee from './features/employee/addEmployee/AddEmployee';
import { useSelector} from 'react-redux'
//import { store } from './store';
import UpdateEmployee from './features/employee/updateEmployee/UpdateEmployee';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Profile from './component/profile/Profile';
import Logout from './component/logout/Logout';
import { checkLogin } from './component/hoc/AuthHoc';


function App() {
  
   const isLoggedIn = useSelector((state) => state.AuthReducer.isLoggedIn)
   console.log('isloggedin',isLoggedIn);
   const Auth = checkLogin(ListEmployee)
   console.log(checkLogin(ListEmployee))
  return (
  //<Provider store={store}>
      <div className="page-container">
        <div className='container-wrap'>
          <Router>
            <Header />
            <Routes>
                  <Route exact path='/listemployee' element={<Auth component={<ListEmployee/>} />} />
                 {/* <Route exact path='/listemployee' element={<ListEmployee/>}/> */}
                  <Route path='/addemployee' element={<AddEmployee/>} /> 
                  <Route path='/listemployee/:id' element={<UpdateEmployee/>} />
                  <Route path='/' element={<Login/>} />
                  <Route path='/logout' element= {<Logout/>}/>
                  <Route path='/register' element={<Register/>}/> 
                {isLoggedIn && <Route path='/profile' element={<Profile/>}/> } {" "}
                {/* <Route path='/profile' element={<Profile/>}/> */}
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
  // </Provider>
  );
}

export default App;
