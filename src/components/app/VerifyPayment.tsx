
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import type { QuoteData } from './ConfirmDetails';
import api from '../../api/api';
import Lottie from 'lottie-react-web';
import animation from './loader.json'

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

const VerifyPayment: React.FC<props> = ({ quoteData, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any>();

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get(`/api/v1/transactions/qoute/${quoteData?.quoteId}`);
console.log('response:',res?.data)
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
          <h1>render data </h1>
          <textarea style={{fontSize:10,maxHeight:100}}>{JSON.stringify(data)}</textarea>
         
             <MDBBtn
                   style={{width:"100%"}}
                     className="mt-3"
                     color="success"
                     onClick={onSuccess}
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
