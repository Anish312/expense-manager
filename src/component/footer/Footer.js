import React from 'react';
import './Footer.css';
import { BiSolidDashboard ,BiTransferAlt } from 'react-icons/bi';
import { AiOutlineSetting  } from 'react-icons/ai';
import { GrFormAdd  } from 'react-icons/gr';
import { BiMoneyWithdraw  } from 'react-icons/bi';

import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-bar'>
       <div className='footer-dasbboard-icon footer-dasbboard-icon-dashboard'>
       <BiSolidDashboard fontSize={30 }/>
       </div>
       <div className='footer-dasbboard-icon footer-dasbboard-icon-tran'>
      <BiTransferAlt fontSize={30} />
       </div>
       <Link to={`/addExpense`}>
        
        <div className='circle'>
          <div className='plus'><GrFormAdd fontSize={42} color="white" className='add'/></div>
        </div>
       </Link>


       <Link to={`/addSalary`} style={{textDecoration: "none" , color: "white"}}>

        <div className='footer-dasbboard-icon  footer-dasbboard-salary'>

   <BiMoneyWithdraw fontSize={30} />
       </div>
       </Link>
       <Link to={`/setting`} style={{textDecoration: "none" , color: "white"}}>

       <div className='footer-dasbboard-icon footer-dasbboard-setting'>
      <AiOutlineSetting fontSize={30} />
       </div>
       </Link>
      </div>
    </div>
  );
}

export default Footer;
