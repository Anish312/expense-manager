import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import authService from "../../service/authService";
import expenseService from "../../service/expenseService";

import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { storage, auth } from "../../db/firebase";
import scheduleSalaryReset from "../../service/resetSalary";
import Footer from "../../component/footer/Footer";

function Dashboard() {
  const [salary, setSalary] = useState(0);
  const user = auth?.currentUser?.uid;

  const getSalary = async () => {
    try {
      if (user) {
        const res = await expenseService.getSalary(user);
        if (res !== null) {
          setSalary(res);
        }
      } else {
        console.error("User is null or undefined.");
      }
    } catch (error) {
      console.error("Error updating user salary:", error.message);
    }
  };


  const [allExpense ,setAllExpense] = useState([])
  
  const getAllExpense = async () => {
    try {
      const res = await expenseService.getAllExpense(user);
      if (res !== null) {
        setAllExpense(res)
      }
    } catch (error) {
      console.error("Error updating user salary:", error.message);
    }
  };


  const calculateCategoryTotal = (expenses) => {
    const categoryTotals = {};
  
    expenses.forEach((expense) => {
      const { category, amount } = expense;
      
      if (!categoryTotals[category]) {
        categoryTotals[category] = amount;
      } else {
        categoryTotals[category] += amount;
      }
    });
  
    return categoryTotals;
  };
  
  const categoryTotals = calculateCategoryTotal(allExpense);
  


    const [remainingSalary, setRemainingSalary] = useState(0);

  const getRemainingSalary = async () => {
    try {
      if (user) {
        const res = await expenseService.getRemainingSalary(user);
        if (res !== null) {
            setRemainingSalary(res);
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
    getAllExpense();
    getRemainingSalary() 
    scheduleSalaryReset();
  }, [user]);


  const [progress, setProgress] = useState(0); // Change this initial value as needed
  useEffect(() => {
    // Delay the calculation by 2 seconds
    const calculationTimeout = setTimeout(() => {
      const percentage = (remainingSalary / salary)* 100;

      setProgress(percentage);
    }, 2000); // 2000 milliseconds (2 seconds)
  
    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(calculationTimeout);
  }, [remainingSalary, salary]);
  
  // Log the progress value after it's calculated and set
  useEffect(() => {
    console.log(progress.toFixed(2)); // Use toFixed(2) to format to two decimal places
  }, [progress]);
  return (
    <div className="dashboard">
              <div class="dashboard-shape-blue"></div>

<div className="progress">
        <div className="barOverflow">
          <div
            className="bar"
            style={{ transform: `rotate(${45 + progress * 1.8}deg)` }}
          ></div>
        </div>
        <span>{progress.toFixed(2)}%</span>
      </div>
      <Link to={`/addSalary`}>


      </Link>
    
      <div className="dashboard-boxes">
    
        <div className="dashboard-box">   
               <div className="dashboard-box-num">{salary}</div>     

          <div className="dashboard-box-line"></div>
               <div className="dashboard-box-text">Total Salary</div>

        </div>

        <div className="dashboard-box">      
            <div className="dashboard-box-num">{remainingSalary}</div>

               <div className="dashboard-box-line"></div>
          <div className="dashboard-box-text">Remaining Salary</div>     

        </div>
        <div className="dashboard-box">    
              <div className="dashboard-box-num">323</div>   

          <div className="dashboard-box-line"></div>
                 <div className="dashboard-box-text">Total Saved</div>

        </div>
      </div>
      <div className="dashboard-status">
        <p className="dashboard-text">Your budgets are on track</p>
      </div>
      <div className="dashboard-category-container">

        <div className="dashboard-category-boxes">
        {Object.entries(categoryTotals).map(([category, total]) => (
      <div className="dashboard-category-box" key={category}>
        <div>
             <p className="dashboard-category-box-p" >{category}</p>
       <div className="dashboard-category-box-line"> 
    
   </div>
        </div>
    
        <div className="dashboard-category-box-details">
   
          <p className="dashboard-category-box-details-total">{total} ₹</p>   
            <p className="dashboard-category-box-details-p">Total</p>
        </div> 
       
      </div>
    ))}
          
       
            
          
        </div>
      </div>
      <Footer/>     
       <div class="dashboard-shape-red"></div>

    </div>
  );
}

export default Dashboard;
