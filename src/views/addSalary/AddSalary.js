import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/authSlice";
import expenseService from "../../service/expenseService";
import { storage, auth } from "../../db/firebase";
import "./AddSalary.css"
function AddSalary() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [salary, setSalary] = useState(0);

  const userId = auth?.currentUser?.uid;

  const [formData, setFormData] = useState({
    updatedSalary: 0, // Initialize to 0 or any default value
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) }); // Ensure it's a number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { updatedSalary } = formData;

    try {
      await expenseService.addSalary(userId, updatedSalary); // Use userId here instead of user.uid
      console.log("User salary updated");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user salary:", error.message);
    }
  };

  const getSalary = async () => {
    try {
      if (userId) {
        const res = await expenseService.getSalary(userId);
        if (res !== null) {
          setFormData({ updatedSalary: res }); // Set the numeric value
        }
      } else {
        console.error("User is null or undefined.");
      }
    } catch (error) {
      console.error("Error updating user salary:", error.message);
    }
  };

  useEffect(() => {
    getSalary();
  }, [userId]);

  return (
    <div className="addSalary">
              <div class="addSalary-shape-blue"></div>


    <div className="addSalary-container">
      <div className="addSalary-form-container">
        <h2>Add Salary</h2>

      <form onSubmit={handleSubmit} className="addSalary-form">
        <div className="addSalary-form-group">
        <label>Add Salary</label>      
            <input
            type="number"
            name="updatedSalary"
            value={formData.updatedSalary}
            onChange={handleChange}
            required
          />
        </div>
       
   
        <button type="submit" className="addSalary-btn">Add Salary</button>
      </form>     
   </div>
    </div>
    <div class="addSalary-shape-red"></div>

  </div>
  );
}

export default AddSalary;
