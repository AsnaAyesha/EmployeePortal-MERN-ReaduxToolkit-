import axios from 'axios'
import { useEffect, useState } from 'react'
import './profile.css'
axios.defaults.withCredentials = true
//let firstRender = true;

const Profile = () => {
    const [user, setUser] = useState()

    

    // const refreshToken = async () => {
    //     const res = await axios
    //       .get("http://localhost:7000/api/user/refresh", {
    //         withCredentials: true,
    //       })
    //       .catch((err) => console.log(err));
    
    //     const data = await res.data;
    //     return data;
    //   };
      const sednRequest = async () => {
        const res = await axios
          .get("http://localhost:7000/api/user/profile", {
            withCredentials: true,
          })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };
      useEffect(() => {
      //  if (firstRender) {
      //    firstRender = false;
          sednRequest().then((data) => setUser(data.user));
      //  }
      //   let interval = setInterval(() => {
      //     refreshToken().then((data) => setUser(data.user));
      //   }, 1000 * 29);
      //   return () => clearInterval(interval);
      }, []);
    
    return (
        <div className='UserProfileContainer' >
            <div className='UserProfileForm'>
                <div className='UserProfileLeft UserProfileFormContainer'>
                    
                        <h1 className='UserProfileFormHeading'>USER PROFILE</h1>  
                      {user && 
                      <><h3 className='UserProfileInput'>Name:  {user.name}</h3>
                      <h3 className='UserProfileInput'>Email:  {user.email}</h3></>
                      
                       }    
                </div>
            </div>
        </div>
    )
}

export default Profile
