import React from 'react';
import { Skeleton, Box } from '@mui/material';

const TransactionItemCardSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        width:"100%",
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* Icon Placeholder */}
      {/* <Skeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} /> */}

      {/* Details Section */}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} />
      </Box>

      {/* Amount + Status */}
      <Box sx={{ textAlign: 'right', minWidth: 100 }}>
        <Skeleton variant="text" width={60} height={20} sx={{marginLeft:20 }} />
        <Skeleton variant="rectangular" width={60} height={24} sx={{ marginLeft:20 }} />
      </Box>
    </Box>
  );
};

export default TransactionItemCardSkeleton;
