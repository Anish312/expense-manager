import React from 'react';
import "./Setting.css";
import { resetSalary } from '../../service/resetSalary'; // Import the resetSalary function
import { storage, auth } from "../../db/firebase";

function Setting() {
  const userId = auth?.currentUser?.uid;
  const handleResetSalary = () => {

    resetSalary(userId);
  }

  return (
    <div className="setting">
      <div class="addExpense-shape-blue"></div>

      <div className="setting-main-container">
        <div className='setting-main-left'>
          <ul className='setting-main-left-ul'>
            <li className='setting-main-left-li'>Account</li>
          </ul>
        </div>
        <div className='setting-main-right'>
          <div className='setting-main-right-content'>
            <div className='setting-main-right-head'>
              Account
            </div>
            <div className='setting-main-right-container'> 
             <p>
              Reset the salary
              </p>   
              <div>
              
                <button className='reset-btn' onClick={handleResetSalary}>reset</button> {/* Add onClick handler */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="addExpense-shape-red"></div>
    </div>
  )
}

export default Setting;
