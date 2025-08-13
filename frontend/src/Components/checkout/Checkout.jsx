import { Button, Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AddressInfo } from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses } from "../../store/action/checkoutAction.js";
import Skeleton from '../Shared/Skeleton';
import ErrorPage from '../Shared/ErrorPage';
import PaymentMethod from './PaymentMethod';

export const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchUserAddresses());
    }, [dispatch]);
    
    const { address , selectedUserCheckoutAddress} = useSelector(state => state.auth);
    const { isLoading, errorMessage } = useSelector(state => state.errors);

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment"
    ];

    const paymentMethod = false;

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    }
    return (
      <div className='py-14 min-h-[calc(100vh-100px)]'>
          <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                  <Step key={index}>
                      <StepLabel>{ label }</StepLabel>
                  </Step>
              ))}
            </Stepper>
            
            {isLoading ? (
                <div className='lg:w-[80%] mx-auto py-5'>
                    <Skeleton/>
                </div>
            ) : (
                <div className='mt-5'>
              {activeStep === 0 && <AddressInfo address={address} />}
              {activeStep === 1 && <PaymentMethod />}
                </div>
                    
            )}

          <div className='flex justify-between items-center p-4 border-slate-200 fixed z-50 h-18 bottom-0 bg-white left-0 w-full shadow-[0_-2px_4px_rgba(100,100,100,0.25)]'>
                <Button variant='outlined' disabled={activeStep===0} onClick={handleBack}>Back</Button>
                {activeStep != steps.length - 1 && (
                    <Button variant='contained' onClick={handleNext}
                        disabled={errorMessage || (activeStep === 0 ? !selectedUserCheckoutAddress
                            : activeStep === 1 ? !paymentMethod : false)} className='h-10'>
                    Proceed
                </Button>
              )}
            </div>
            
            {errorMessage && <ErrorPage errorMessage={errorMessage}/>}
      </div>
  )
}
