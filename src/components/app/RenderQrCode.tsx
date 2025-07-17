import { BiCheckDouble } from "react-icons/bi"; 
import { FaRegCopy } from "react-icons/fa"; 
import { MDBBadge, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import type { QuoteData } from './ConfirmDetails';
import api from '../../api/api';
import animation from './loader.json'
import toast from "react-hot-toast";
import { formatToNaira } from '../../logics/date';
import { getErrorMessage } from "../../logics/getErrorMesage";
import { useNavigate } from "react-router-dom";
import Lottie from "../../lib/LotieWeb";

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
export interface CryptoQuote {
  id: string;
  fees: number;
  chain: 'bitcoin' | 'ethereum' | string;
  amount: number;
  status: 
    | 'pending_address_deposit'
    | 'processing'
    | 'completed'
    | 'expired'
    | 'failed'
    | string;
  address: string;
  quoteId: string;
  btcAmount: number;
  fromAsset: string; // could be 'usdt', 'btc', etc.
  reference: string;
  satAmount: number;
  paymentETA: string;
  exchangeRate: number;
  expiresInText: string;
  paymentReason: string;
  expiryTimeStamp: number;
  settlementAmount: number;
  settlementCurrency: string; // could be 'ngn', 'usd', etc.
  barcodeUrl: string;
  beneficiaryDetails: BeneficiaryDetails;
}
const RenderQrCode: React.FC<props> = ({ quoteData, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pleaseWait,setPleaseWait]=useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<CryptoQuote>();
  const [copied,setCopied]=useState<boolean>(false);
  const navigate=useNavigate();
  const [timeoutId,setTimeoutId]=useState<any>();
const [showStatus,setShowStatus]=useState<boolean>(false);
  const fetchDetails = async () => {
    try {
      setLoading(true)
      if(data)setPleaseWait(true)
      setError('')
      const res = await api.post('/api/v1/transactions/finitiate-payout', {
        quoteId: quoteData?.quoteId,
        transactionId: quoteData?.id
      })
      if (res?.data?.success) {
        setData(res.data.data);
        const resData=(res.data.data as CryptoQuote)
        if(resData.status=="expired" || resData?.status== "failed"){
          toast.error("Transaction "+resData?.status)
        navigate("/Transactions");

        }
        else if(resData?.status==="completed"){
          onSuccess();//go to next once is successful
        }
        else if(data){
        toast.error("Trasaction is "+(resData?.status=="pending_address_deposit" ? "pending":resData?.status)+"" )
        //retry in 30 secs
        if(timeoutId)clearTimeout(timeoutId)
        
          if(window.location.pathname.includes("/app")){
          const id=setTimeout(()=>{
fetchDetails();
        },30*1000);
        setTimeoutId(id);
      }

      }
      } else {
        setError('Something went wrong. Please try again in a few seconds.');
      }
    } catch (err: any) {
      setError(getErrorMessage(err?.message) || 'Something went wrong.');
    } finally {
      setLoading(false);
      setPleaseWait(false)
    }
  }

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
      {loading && (
        <div className="d-flex align-items-center justify-content-center">
       <div>
        {/* <span style={{textAlign:"center",display:"inline-block",fontSize:14,fontStyle:"italic",width:"100%"}}>Please wait...</span> */}

         <Lottie 
        width={150}
        height={150}
          options={{
      animationData: animation
    }}
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
          <img
            src={data.barcodeUrl}
            alt="Bitcoin QR"
            style={{
              width: '100%',
              maxWidth: '200px',
              marginBottom: '1rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          />
          <p>
            <strong>Send:</strong> {data.satAmount} SAT Amount
          </p>
       
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
          toast.error(getErrorMessage(err?.message) ||"Could not copy please try again")
        }
            }} style={{padding:5,background:"white"}} color='secondary'>{!copied ? <FaRegCopy  style={{marginLeft:-3}} size={20} />:<BiCheckDouble style={{marginLeft:-3}} size={20} />}</MDBBtn>
            </div>

        
          <div className="qr-code-container" style={{
            textAlign:"start"
          }}>
            
            <div className="d-flex align-items-center justify-content-between"> 
                <strong>Exchange Rate:</strong> <span>{formatToNaira(data.exchangeRate,true)} / USD</span>
            </div>

          
             <div className="d-flex align-items-center justify-content-between">
                <strong>Amount to receive:</strong> 
             <span>₦{data.settlementAmount.toLocaleString()}</span></div>
             
             <div className="d-flex align-items-center justify-content-between">
            <strong>Payment ETA:</strong> <span>{data.paymentETA}</span>
          </div>
             <div className="d-flex align-items-center justify-content-between">
            <strong>Expires In:</strong> <span>{data.expiresInText}</span>
        
          </div>
          {showStatus &&  <div className="mb-2">
      <strong>Status:</strong> <MDBBadge size={'sm'} color={statusColor}>{(data?.status=="pending_address_deposit" ? "pending":data?.status)}</MDBBadge>
    </div>
}
          </div>

          <MDBBtn
          style={{width:"100%"}}
            className="mt-3"
            color="success"
            onClick={()=>{
              setShowStatus(true)
              fetchDetails()
            }
            }
            disabled={pleaseWait}
            rounded
          >
            {pleaseWait ? "Please wait...":"I've Paid"}
          </MDBBtn>
        </div>
      )}
    </MDBContainer>
  );
};

export default RenderQrCode;
