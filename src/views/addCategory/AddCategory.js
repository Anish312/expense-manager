import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AddCategory.css";
import expenseService from "../../service/expenseService";
import { useNavigate } from 'react-router-dom';

function AddCategory() {
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate();
  debugger;
  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const updatedCategories = await expenseService.createCategory(user, newCategory);

    if (updatedCategories !== null) {
      console.log("Category created successfully. Updated categories:", updatedCategories);
      // Clear the input field or perform any other actions as needed
      setNewCategory("");
      navigate("/addExpense")
    } else {
      console.error("Failed to create category.");
    }
  };

  return (
    <div className="signIn">
      <div className="signUp-shape-blue"></div>

      <div className="signIn-container">
        <div className="signIn-form-container">
          <h2>Create Category</h2>
          <form onSubmit={handleCreateCategory} className="signIn-form">
            <div className="signIn-form-group">
              <label>Name: </label>
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={handleCategoryChange}
              />
            </div>
            <button type="submit" className="signIn-btn">Add</button>
          </form>
        </div>
      </div>
      <div className="signUp-shape-red"></div>
    </div>
  );
}

export default AddCategory;
