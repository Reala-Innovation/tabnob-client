import { BiCheckDouble } from "react-icons/bi"; 
import { FaRegCopy } from "react-icons/fa"; 
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import type { QuoteData } from './ConfirmDetails';
import api from '../../api/api';
import Lottie from 'lottie-react-web'
import animation from './loader.json'
import toast from "react-hot-toast";

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
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<CryptoQuote>();
  const [copied,setCopied]=useState<boolean>(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/api/v1/transactions/finitiate-payout', {
        quoteId: quoteData?.quoteId,
        transactionId: quoteData?.id,
      });

      if (res?.data?.success) {
        setData(res.data.data);
      } else {
        setError('Something went wrong. Please try again in a few seconds.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
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

  console.log(quoteData);

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
            <strong>Send:</strong> {data.btcAmount} BTC
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
          toast.error(err?.message||"Could not copy please try again")
        }
            }} style={{padding:5,background:"white"}} color='secondary'>{!copied ? <FaRegCopy  style={{marginLeft:-3}} size={20} />:<BiCheckDouble style={{marginLeft:-3}} size={20} />}</MDBBtn>
            </div>

        
          <div className="qr-code-container" style={{
            textAlign:"start"
          }}>
            
            <div className="d-flex align-items-center justify-content-between"> 
                <strong>Exchange Rate:</strong> <span>${data.exchangeRate} / BTC</span>
            </div>

          
             <div className="d-flex align-items-center justify-content-between"><strong>Settlement:</strong> 
             <span>₦{data.settlementAmount.toLocaleString()}</span></div>
             
             <div className="d-flex align-items-center justify-content-between">
            <strong>Payment ETA:</strong> <span>{data.paymentETA}</span>
          </div>
             <div className="d-flex align-items-center justify-content-between">
            <strong>Expires In:</strong> <span>{data.expiresInText}</span>
        
          </div>
          </div>

          <MDBBtn
          style={{width:"100%"}}
            className="mt-3"
            color="success"
            onClick={onSuccess}
            rounded
          >
            I've Paid
          </MDBBtn>
        </div>
      )}
    </MDBContainer>
  );
};

export default RenderQrCode;
