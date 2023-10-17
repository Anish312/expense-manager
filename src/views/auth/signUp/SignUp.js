import React, { useState } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import authService from "../../../service/authService";
import { setUser } from "../../../redux/authSlice";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", name: "" };

    // Validate name
    if (!formData.name) {
      isValid = false;
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(formData.email) // Basic email format validation
    ) {
      isValid = false;
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (!formData.password) {
      isValid = false;
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Create a user object from the form data
      const user = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };

      dispatch(setUser(user));

      try {
        // Call the createUser function to add the user to the "users" collection
        const userDocRef = await authService.createUser(user);

        if (userDocRef) {
          console.log("User created:", userDocRef.id);
          navigate('/dashboard');
        }
      } catch (error) {
        // Handle sign-up errors
        console.error("Sign-up error:", error.message);
        // You can set a general error message here if needed.
      }
    }
  };

  return (
    <div className="signUp">
      <div class="signUp-shape-blue"></div>

      <div className="signUp-container">
        <div className="signUp-form-container">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signUp-form-group">
              <label>Name:</label>
              <input
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <div className="error-message">{errors.name}</div>
            </div>
            <div className="signUp-form-group">
              <label>Email:</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="error-message">{errors.email}</div>
            </div>
            <div className="signUp-form-group">
              <label>Password:</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                
              />
              <div className="error-message">{errors.password}</div>
            </div>

            <button type="submit" className="signUp-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div class="signUp-shape-red"></div>
    </div>
  );
}

export default SignUp;
