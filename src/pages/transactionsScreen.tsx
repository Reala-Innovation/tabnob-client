import React from 'react'
import Nav from '../components/nav'
import { useInnerWidth } from '../hooks/useInnerWidth'
import TransactionTable from '../components/transactionsTable';

const TransactionsScreen:React.FC = () => {
    const width=useInnerWidth();
  return (
     <div className='body'>
  <Nav/>

  <br/>
<br/>
<br/>
<br/>
{width > 900 && <>

<br/>
<br/>
<br/>
</>}
<TransactionTable topTen/>
</div>
  )
}

export default TransactionsScreen
