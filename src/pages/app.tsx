import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import "../styles/app.css"
import BankForm from '../components/app/bankform'
import { useInnerWidth } from '../hooks/useInnerWidth'
import TransactionStepper from './pc-stepper'
import MobileTransactionStepper from './mobile-stepper'
import { Sheet } from 'react-modal-sheet';
import ConfirmDetails, { type QuoteData, type requestDataProps } from '../components/app/ConfirmDetails'

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit'
import api from '../api/api'
import toast from 'react-hot-toast'
import RenderQrCode from '../components/app/RenderQrCode'
import VerifyPayment from '../components/app/VerifyPayment'
import { useNavigate } from 'react-router-dom'


const TabNobApp:React.FC = () => {
  const [activeStep,setActiveStep]=useState<number>(0)
  const [requestData,setRequestData]=useState<requestDataProps>();
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  
    const width=useInnerWidth();
      const [isOpen, setOpen] = useState(false);
   const steps = [
  {
    label: 'Bank Details',
    description: 'Enter your Cash App account or bank details to receive your payout.',
  },
  {
    label: 'Scan QR Code',
    description: 'Use your Bitcoin wallet to scan the QR code and send the exact amount.',
  },
  {
    label: 'Finish',
    description: 'We’ll verify the transaction and confirm once the funds are on the way.',
  },
];



  const [loadingQuote,setLoadingQuote]=useState<boolean>(false);
  
  const fetchQuote = async (requestData:requestDataProps) => {
    try {
      setLoadingQuote(true);
       setQuoteData(null);
      // Simulate API call
   const res=await api.post("/api/v1/transactions/initiate-payout",{
  "bankCode": requestData?.bank.code,
  "accountNumber": requestData?.accountDetails.account_number,
  "chain": "lightning",
  "settlementAmount":parseFloat(requestData?.amount||"0"),
   ...(requestData?.email ? {email:requestData?.email}:{})
   })
   if(res?.data?.success){
      const mockData: QuoteData =res?.data.data
      if(mockData){
      setQuoteData(mockData);

      }
      else{
        toast.error("Something went wrong")
      }
    }
    else{
        toast.error("Something went wrong")
    }
    } catch (err) {
      toast.error("Failed to fetch quote. Please try again.");
      console.error(err);
    } finally {
       setLoadingQuote(false);
    }
  };

useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; // Required for some browsers
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);
const navigate=useNavigate();
  return (<>
        <div className='body'>
  <Nav isApp startedButtonText='Transactions' startedClick={()=>{
navigate("/Transactions")
  }}/>


{width  < 900 && <>
  <br/>
<br/>
<br/>
<br/>
<div style={{padding:"5px 20px",textAlign:"center",fontFamily:"'Poppins',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
<span>Convert Bitcoin to cash instantly — fast, secure, and hassle-free.
</span>
</div>
</>
}
<br/>

{/* {width > 900 && <>


<br/>
</>} */}
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

    {activeStep==0 && <BankForm loading={loadingQuote} onNext={(props)=>{
      setRequestData(props)
      setOpen(true);
      fetchQuote(props);
    }}/>}

{activeStep == 1 && <RenderQrCode onSuccess={()=>{
setActiveStep(activeStep+1);
}} quoteData={quoteData as QuoteData}/>}
    

    {activeStep == 2 && <VerifyPayment
onSuccess={()=>{
setActiveStep(activeStep+1);
}} quoteData={quoteData as QuoteData}
    
    />}
    </div>
    </div>
    <br/>
    <br/>
  </div>
    </div>
{width > 900 && <>
<br/>
<br/>
<br/>
</>}



      {width < 900 ? <Sheet snapPoints={[680]} initialSnap={0}  isOpen={(isOpen && quoteData) ? true:false} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{(requestData && quoteData) && <ConfirmDetails 
           quoteData={quoteData} requestData={requestData} onConfirm={()=>{
          setActiveStep(activeStep+1)
          setOpen(false);
            
          }} onClose={()=>{setOpen(false)}}/>}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>:
<MDBModal open={(isOpen && quoteData) ? true:false} onClose={() => setOpen(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Confirm transaction</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setOpen(!isOpen)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {(requestData && quoteData) && <ConfirmDetails quoteData={quoteData} requestData={requestData} onConfirm={()=>{
          setActiveStep(activeStep+1)
          setOpen(false);
          }} onClose={()=>{setOpen(false)}}/>}
            </MDBModalBody>

            {/* <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn> */}
            {/* </MDBModalFooter> */}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>}

    </>
  )
}

export default TabNobApp
