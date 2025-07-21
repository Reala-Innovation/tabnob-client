import React, { useEffect, useState } from 'react';
import "../styles/nav.css";
import MenuToggle from "./nav/menuToggle";
import Icon from './icon';
import { MDBBtn } from "mdb-react-ui-kit";
import { useInnerWidth } from '../hooks/useInnerWidth';
import { useNavigate } from 'react-router-dom';

const Nav: React.FC<{startedButtonText?:string,startedClick?:()=>void,isApp?:boolean}> = ({
  startedButtonText,
  startedClick,
  isApp
}) => {
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
const navigate=useNavigate();
  return (
    <div style={isApp && width > 900 ? {position:"relative"}:{}} className={`nav-item ${isDarkArea ? 'dark-area':''}`}>
      <div className="nav-item-content align-items-center">
        <Icon />
        
       {width > 900 ? <div className={`pc-menu`}>
        
          <MDBBtn onClick={()=>navigate("/AboutUs")} color='link'>About Us</MDBBtn>
          <MDBBtn  onClick={()=>navigate("/Services")}  color='link'>Services</MDBBtn>
          <MDBBtn  onClick={()=>navigate("/Contacts")}  color='link'>Contacts</MDBBtn>
          <MDBBtn  onClick={()=>navigate("/Faqs")}  color='link'>FAQs</MDBBtn>

          <MDBBtn  color='primary' className='get-started'
             onClick={startedClick ? startedClick:()=>{
          navigate("/app")
        }}
           rounded>
            {startedButtonText||"Get Started"}
           </MDBBtn>

         
           
      </div>:<MenuToggle onClick={() => setOpen(!open)} isClose={open} />}
    
      </div>

      {/* Full-screen menu */}
      {width < 900 && <div className={`fullscreen-menu ${open ? 'show' : ''}`}>
        <br/>
        
          <MDBBtn onClick={()=>navigate("/AboutUs")} color='link'>About Us</MDBBtn>
          <MDBBtn  onClick={()=>navigate("/Services")}  color='link'>Services</MDBBtn>
          <MDBBtn  onClick={()=>navigate("/Contacts")}  color='link'>Contacts</MDBBtn>
          <MDBBtn  onClick={()=>navigate("/Faqs")}  color='link'>FAQs</MDBBtn>
<br/>
<br/>
            <MDBBtn  color='secondary'  style={{textAlign:"center",color:"white"}} className='get-started'
            onClick={startedClick ? startedClick:()=>{
          navigate("/app")
        }}
           rounded>{startedButtonText||"Get Started"}</MDBBtn>
           <br/>
                <MDBBtn  color='warning'  style={{textAlign:"center",color:"white"}} className='get-started'
            onClick={()=>{
          navigate("/app")
        }}
           rounded>Get started</MDBBtn>
      </div>}


    </div>
  );
};

export default Nav;
