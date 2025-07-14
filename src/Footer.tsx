import { FaTelegram } from "react-icons/fa"; 
import React from 'react'
import { AppName } from './components/icon';

const Footer:React.FC = () => {
      const year = new Date().getFullYear();
  return (
    <div className='footer'>
      <div className="d-flex align-items-center justify-content-between">
      <AppName/> 

      <div>
        <FaTelegram size={30} fill="white" stroke="white"/>
      </div>
</div>
<br/>
<p style={{textAlign:"center"}}>
    Copyright ©  {year}. All rights reserved.
</p>
    </div>
  )
}

export default Footer
