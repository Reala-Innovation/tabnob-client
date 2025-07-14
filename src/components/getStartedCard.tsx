import { BiRightArrowAlt } from "react-icons/bi"; 
import React from 'react'
import "../styles/get-started-card.css"
import { MDBBtn } from 'mdb-react-ui-kit'
const GetStartedCard:React.FC = () => {
  return (
    <div className='get-started-card'>

<div className="d-flex align-items-center justify-content-between">      
      <span style={{}}>
Convert Bitcoin to cash instantly — fast, secure, and hassle-free.
      </span>
{/* <MDBBtn color="link">Learn more</MDBBtn> */}
</div>

      <div className="input-container">
        <input  placeholder='Enter amount to recieve'/>
        <MDBBtn style={{
          background:"var(--primary)",
          boxShadow:'none',

        }}><BiRightArrowAlt size={40} /></MDBBtn>
      </div>
    </div>
  )
}

export default GetStartedCard
