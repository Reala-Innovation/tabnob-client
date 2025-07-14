import React, { useEffect, useState } from 'react';
import "../styles/nav.css";
import MenuToggle from "./nav/menuToggle";
import Icon from './icon';
import { MDBBtn } from "mdb-react-ui-kit";
import { useInnerWidth } from '../hooks/useInnerWidth';

const Nav: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
const width=useInnerWidth();
const [isDarkArea,setIsDarkArea]=useState<boolean>(false);

useEffect(()=>{
window.onscroll=(()=>{
  const y=window.scrollY;
  if(y>1400 && window.innerWidth < 600){
  if(!isDarkArea) {
     setIsDarkArea(true);
  }
  }
  else if(y>950 && window.innerWidth > 700){
 if(!isDarkArea) {
     setIsDarkArea(true);
  }
  }

  else{
  setIsDarkArea(false);

  }
})
},[]);

useEffect(()=>{
console.log({isDarkArea});
},[isDarkArea])
  return (
    <div className={`nav-item ${isDarkArea ? 'dark-area':''}`}>
      <div className="nav-item-content">
        <Icon />
        
       {width > 900 ? <div className={`pc-menu`}>
        
          <MDBBtn color='link'>About Us</MDBBtn>
          <MDBBtn  color='link'>Services</MDBBtn>
          <MDBBtn  color='link'>Contact</MDBBtn>
          <MDBBtn  color='link'>FAQs</MDBBtn>
          <MDBBtn  color='primary' className='get-started' rounded>Get started</MDBBtn>
      </div>:<MenuToggle onClick={() => setOpen(!open)} isClose={open} />}
    
      </div>

      {/* Full-screen menu */}
      {width < 900 && <div className={`fullscreen-menu ${open ? 'show' : ''}`}>
        <br/>
        
          <MDBBtn color='link'>About Us</MDBBtn>
          <MDBBtn  color='link'>Services</MDBBtn>
          <MDBBtn  color='link'>Contact</MDBBtn>
          <MDBBtn  color='link'>FAQs</MDBBtn>
      </div>}


    </div>
  );
};

export default Nav;
