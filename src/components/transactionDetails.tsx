import React, { useState } from 'react';
import { MDBBtn, MDBBadge } from 'mdb-react-ui-kit';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import type { TransactionItem } from './transactionsTable';
import moment from 'moment';


const TransactionDetails:React.FC<{transaction:TransactionItem}> = ( { transaction }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(transaction.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000); // uncheck after 10s
  };

  const statusColorMap: Record<string, string> = {
  success: 'success',
  pending: 'warning',
  "pending_address_deposit":"warning",
  failed: 'danger',
  expired: 'secondary'
};


  return (
    <div style={{ padding: 16 }}>
      <div className="mb-2">
        <strong>Ref:</strong> <span>{transaction.reference}</span>
      </div>
      <div className="mb-2">
        <strong>Status:</strong>{' '}
        <MDBBadge 
        
        color={(statusColorMap[transaction.status.toLowerCase()] || 'dark') as "primary"}
        
        light>
          {transaction.status}
        </MDBBadge>
      </div>
      <div className="mb-2">
        <strong>Amount (USD):</strong> ${transaction.amount}
      </div>
      <div className="mb-2">
        <strong>Sats Amount:</strong> {parseInt(transaction.satAmount).toLocaleString()} sats
      </div>
      <div className="mb-2">
        <strong>BTC Amount:</strong>{' '}
        <code>{(parseInt(transaction.satAmount) / 100_000_000).toFixed(8)} BTC</code>
      </div>
      <div className="mb-2">
        <strong>BTC Rate:</strong> ${transaction.settlementAmount.toLocaleString()}
      </div>
      <div className="mb-2">
        <strong>Exchange Rate:</strong> {transaction.toCurrency}
      </div>
    
     <div className="mb-2">
  <strong>Date:</strong> {moment(transaction.updatedAt).format("MMMM Do YYYY, h:mm A")}
</div>

      <div className="mb-2">
        <strong>Lightning Address:</strong>
        <div
          style={{
            background: '#f5f5f5',
            padding: 10,
            borderRadius: 6,
            marginTop: 4,
            position: 'relative',
            wordBreak: 'break-word',
          }}
        >
          <code>{transaction.address}</code>
          <MDBBtn
            size="sm"
            color={copied ? 'success' : 'secondary'}
            rounded
            style={{ position: 'absolute', top: 6, right: 6 }}
            onClick={handleCopy}
          >
            {copied ? <FaCheck /> : <FaRegCopy />}
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
