import { BiRightArrowAlt } from "react-icons/bi"; 
import React from 'react'
import "../styles/get-started-card.css"
import { MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from "react-router-dom";
const GetStartedCard:React.FC = () => {
  const navigate=useNavigate();
  return (
    <div className='get-started-card'>

<div className="d-flex align-items-center justify-content-between" style={{width:"100%"}}>      
      <span style={{}}>
{/* Convert Bitcoin to cash instantly — fast, secure, and hassle-free. */}

Convert Bitcoin to local currency instantly. Fast, secure, and effortless for everyday spending across Africa.


      </span>
{/* <MDBBtn color="link">Learn more</MDBBtn> */}
</div>

      <div className="input-container">
        <input onChange={(e)=>{
          const {target:{value}}=e;
          sessionStorage.setItem("amount",value);
        }} placeholder='Enter amount to recieve'/>
        <MDBBtn  onClick={()=>{
          navigate("/app")
        }} style={{
          background:"var(--primary)",
          boxShadow:'none',

        }}><BiRightArrowAlt size={40} /></MDBBtn>
      </div>
    </div>
  )
}

export default GetStartedCard