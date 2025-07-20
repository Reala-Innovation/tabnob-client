import React, { useState } from 'react'
import api from '../api/api'
import { MDBBtn } from 'mdb-react-ui-kit'

const Test:React.FC = () => {
    const [loading,setLoading]=useState<boolean>(false)
    const run=async ()=>{
        try{
            setLoading(true);
const res=await api.post(`/api/v1/transactions/simulate-address-deposite-test`,{
  "address": "lnbt2596-mocked-ba441d7cef1bbfb9a3ec212b4cbf6299a4e4b42aa14eef1b35e891ab823309181e1e9a185bb4ac2c324208854caa7adc1e42c508e235460df8b856a3b87602c66c341a7a06d2qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqcfb0fbe102f8fd9b43cb8fb0ad9c8e0cd4812bdb3bba10146abf240c6b944f3118f48f169e3fdb97678daf0d5e39dbe39ed8fcd8200abbafc81b0b4c19f815e47a41643f4f46",
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
