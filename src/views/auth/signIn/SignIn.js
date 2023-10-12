import React,{useState} from 'react'
import './SignIn.css'
import authService from '../../../service/authService';
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/authSlice';
import {useNavigate} from "react-router-dom"

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
     
        const { email, password } = formData;

    
        try {
         const response = await authService.UserLogin(email, password)
         dispatch(setUser(response))
          console.log('User signed in ',response);
          navigate("/dashboard")
        } catch (error) {
          // Handle sign-in errors
          console.error('Sign-in error:', error.message);
        }
      };
  return (
    <div className="signIn">
              <div class="signUp-shape-blue"></div>


    <div className="signIn-container">
      <div className="signIn-form-container">
        <h2>Sign In</h2>

      <form onSubmit={handleSubmit} className="signIn-form">
        <div className="signIn-form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signIn-form-group"> 
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
   
        <button type="submit" className="signIn-btn">Sign in</button>
      </form>     
   </div>
    </div>
    <div class="signUp-shape-red"></div>

  </div>
  )
}

export default SignIn