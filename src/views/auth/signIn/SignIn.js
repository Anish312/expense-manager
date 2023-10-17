import React, { useState } from 'react';
import './SignIn.css';
import authService from '../../../service/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    loginFail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validate email
    if (!formData.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    }

    // Validate password
    if (!formData.password) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { email, password } = formData;

      try {
        const response = await authService.UserLogin(email, password);
        dispatch(setUser(response));
        console.log('User signed in', response);
        if(response) 
        {      
            navigate('/dashboard');
         }else {
          setErrors({ ...errors, loginFail: 'Invalid email or password' });

          console.error('Sign-in error:' );

         }

      } catch (error) {
        // Handle sign-in errors
        console.error('Sign-in error:', error.message);
        // You can set a general error message here if needed.
      }
    }
  };

  return (
    <div className="signIn">
      <div class="signUp-shape-blue"></div>

      <div className="signIn-container">
        <div className="signIn-form-container">
          <h2>Sign In</h2>
          <div className="error-message">{errors.loginFail}</div>

          <form onSubmit={handleSubmit} className="signIn-form">
            <div className="signIn-form-group">
              <label>Email:</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="signIn-error-message" >{errors.email}</div>
            </div>
            <div className="signIn-form-group">
              <label>Password:</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                
              />
              <div className="signIn-error-message">{errors.password}</div>
            </div>

            <button type="submit" className="signIn-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div class="signUp-shape-red"></div>
    </div>
  );
}

export default SignIn;
