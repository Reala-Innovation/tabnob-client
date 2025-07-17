import React, { useState } from 'react'
import Nav from '../components/nav'
import "../styles/app.css"
import BankForm from '../components/app/bankform'
import { useInnerWidth } from '../hooks/useInnerWidth'
import TransactionStepper from './pc-stepper'
import MobileTransactionStepper from './mobile-stepper'
import { Sheet } from 'react-modal-sheet';
import 'react-loading-skeleton/dist/skeleton.css'
import ConfirmDetails, { type QuoteData, type requestDataProps } from '../components/app/ConfirmDetails'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit'
import api from '../api/api'
import toast from 'react-hot-toast'


const TabNobApp:React.FC = () => {
  const [activeStep,setActiveStep]=useState<number>(0)
  const [requestData,setRequestData]=useState<requestDataProps>();
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  
    const width=useInnerWidth();
      const [isOpen, setOpen] = useState(false);
     const steps = [
    {
      label: 'Bank Details',
      onclick:()=>{
        setOpen(true);
      }
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
//   "email": "demo123@gmail.com"
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


  return (<>
        <div className='body'>
  <Nav/>

  <br/>
<br/>
<br/>
<br/>
{width  < 900 && <div style={{padding:"5px 20px",textAlign:"center",fontFamily:"'Poppins',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
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

    <BankForm loading={loadingQuote} onNext={(props)=>{
      setRequestData(props)
      setOpen(true);
      fetchQuote(props);
    }}/>
    </div>
    </div>
    <br/>
    <br/>
  </div>
    </div>



      {width < 900 ? <Sheet snapPoints={[800]} initialSnap={1}  isOpen={(isOpen && quoteData) ? true:false} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{(requestData && quoteData) && <ConfirmDetails quoteData={quoteData} requestData={requestData} onConfirm={()=>{
            console.log("on confirm ok")
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
            console.log("on confirm ok")
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
