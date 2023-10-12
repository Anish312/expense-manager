import React, { useState } from "react";
import "./SignUp.css";


import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "../../../service/authService";
import authSlice, { setUser } from "../../../redux/authSlice"; // Import your authSlice actions

function SignUp() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a user object from the form data
    const user = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
    };

    dispatch(setUser(user));
    // Call the createUser function to add the user to the "users" collection
    const userDocRef = await authService.createUser(user);

    if (userDocRef) {
      // User was successfully added to the collection
      console.log("User created:", userDocRef.id);

      // You can do any additional actions here, such as dispatching an action
      // to update the Redux store or redirecting the user to a different page.
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
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="signUp-form-group"> 
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="signUp-form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="signUp-btn">Sign Up</button>
        </form>     
     </div>
      </div>
      <div class="signUp-shape-red"></div>
    </div>
  );
}

export default SignUp;
