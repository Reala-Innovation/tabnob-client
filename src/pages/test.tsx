import React, { useState } from 'react'
import api from '../api/api'
import { MDBBtn } from 'mdb-react-ui-kit'

const Test:React.FC = () => {
    const [loading,setLoading]=useState<boolean>(false)
    const run=async ()=>{
        try{
            setLoading(true);
const res=await api.post(`/api/v1/transactions/simulate-address-deposite-test`,{
  "address": "lnbt2596-mocked-5f519f22b3269324fb64540b51435d3b4b1992f244bf1f2ba72dec1dacafdd14ddfb297780c14c1cdf02c07f7a317961221a03e4b0e145df7d15283207382c4338db328604acqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq47d2eb6bfa38d97b6d6fec702eb8fe099ddc9a5092a7a70d3b5a434167d56179fa54bba82a10a28124e83f58f9d638d27bf7c422cf9b5599f1df5aaaf503503a8351299925d5",
  "amount": "2596"
})
console.log(res.data);
        }
        catch(err:any){

        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
      <MDBBtn onClick={run}>{loading  ? "Please wait..":'run'}</MDBBtn>
    </div>
  )
}

export default Test
