import React, { useEffect, useState } from 'react';
import {
  MDBBadge,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBInput,
} from 'mdb-react-ui-kit';
import api from '../api/api';
import { getErrorMessage } from '../logics/getErrorMesage';
import { formatToDollars, formatToNaira } from '../logics/date';
import { Skeleton } from '@mui/material';

interface TransactionItem {
  reference: string;
  satAmount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  amount: string;
  settlementAmount: number;
  source: string;
  fromAsset: string;
  chain: string;
  toCurrency: string;
  address: string;
}

const statusColorMap: Record<string, string> = {
  success: 'success',
  pending: 'warning',
  "pending_address_deposit":"warning",
  failed: 'danger',
  expired: 'secondary'
};

const ITEMS_PER_PAGE = 5;

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/transactions/lists`);
      if (res?.data?.success) {
        setTransactions(res.data.data.offRamps);
      }
    } catch (error) {
      console.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (item) =>
      item.reference.toLowerCase().includes(search.toLowerCase()) ||
      item.address?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginated = filteredTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <MDBContainer fluid className="py-4" style={{
      background:"white",
      borderRadius:20
    }}>
      <MDBInput
        label="Search by reference or address..."
        className="mb-3"
        value={search}
        
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to first page on search
        }}
      />

      <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
        <MDBTable hover align="middle">
          <MDBTableHead>
            <tr>
              <th>REFERENCE</th>
              <th>SATS AMOUNT</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>SETTLEMENT AMOUNT</th>
              <th>ASSET</th>
              <th>CHAIN</th>
              <th>CURRENCY</th>
              <th>ACTIONS</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {Array(9).fill(0).map((_, idx) => (
                    <td key={idx}><Skeleton width={50} height={20} /></td>
                  ))}
                </tr>
              ))
            ) : paginated.length > 0 ? (
              paginated.map((item, index) => (
                <tr key={index}>
                  <td>{item.reference}</td>
                  <td>{item.satAmount}</td>
                  <td>
                    <MDBBadge color={(statusColorMap[item.status.toLowerCase()] || 'dark') as "primary"} pill>
                      {(item?.status=="pending_address_deposit" ? "pending":item?.status)}
                    </MDBBadge>
                  </td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                  <td>{formatToNaira(item.settlementAmount,true)}</td>
                  <td>{item.fromAsset.toUpperCase()}</td>
                  <td>{item.chain.toUpperCase()}</td>
                  <td>{item.toCurrency.toUpperCase()}</td>
                  <td style={{ color: 'orange', cursor: 'pointer' }}>View Details</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={12} className="text-center">No transactions found.</td></tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <MDBPagination>
            <MDBPaginationItem disabled={page === 1}>
              <MDBPaginationLink onClick={() => setPage(page - 1)}>Previous</MDBPaginationLink>
            </MDBPaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <MDBPaginationItem key={i} active={page === i + 1}>
                <MDBPaginationLink onClick={() => setPage(i + 1)}>{i + 1}</MDBPaginationLink>
              </MDBPaginationItem>
            ))}
            <MDBPaginationItem disabled={page === totalPages}>
              <MDBPaginationLink onClick={() => setPage(page + 1)}>Next</MDBPaginationLink>
            </MDBPaginationItem>
          </MDBPagination>
        </div>
      )}
    </MDBContainer>
  );
};

export default TransactionTable;
