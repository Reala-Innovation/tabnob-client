import type React from "react"
import { useInnerWidth } from "../hooks/useInnerWidth";
import GetStartedCard from "./getStartedCard";

const Presenter:React.FC = () => {
  const width=useInnerWidth();
  return (
    <div style={{padding:16}}>
<br/>
<br/>
<br/>
<br/>
<br/>

{width > 900 && <>

<br/>
<br/>
<br/>
</>}
<div style={{
  width:'100%',
  display:'flex',
  justifyContent:'center',
  alignItems:"center"
}}>
<p style={{
  backgroundColor: 'orange',
  textAlign: 'center',
  padding: '8px 16px',
  margin: '16px auto',
  display: 'inline-block',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '14px',
  color: '#333'
  
}}>

  Currently in beta
</p>
</div>
      <h1 data-aos={"fade-up"} style={{fontSize:40}} className='headingFont'>
        Spend Bitcoin. Keep Your Bitcoin.

        {/* Send Bitcoin & Receive Instantly Cash Out to Bank */}
        
        </h1>
<br/><br/>
<GetStartedCard/>
    </div>
  )
}

export default Presenter;