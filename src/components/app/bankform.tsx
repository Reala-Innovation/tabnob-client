import React, { useEffect, useState } from 'react';
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

const BankForm: React.FC = () => {
  const [country, setCountry] = useState("Nigeria");
  const [bank, setBank] = useState<{ name: string; code: string } | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [loading_banks, set_loading_banks] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    getBanks();
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
          bankCode: bank?.code,
          accountNumber: accountNumber
        }
      );
      const res_data = res.data;
  
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
  }, [
    accountNumber,
    bank,
    isValidating,
    accountDetails
  ])

  const [dataReady,setDataReady]=useState<boolean>(false);


  useEffect(()=>{
    if(accountDetails && parseFloat(amount||"0") > 1000){
setDataReady(true);
    }
  });

  return (
    <MDBContainer className="p-4" style={{ maxWidth: "400px" }}>


      {error && <span className='error'>{error}</span>}

      <label className="form-label">Choose country</label>
      <Autocomplete
        options={["Nigeria"]}
        getOptionLabel={(option) => option}
        defaultValue={country}
        onChange={(event: any, newValue) => {
          setCountry(newValue as string)
           event.currentTarget
        
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select a country"
            variant="outlined"
            size="small"
          />
        )}
      />



      <label className="form-label mt-3">
        {loading_banks && <ClipLoader size={20} />} Select Bank
      </label>
      <Autocomplete
        options={banks}
        getOptionLabel={(option) => option.name}
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

      <label className="form-label mt-3">
        Amount <span style={{ color: "#9a9a9a" }}>(NGN 1,000 - NGN 2,000,000)</span>
      </label>
      <MDBInput
        type="number"
        placeholder="₦"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <MDBBtn
        className="w-100 mt-4"
        style={{
          borderRadius:30,
          background: "linear-gradient(30deg, var(--gold), var(--primary))",
          border: "none",
          opacity:dataReady? 1:0.5

        }}
        disabled={!dataReady}
      >
        Next
      </MDBBtn>
    </MDBContainer>
  );
};

export default BankForm;
