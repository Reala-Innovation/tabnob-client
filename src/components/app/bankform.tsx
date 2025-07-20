import { AiFillCaretDown } from "react-icons/ai"; 
import React, { useEffect, useMemo, useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { ClipLoader } from 'react-spinners';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import api from '../../api/api';
import AccountDetailsCard from './AccountDetailsCard';
import { formatToNaira } from '../../logics/date';
import { Skeleton } from '@mui/material';
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-react-ui-kit';
import {  validateEmail } from "../../logics/DateFunc";
import { useInnerWidth } from "../../hooks/useInnerWidth";


const BankForm: React.FC<{onNext:(props:any)=>void,loading:boolean}> = ({onNext,loading}) => {
  const [country, setCountry] = useState("Nigeria");
  const [chain,setChain]=useState<string>("LIGHTNING")
  const [bank, setBank] = useState<{ bankName: string; bankCode: string } | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(sessionStorage.amount||"");
  const [email,setEmail]=useState<string>("");
  const [banks, setBanks] = useState<{ bankName: string; bankCode: string }[]>([]);
  const [loading_banks, set_loading_banks] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showEmailField,setShowEmailField]=useState<boolean>(false);

  const getBanks = async () => {
    try {
      set_loading_banks(true);
      const res = await api.get("/api/v1/transactions/bank-lists");
      const data = res.data.data;
      if (data) {
        setBanks(data);
      } else {
        setError("Failed to get banks for selected country");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      set_loading_banks(false);
    }
  };

  const [amountLimits,setAmountLimits]=useState<{max:number,min:number}>()
  
  const getMaxAndMin = async () => {
    try {
      set_loading_banks(true);
      const res = await api.get("/api/v1/transactions/get-payout-limit");
      const data = res.data.data;
      if (data) {
        setAmountLimits({
          min:data?.lowerLimit,
          max:data?.higherLimit
        })
      } else {
        setError("");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      set_loading_banks(false);
    }
  };

  useEffect(() => {
    getBanks();
    getMaxAndMin();
  }, []);

  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [accountDetails, setAccountDetails] = useState<any>();
  const [validateError, setValidateError] = useState<string>("");

  const validateBank = async () => {
    try {
      setValidateError("")
      setIsValidating(true);
      setAccountDetails(undefined)
      const res = await api.post("/api/v1/transactions/resolve-account-number",
        {
          bankCode: bank?.bankCode,
          accountNumber: accountNumber
        }
      );
      const res_data = res.data;
      console.log("account inquiry response is:", res_data);
  if(res_data)    setAccountDetails(res_data.data);
  else {
      setValidateError("account details isn't valid, please try again")

  }

    }
    catch (err: any) {
      console.log("Error fired..")
      setValidateError("Account details isn't valid, please try again")
    }
    finally {
      setIsValidating(false)
    }
  }


const isValidAcc =  (num: string | number)=> {
  // Remove any whitespace just in case
  const cleaned = num.toString().trim();

  // Regex: must be exactly 10 digits
  const regex = /^\d{10}$/;

  return regex.test(cleaned);
}

  useEffect(() => {
    if (!accountDetails
      &&
      !isValidating
      &&
      isValidAcc(accountNumber as string)
      &&
      bank 
      &&
      !validateError
) {
validateBank();
    }
    if(accountDetails || isValidating || validateError){
const followHeight=document.querySelector(".pc-sideNav") as HTMLDivElement;
const followHeightContent=document.querySelector(".pc-side-content") as HTMLDivElement;
if(followHeight){
  followHeight.style.minHeight="650px"
}
if(followHeightContent){
  followHeightContent.style.minHeight="650px"
}
    }
    else{
const followHeight=document.querySelector(".pc-sideNav") as HTMLDivElement;
const followHeightContent=document.querySelector(".pc-side-content") as HTMLDivElement;
if(followHeight){
  followHeight.style.minHeight="550px"
}
if(followHeightContent){
  followHeightContent.style.minHeight="550px"
}
    }
  }, [
    accountNumber,
    bank,
    isValidating,
    accountDetails
  ])

  const [dataReady,setDataReady]=useState<boolean>(false);



  useEffect(()=>{
// email toglle
   if(amount >= (500*1000)){
      if(!showEmailField)setShowEmailField(true);
    }
    else{
if(showEmailField)setShowEmailField(false)
    }
  },[amount])
  useEffect(()=>{
    if(accountDetails 
      
      && 
      
      (parseFloat(amount||"0") >= (amountLimits?.min||0) 
      
      && 
    
      parseFloat(amount||"0") <= (amountLimits?.max||0))
    
  
    ){
setDataReady(true);
    }
    else{
      setDataReady(false);
    }

 
  },[accountDetails,amount,amountLimits]);
  const mostHaveEmail=useMemo(()=>{
return showEmailField && !validateEmail(email)
  },[showEmailField,email])
  const width=useInnerWidth();
    return (
    <MDBContainer className="form-container p-4" style={{ maxWidth: "400px" }}>
      {error && <span className='error'>{error}</span>}
      <div className="d-flex align-items-center" style={{gap:10}}>
        <div style={{width:"48%"}}>
      <label className="form-label">Choose country</label>
      <MDBDropdown>
        <MDBDropdownToggle
          tag="button"
          className="btn btn-outline-primary"
          style={{
            borderRadius:4,
            width:"100%",
            height:40,
            display:'flex',
            borderColor:'#e0d8d8',
            justifyContent:"space-between",
            alignItems:'center'
          }}
        >
          <span style={{color:"#757171"}}>{country}</span>
  {/* <FaChevronDown size={16} color="#757171" /> */}
  <AiFillCaretDown style={{transform:"translate(6px,0px)"}} size={12} color="#737171" />
        </MDBDropdownToggle>
        <MDBDropdownMenu style={{
          width:"100%"
        }}>
          <MDBDropdownItem link onClick={() => setCountry('Nigeria')}>
            Nigeria
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
</div>

  <div style={{width:"48%"}}>
      <label className="form-label">Chain</label>
      <MDBDropdown>
        <MDBDropdownToggle
          tag="button"
          className="btn btn-outline-primary"
          style={{
            borderRadius:4,
            width:"100%",
            height:40,
            display:'flex',
            borderColor:'#e0d8d8',
            justifyContent:"space-between",
            alignItems:'center'
          }}
        >
          <span style={{color:"#757171"}}>{chain}</span>
  {/* <FaChevronDown size={16} color="#757171" /> */}
  <AiFillCaretDown style={{transform:"translate(6px,0px)"}} size={12} color="#737171" />
        </MDBDropdownToggle>
        <MDBDropdownMenu style={{
          width:"100%"
        }}>
          <MDBDropdownItem link onClick={() => setChain('LIGHTNING')}>
            LIGHTNING
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
</div>





</div>

      <label className="form-label mt-3">
        {loading_banks && <ClipLoader size={20} />} Select Bank
      </label>
      <Autocomplete
        options={banks}
        getOptionLabel={(option) => option.bankName}
        onChange={(event, newValue) =>{
           setBank(newValue)
           event.currentTarget
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select a bank"
            variant="outlined"
            size="small"
          />
        )}
        disabled={loading_banks}
      />

      <label className="form-label mt-3">Account Number</label>
      <MDBInput
        type="text"
        placeholder="0123456789"
        value={accountNumber}
        onChange={(e) => {setAccountNumber(e.target.value)


          setValidateError("");
          if(accountDetails)setAccountDetails(undefined)
        }}
      />
{(isValidating ||validateError|| (bank && accountDetails )) && <AccountDetailsCard error={validateError} bank={bank} bankDetails={accountDetails} state={isValidating ? "loading":accountDetails ? "user":"error"}/>}

      <label  className="form-label mt-3 d-flex " style={{gap:10}}>
        Amount <span style={{fontSize:width < 400 ?14:undefined }} className="d-flex">{amountLimits ? <span style={{ color: "#9a9a9a" }}>({formatToNaira(amountLimits.min,true)} - {formatToNaira(amountLimits.max,true)})</span>:<><Skeleton width={50} /> - <Skeleton width={50} /></>}
      </span></label>
      <MDBInput
        type="number"
        placeholder="₦"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      
        <label className="form-label mt-3 d-flex " style={{gap:10}}>
        Email Address ({!showEmailField ? "Optional":"required"})
           </label>
      <MDBInput
        type="email"
       placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <MDBBtn
        className="w-100 mt-4"
        onClick={()=>onNext({
          bank,
          accountDetails,
          accountNumber,
          amount,
          email
        })}
        style={{
          borderRadius:30,
          background: "linear-gradient(30deg, var(--gold), var(--primary))",
          border: "none",
          opacity:(!dataReady || mostHaveEmail || loading) ? 0.5:1

        }}
        disabled={!dataReady || mostHaveEmail || loading}
      >
       {loading ? <>processing...<ClipLoader size={14}/></>:" Next"}
      </MDBBtn>
    </MDBContainer>
  );
};

export default BankForm;
