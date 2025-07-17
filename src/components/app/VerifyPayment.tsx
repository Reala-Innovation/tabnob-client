
import { MDBBadge, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import type { QuoteData } from './ConfirmDetails';
import api from '../../api/api';
import Lottie from 'lottie-react-web';
import animation from './loader.json'
import toast from 'react-hot-toast';
import { FaRegCopy } from 'react-icons/fa';
import { BiCheckDouble } from 'react-icons/bi';
import { formatToDollars, formatToNaira } from '../../logics/date';
import { getErrorMessage } from '../../logics/getErrorMesage';

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
const VerifyPayment: React.FC<props> = ({ quoteData, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<TransactionProps>();
  const [copied,setCopied]=useState<boolean>(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get(`/api/v1/transactions/qoute/${quoteData?.quoteId}`);
// console.log('response:',res?.data)
      if (res?.data?.success) {
        setData(res.data.data);
      } else {
        setError('Something went wrong. Please try again in a few seconds.');
      }
    } catch (err: any) {
      setError(getErrorMessage(err.message) || 'Something went wrong.');
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
  const statusColor = status === "completed"
  ? "success"
  : status === "pending_address_deposit"
  ? "warning"
  : status === "failed"
  ? "danger"
  :status=="expired"? "danger": "secondary"; // default fallback
  return (
    <MDBContainer className="form-container p-4" style={{ maxWidth: '400px' }}>
      {loading  && (
        <div className="d-flex align-items-center justify-content-center">
       <div>
        {/* <span style={{textAlign:"center",display:"inline-block",fontSize:14,fontStyle:"italic",width:"100%"}}>Please wait...</span> */}

        <Lottie 
          width={250}
        height={250}
          options={{
      animationData: animation,
    
    }}
      speed={0.7}
        />
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
        {!loading && data && (
  <div className="text-start">

    <div className="mb-2">
      <strong>Amount:</strong> {formatToDollars(data.amount,true)}  
    </div>

 
    <div className="mb-2">
      <strong>Settlement Amount :</strong> {formatToNaira(data.settlementAmount,true)}
    </div>

    <div className="mb-2">
      <strong>Status:</strong> <MDBBadge  color={statusColor}>{(data?.status=="pending_address_deposit" ? "pending":data?.status)}</MDBBadge>
    </div>

    <div className="mb-2">
      <strong>Payment ETA:</strong> {data.paymentETA}
    </div>

            <div style={{background:"#eeedf4",padding:5,borderRadius:5,gap:5}} className='d-flex align-items-center justify-content-between'>
            <strong>To:</strong> 
            <input disabled={true} style={{
                width:"100%",
                padding:4,
                outline:"none",
                border:"none",
                background:"#ffffffbb",
                borderRadius:5
            }} value={data.address}/>
            <MDBBtn onClick={async ()=>{
        try {
          await navigator.clipboard.writeText(data.address);
          setCopied(true);
          setTimeout(()=>{
            setCopied(false);
          },10000)
        } catch (err:any) {
          toast.error(getErrorMessage(err?.message) || "Could not copy please try again")
        }
            }} style={{padding:5,background:"white"}} color='secondary'>{!copied ? <FaRegCopy  style={{marginLeft:-3}} size={20} />:<BiCheckDouble style={{marginLeft:-3}} size={20} />}</MDBBtn>
            </div>

    <div className="mb-2">
      <strong>Quote ID:</strong> {data.quoteId}
    </div>

    <div className="mb-2">
      <strong>Exchange Rate:</strong> ₦{data.exchangeRate.rate.toLocaleString()} per USD
    </div>

  </div>
)}

             <MDBBtn
                   style={{width:"100%"}}
                     className="mt-3"
                     color="success"
                     onClick={()=>{
                        onSuccess();
                        toast.error("download receipts not ok")
                     }}
                     rounded
                   >
                 Download receipt
                   </MDBBtn>
          </div>

         
      )}
    </MDBContainer>
  );
};

export default VerifyPayment;
