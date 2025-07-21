
import { MDBBadge, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import type { QuoteData } from './ConfirmDetails';
import api from '../../api/api';
// import animation from './loader.json'
import { formatToDollars, formatToNaira } from '../../logics/date';
import { getErrorMessage } from '../../logics/getErrorMesage';
// import Lottie from '../../lib/LotieWeb';
import { MoonLoader } from 'react-spinners';
import { toPng } from 'html-to-image';
import { AppName } from '../icon';
export interface props {
  quoteData: QuoteData;
  onSuccess: () => void;
}
export interface BeneficiaryDetails {
  type: 'BANK' | 'MOBILE_MONEY' | 'WALLET' | string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
}


export interface TransactionProps{
    id: string;
  createdAt: string;
  updatedAt: string;
  quoteId: string;
  companyId: string;
  customerId: string;
  paymentReason: string;
  reference: string;
  callbackUrl: string | null;
  beneficiaryId: string;
  status:
    | 'pending_address_deposit'
    | 'processing'
    | 'completed'
    | 'expired'
    | 'failed'
    | string;

  exchangeRate: {
    btc: {
      rate: number;
      swapRate: number;
    };
    rate: number;
    currency: string;
  };

  beneficiary: {
    id: string;
    status: 'success' | 'pending' | 'failed' | string;
    country: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
    reference: string;
    destination: {
      type: 'BANK' | 'MOBILE_MONEY' | 'WALLET' | string;
      bankCode: string;
      bankName: string;
      accountName: string;
      accountNumber: string;
    };
  };

  trip: {
    submitted: string | null;
    quoteSentAt: string | null;
    assetReceived: string | null;
    initializedAt: string | null;
    completionTime: string | null;
    processingStart: string | null;
    timeToCompletion: string | null;
  };

  clientMetaData: Record<string, unknown>;

  satAmount: string;
  btcAmount: string;
  amount: string;
  centAmount: string;
  settlementAmount: string;
  centFees: string;
  fees: string;

  address: string;
  source: string;
  fromAsset: string;
  chain: 'bitcoin' | 'lightning' | string;
  toCurrency: string;
  paymentETA: string;
  expiry: string;

  bankSessionId: string | null;
}

// interface reciept_data{
//   appLogo:string,
// satsAmount:number,
// settlementAmountInNGN:number,
// transactionStatus:string,
// nairaExchangeRate:string,
// amountInBtc:number,
// ref:string
// }
const VerifyPayment: React.FC<props> = ({ quoteData, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<TransactionProps>();
  
const [downloading,setDownloading]=useState<boolean>(false);
  const fetchDetails = async () => {
    console.log(quoteData);
    try {
      setLoading(true);
      setError('');
      const res = await api.get(`/api/v1/transactions/reference/${quoteData?.reference}`);
// console.log('response:',res?.data)
      if (res?.data?.success) {
        setData(res.data.data);
      } else {
        setError('Something went wrong. Please try again in a few seconds.');
      }
    } catch (err: any) {
      setError(getErrorMessage(err) || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     if (quoteData) fetchDetails();
  }, [quoteData]);

  useEffect(()=>{
    if(data){
const followHeight=document.querySelector(".pc-sideNav") as HTMLDivElement;
const followHeightContent=document.querySelector(".pc-side-content") as HTMLDivElement;
if(followHeight){
  followHeight.style.minHeight="650px"
}
if(followHeightContent){
  followHeightContent.style.minHeight="650px"
}
    }
  },[data]);

  const status=data?.status||""
  const statusColor = status === "completed" || status==="success"
  ? "success"
  : status === "pending_address_deposit"
  ? "warning"
  : status === "failed"
  ? "danger"
  :status=="expired"? "danger": "secondary"; // default fallback



   const componentRef = useRef<HTMLDivElement>(null);


const handleDownloadImage = async () => {
  if (componentRef.current) {
    try {
      const element = componentRef.current;

      // Save the original minHeight
      const originalMinHeight = element.style.minHeight;

      // Set minHeight to 600px
      element.style.minHeight = '600px';

      // Wait for layout to update
      await new Promise((resolve) => setTimeout(resolve, 300)); // optional delay

      const height = element.getBoundingClientRect().height;
      if (height < 600) {
        alert("Content is still less than 600px. Cannot download.");
        element.style.minHeight = originalMinHeight;
        return;
      }

      const dataUrl = await toPng(element);

      const link = document.createElement('a');
      link.download = 'receipt.png';
      link.href = dataUrl;
      link.click();

      // Restore original minHeight
      element.style.minHeight = originalMinHeight;

    } catch (error) {
      console.error('Image download failed:', error);
    }
  }
};

  return (
    <MDBContainer className="form-container p-4" style={{ maxWidth: '400px',maxHeight:350,overflow:"visible" }}>
      {loading  && (
        <div className="d-flex align-items-center justify-content-center">
       <div>
        {/* <span style={{textAlign:"center",display:"inline-block",fontSize:14,fontStyle:"italic",width:"100%"}}>Please wait...</span> */}

         <MoonLoader size={30} color='rgb(73, 105, 220)'/>
        </div>
        </div>
      )}

      {!loading && error && (
        <div className="text-center">
          <span
            style={{
              color: '#ce4a4a',
              fontStyle: 'italic',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {error}
          </span>
          <div className="d-flex align-items-center justify-content-center pt-3">
            <MDBBtn color="danger" onClick={fetchDetails} rounded>
              Try again
            </MDBBtn>
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="text-center">
<div className='' style={{
  background:"white",
  padding:16
}} ref={componentRef}>
<div style={{padding:10}} className='d-flex justify-content-between'>
<AppName/>

<h3 style={{textAlign:"center",fontWeight:"bold"}}>
 {formatToNaira(data.settlementAmount,true)}
</h3>
</div>

        {!loading && data && (
  <div className="text-start">


    <div className="mb-2">
      <strong>Amount:</strong> {formatToDollars(data.amount,true)}  
    </div>


    <div className="mb-2">
      <strong>Sats Amount:</strong> {formatToDollars(data.satAmount,false)}  
    </div>

{/*  
    <div className="mb-2">
      <strong>Settlement Amount :</strong>
    </div> */}

    <div className="mb-2">
      <strong>Status:</strong> <MDBBadge  color={statusColor}>{(data?.status=="pending_address_deposit" ? "pending":data?.status)}</MDBBadge>
    </div>

  <div className="mb-2">
      <strong>Exchange Rate:</strong> ₦{data.exchangeRate.rate.toLocaleString()} per USD
    </div>
           
    <div className="mb-2">
      <strong>Ref:</strong> {data.reference}
    </div>

  

  </div>
)}
</div>
             <MDBBtn
                   style={{width:"100%"}}
                     className="mt-3"
                     color="success"
                     onClick={async ( )=>{
                      setDownloading(true);
                     await handleDownloadImage()
                        onSuccess();
                        // toast.error("download receipts not completed")
                      setDownloading(false);
                     }}
                     rounded
                   >
                 {downloading? "Please wait..." :"Download receipt"}
                   </MDBBtn>
          </div>

         
      )}
    </MDBContainer>
  );
};

export default VerifyPayment;
