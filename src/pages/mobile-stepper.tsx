import React from 'react';
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { BiRadioCircleMarked, BiCheckDouble } from "react-icons/bi";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import { MDBBtn } from 'mdb-react-ui-kit';

interface StepData {
  label: string;
}

interface MobileTransactionStepperProps {
  steps: StepData[];
  activeStep:number,
  
}

const MobileTransactionStepper: React.FC<MobileTransactionStepperProps> = ({ steps,activeStep }) => {

//   const handleNext = () => {
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

  const CustomStepIcon = (props: any) => {
    const { active, completed } = props;
    if (completed) return <BiCheckDouble color="green" size={24} />;
    if (active) return <BiRadioCircleMarked color="#270cc3" size={24} />;
    return <BiRadioCircleMarked color="#d0d0d0" size={24} />;
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
{/* 
      {activeStep === steps.length ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            All steps completed — Transaction finished!
          </Typography>
          <MDBBtn style={{ borderRadius: 30 }} onClick={handleReset}>
            New Transaction
          </MDBBtn>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <div style={{ justifyContent: "center", gap: 10 }} className='d-flex align-items-center justify-content-center'>
            <MDBBtn
              color="secondary"
              style={{
                padding: 5,
                width: 40,
                height: 40,
                border: "1px solid #d7d7d7",
                borderRadius: 30
              }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              <AiOutlineArrowLeft color="#270cc3" size={20} />
            </MDBBtn>
            <MDBBtn
              style={{
                background: "var(--primary)",
                boxShadow: "none",
                padding: 5,
                width: 40,
                height: 40,
                borderRadius: 20
              }}
              onClick={handleNext}
              color="primary"
            >
              {activeStep === steps.length - 1 ? <BiCheckDouble size={20} /> : <AiOutlineArrowRight size={18} />}
            </MDBBtn>
          </div>
        </Box>
      )} */}
    </Box>
  );
};

export default MobileTransactionStepper;
