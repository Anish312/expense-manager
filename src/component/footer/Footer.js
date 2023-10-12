import React from 'react';
import './Footer.css';
import { BiSolidDashboard ,BiTransferAlt } from 'react-icons/bi';
import { MdOutlineSavings  } from 'react-icons/md';
import { AiOutlineSetting  } from 'react-icons/ai';
import { GrFormAdd  } from 'react-icons/gr';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-bar'>
       <div className='footer-dasbboard-icon'>
       <BiSolidDashboard fontSize={30 }/>
       </div>
       <div className='footer-dasbboard-icon'>
      <BiTransferAlt fontSize={30} />
       </div>
       <Link to={`/addExpense`}>
        
        <div className='circle'>
          <div className='plus'><GrFormAdd fontSize={42} color="white" className='add'/></div>
        </div>
       </Link>


       <Link to={`/addSalary`} style={{textDecoration: "none" , color: "white"}}>

        <div className='footer-dasbboard-icon'>

   <MdOutlineSavings fontSize={30}/>
       </div>
       </Link>
       <div className='footer-dasbboard-icon'>
      <AiOutlineSetting fontSize={30} />
       </div>
      </div>
    </div>
  );
}

export default Footer;
