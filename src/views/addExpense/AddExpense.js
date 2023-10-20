import React, { useEffect, useState } from "react";
import "./AddExpense.css";
import expenseService from "../../service/expenseService";
import { storage, auth } from "../../db/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AddExpense() {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [expenseAmountError, setExpenseAmountError] = useState("");
  const [expenseTypeError, setExpenseTypeError] = useState("");
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const user = auth?.currentUser?.uid;
  console.log(user);
  const getAllCategories = async () => {
    try {
      if (user) {
        const res = await expenseService.getAllCategories(user);
        if (res !== null) {
          setAllCategories(res);
        }
      } else {
        console.error("User is null or undefined.");
      }
    } catch (error) {
      console.error("Error updating user salary:", error.message);
    }
  };

  const handleAmountChange = (e) => {
    setExpenseAmount(e.target.value);
  };

  const handleTypeChange = (e) => {
    setExpenseType(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate expense amount
    if (!expenseAmount) {
      setExpenseAmountError("Expense amount is required");
      return;
    }
    if (isNaN(expenseAmount)) {
      setExpenseAmountError("Expense amount must be a number");
      return;
    }
    
    // Validate expense type
    if (!expenseType) {
      setExpenseTypeError("Expense type is required");
      return;
    }

    const expenseData = {
      category: expenseType,
      amount: parseFloat(expenseAmount),
      date: new Date(),
    };

    const result = await expenseService.addExpense(user, expenseData);

    if (result) {
      remainingSalaryUpdate(expenseAmount);
      setExpenseType("");
      setExpenseAmount("");
      setExpenseAmountError(""); // Clear validation errors
      setExpenseTypeError("");   // Clear validation errors
      console.log("Expense added successfully");
      navigate('/dashboard')
    } else {
      console.error("Failed to add expense");
    }
  };

  const remainingSalaryUpdate = async (amount) => {
    try {
      if (user) {
        const currentRemainingSalary = await expenseService.getRemainingSalary(
          user
        );

        const updatedRemainingSalary = currentRemainingSalary - amount;

        const res = await expenseService.remainingSalaryUpdate(
          user,
          updatedRemainingSalary
        );

        if (res !== null) {
          //   console.log(res);
        }
      } else {
        console.error("User is null or undefined.");
      }
    } catch (error) {
      console.error("Error updating user salary:", error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [user]);

  return (
    <div className="addExpense">
      <div class="addExpense-shape-blue"></div>

      <div className="addExpense-container">
        <div className="addExpense-form-container">
          <h2>Add Expense</h2>

          <form onSubmit={handleSubmit} className="addExpense-form">
           
            <div className="addExpense-form-group">
              <label htmlFor="expenseAmount">Expense Amount:</label>
              <input
                type="number"
                id="expenseAmount"
                name="expenseAmount"
                placeholder="Eg: 33000"
                value={expenseAmount}
                onChange={handleAmountChange}
                required
              />
              {expenseAmountError && <p className="error-message">{expenseAmountError}</p>}
            </div>

            <div className="expense-form-group">
              <label htmlFor="expenseType">Expense Type:</label>
              <select
                className="addExpense-select"
                id="expenseType"
                name="expenseType"
                value={expenseType}
                onChange={handleTypeChange}
                required
              >
                <option value="">----Select Category-----</option>
                {allCategories.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <Link to={"/addCategory"} state={user}>
                <button type="" className="expense-form-add-cat"> + add</button>
              </Link>
              {expenseTypeError && <p className="error-message">{expenseTypeError}</p>}
            </div>

            <button type="submit" className="addExpense-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div class="addExpense-shape-red"></div>
    </div>
  );
}

export default AddExpense;
