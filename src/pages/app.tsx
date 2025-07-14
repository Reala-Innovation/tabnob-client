import React, { useState } from 'react'
import Nav from '../components/nav'
import "../styles/app.css"
import BankForm from '../components/app/bankform'
import { useInnerWidth } from '../hooks/useInnerWidth'
import TransactionStepper from './pc-stepper'
import MobileTransactionStepper from './mobile-stepper'
const TabNobApp:React.FC = () => {
  const [activeStep,setActiveStep]=useState<number>(0)
    const width=useInnerWidth();
     const steps = [
    {
      label: 'Bank Details',
    //   content: <div>Form for entering bank details goes here.</div>,
    },
    {
      label: 'Scan QR Code',
    //   content: <div>Show QR code here for payment.</div>,
    },
    {
      label: 'Confirmation',
    //   content: <div>Show confirmation message and receipt details.</div>,
    },
  ];

  return (
        <div className='body'>
  <Nav/>

  <br/>
<br/>
<br/>
<br/>
{width  < 900 && <div style={{padding:"5px 20px",fontFamily:"'Poppins',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
<span>Convert Bitcoin to cash instantly — fast, secure, and hassle-free.
</span>
</div>

}
<br/>

{width > 900 && <>

<br/>
<br/>
<br/>
</>}
  <div className='app' style={{
    padding:10
  }}>
    <div className={`content ${width > 900 && "d-flex align-items-center justify-content-start"}`}>
        {width >900 && <TransactionStepper activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />}
        <div className='app-content'>
        {/* {width  > 900 && <div style={{padding:"5px 20px",fontFamily:"'Poppins',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
<span>Convert Bitcoin to cash instantly — fast, secure, and hassle-free.
</span>
</div>} */}
{width < 900 && <MobileTransactionStepper  activeStep={activeStep} steps={steps}/>}

    <BankForm/>
    </div>
    </div>
  </div>
    </div>
  )
}

export default TabNobApp
