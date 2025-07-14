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
      <h1 data-aos={"fade-up"} style={{fontSize:40}} className='headingFont'>Send Bitcoin & Receive Mobile Money instantly</h1>
<br/><br/>
<GetStartedCard/>
    </div>
  )
}

export default Presenter;