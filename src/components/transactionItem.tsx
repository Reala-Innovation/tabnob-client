import React from 'react';
import moment from 'moment';
import type { TransactionProps } from './app/VerifyPayment';
import { formatToDollars, formatToNaira } from '../logics/date';
import { MDBBadge } from 'mdb-react-ui-kit';

interface Props {
  transaction: TransactionProps;
  onClick:()=>void
}

const TransactionItemCard: React.FC<Props> = ({ transaction ,onClick}) => {
  const isCredit = parseFloat(transaction.amount) > 0;


  const statusColorMap: Record<string, string> = {
  success: 'success',
  pending: 'warning',
  "pending_address_deposit":"warning",
  failed: 'danger',
  expired: 'secondary'
};


  const createdDate = moment(transaction.createdAt).format('MMM Do, HH:mm:ss');

  return (
    <div style={styles.card} onClick={onClick}>
      {/* <div style={styles.icon}>{icon}</div> */}
      <div style={styles.details}>
        <div style={styles.title}>{formatToNaira(transaction.settlementAmount,true)}</div>
        <div style={styles.meta}>{createdDate}</div>
      </div>
      <div style={styles.amountSection}>
        <div
          style={{
            ...styles.amount,
            color: isCredit ? '#0f9d58' : '#d93025',
          }}
        >
          {formatToDollars(transaction.amount)}
        </div>
        <div style={styles.status}> <MDBBadge color={(statusColorMap[transaction.status.toLowerCase()] || 'dark') as "primary"} pill>
                      {(transaction?.status=="pending_address_deposit" ? "pending":transaction?.status)}
                    </MDBBadge></div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#fff',
    borderBottom: '1px solid #f0f0f0',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
    color: '#555',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },
  amountSection: {
    textAlign: 'right',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 11,
    color: '#4caf50',
  },
};

export default TransactionItemCard;
