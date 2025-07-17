import React  from 'react';
import "../../styles/conformQuote.css";
// import { PuffLoader } from 'react-spinners';

export interface QuoteData {
  id: string;
  status: string;
  settlementCurrency: string;
  exchangeRate: number;
  quoteId: string;
  settlementAmount: number;
  amount: number;
  expiryTimeStamp: number;
  expiresInText: string;
  quoteText: string;
  destination: {
    type: string;
    bankCode: string;
    accountName: string;
    accountNumber: string;
  };
  fee: number;
  btcAmount: number;
}

export interface requestDataProps{
     bank: {
    name: string;
    code: string;
  };
  accountDetails: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
  accountNumber: string;
  amount: string;
}
interface QuoteContentProps {
  onClose: () => void;
  onConfirm: (data:QuoteData) => void;
  requestData:requestDataProps,
  quoteData:QuoteData
}

const ConfirmDetailsContent: React.FC<QuoteContentProps> = ({ onClose, onConfirm,requestData,quoteData}) => {



  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };
  return (
    <div className="sheet-content">
    
        <div className="content-container">
          <h3 className="subtitle">Convert Bitcoin to Naira </h3>
          
          <div className="details-container">
            <div className="detail-row">
              <span className="detail-label">Amount:</span>
              <span className="detail-value">
                {formatCurrency(quoteData.amount, 'USD')}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">BTC Amount:</span>
              <span className="detail-value">{quoteData.btcAmount.toFixed(8)} BTC</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Exchange Rate:</span>
              <span className="detail-value">1 BTC = {quoteData.exchangeRate.toLocaleString()} NGN</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">You'll Receive:</span>
              <span className="detail-value receiving-amount">
                {formatCurrency(quoteData.settlementAmount, quoteData.settlementCurrency)}
              </span>
            </div>
            
            <div className="bank-details">
              <p className="detail-label">Bank Details:</p>
              <p className="detail-value">Name : {requestData?.accountDetails?.account_name}</p>
              <p className="detail-value">Account : {quoteData.destination.accountNumber}</p>
              <p className="detail-value">Bank  : {requestData?.bank?.name}</p>
            </div>
            
            <p className="expiry-text">{quoteData.expiresInText}</p>
          </div>
          
          <button className="confirm-button" onClick={()=>onConfirm(quoteData)}>
            Confirm Transaction
          </button>
          
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
    </div>
  );
};

export default ConfirmDetailsContent;