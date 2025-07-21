import { AiOutlineClockCircle } from "react-icons/ai"; 
import { MDBBadge } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CountdownTimerProps {
  expiryTimestamp: number; // Unix timestamp in seconds
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState(expiryTimestamp - Math.floor(Date.now() / 1000));
const navigate=useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(expiryTimestamp - Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryTimestamp]);
useEffect(()=>{
if(timeLeft<=0)navigate("/Transactions");
},[timeLeft])
  if (timeLeft <= 0) return <span>Expired</span>;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs}s`;
  };

  return (
    <div  className="d-flex align-items-center justify-content-between">
      <strong>Expires In:</strong> <MDBBadge color="warning" rounded> <AiOutlineClockCircle size={20} color={`white`} /> {formatTime(timeLeft)}</MDBBadge>
    </div>
  );
};

export default CountdownTimer;
