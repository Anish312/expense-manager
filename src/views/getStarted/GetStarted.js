import React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
function GetStarted() {
  return (
    <div className="getStarted">  
        <div class="getStarted-shape-blue"></div>


      <div className="getStarted-container">

        <div className="getStarted-left">
          <div className="getStarted-left-text-wrapper">
            <h2 className="getStarted-left-text-h2">Expense Tracker</h2>
            <p className="getStarted-left-text-p">
             Expense Tracker helps you manage your expenses and give a track of it
            </p>
          </div>
          <div className="getStarted-btn-wrapper">
            <Link to="signup" style={{ textDecoration: "none" }}>
              <div className="getStarted-btn"> Get Started</div>
            </Link>
            <Link to="signin" style={{ textDecoration: "none" }}>
              <div className="haveAccount-btn" type="">
                I have an account
              </div>
            </Link>
          </div>
        </div>

        <div className="getStarted-right">
          <div>ffgfdg</div>
        </div>
      </div>   
         <div class="getStarted-shape-red"></div>
    </div>
  );
}

export default GetStarted;
