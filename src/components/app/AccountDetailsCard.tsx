import { AiFillCheckCircle } from "react-icons/ai"; 
import { AiOutlineCheckCircle } from "react-icons/ai"; 
import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { BeatLoader } from "react-spinners";

const AccountDetailsCard:React.FC<{state:"user"|"loading"|"error",error?:string,bankDetails?:{accountName:string,accountNumber:string},bank?:{bankName:string,bankCode:string}| null}> = ({bankDetails,state,error}) => {
 const [checked,setChecked]=useState<boolean>(false);


 useEffect(()=>{
return ()=>{
    setChecked(false)
}
 },[]);
 
 if(error)return  <div  className={`Account-details error d-flex align-items-center justify-content-center`}>
{error}
 </div>

 if(state==="loading")return  <div  data-aos={"fade-in"} className={`Account-details  d-flex align-items-center justify-content-center`}>
<BeatLoader size={20} color={"rgb(73, 105, 220)"}/>
 </div>
    return (
    <div onClick={()=>{
        setChecked(true);
    }}  className={`Account-details  ${checked ? "checked":""} d-flex align-items-center justify-content-between`}>
      
        <div>
      <span>{bankDetails?.accountName}</span>
      <br/>
      <span>{bankDetails?.accountNumber}</span>
      </div>
<MDBBtn rounded style={{padding:1}} color='light'>
{checked ? <AiFillCheckCircle color="#00ce00" size={30} />:<AiOutlineCheckCircle color="rgb(73, 105, 220)" size={30} />}

</MDBBtn>
    </div>
  )
}

export default AccountDetailsCard
