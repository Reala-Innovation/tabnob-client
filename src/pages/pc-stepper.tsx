import { BiRadioCircleMarked } from "react-icons/bi"; 
import { BiCheckDouble } from "react-icons/bi"; 
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"; 
import React from 'react';
import {
  Box,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';

interface StepData {
  label: string;
  description:string
}

interface TransactionStepperProps {
  steps: StepData[];
  activeStep: number;
  setActiveStep: (n: any) => void;
}

const TransactionStepper: React.FC<TransactionStepperProps> = ({ steps, activeStep, setActiveStep }) => {

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Custom step icon function
  const CustomStepIcon = (props: any) => {
    const { active, completed } = props;

    if (completed) {
      return <BiCheckDouble className="own-color" color="green" size={24} />;
    }
    if (active) {
      return <BiRadioCircleMarked className="own-color" color="#563bf0" size={24} />;
    }
    return <BiRadioCircleMarked className="own-color" color="#d0d0d0" size={24} />;
  };

  return (
    <Box className="pc-sideNav">
      <div className="pc-side-content">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} completed={activeStep > index}>
              <StepLabel StepIconComponent={CustomStepIcon}>{step.label}</StepLabel>
              <Box sx={{ ml: 3, mb: 2 }}>
                {activeStep === index && (
                  <>
                    {activeStep == index && <div style={{ justifyContent: "flex-start", gap: 10 }} className='d-flex align-items-center justify-content-start'>
                     
                     
                     <span className="description">{step?.description}</span>

                      {/* <MDBBtn
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
                      </MDBBtn> */}
                      {/* <MDBBtn
                        style={{ background: "var(--primary)", boxShadow: "none", padding: 5, width: 40, height: 40, borderRadius: 20 }}
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? <BiCheckDouble size={20} /> : <AiOutlineArrowRight size={18} />}
                      </MDBBtn> */}
                    </div>}
                  </>
                )}
              </Box>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <div>
            <h5 style={{ padding: 10 }}>
              All steps completed — Transaction finished!
            </h5>
            <MDBBtn style={{ borderRadius: 30 }} onClick={handleReset}>
              New Transaction
            </MDBBtn>
          </div>
        )}
      </div>
    </Box>
  );
};

export default TransactionStepper;
