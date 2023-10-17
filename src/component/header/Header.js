import React from 'react'
import { storage, auth } from "../../db/firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, setUser } from "../../redux/authSlice";
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../../imgs/logo.png"
import { useNavigate } from 'react-router-dom';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(clearUser()); // Dispatch the clearUser action to clear user data in Redux
        auth.signOut();
        navigate('/')
      };
  return (
    <div className='header'>
                   

        <div>
          <img src={logo} alt="" className='header-img'/>
        </div>
        
        <div className='header-right'>
        {user  ? (  <div className='header-logout' type="" onClick={handleLogOut}>
            Logout
          </div>
      
        ) : (
            <Link to="/signin" style={{textDecoration: "none"}}>
              <p  className='header-login'>Login</p>

            </Link>
        )}

        </div>
    </div>
  )
}

export default Header