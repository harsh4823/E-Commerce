import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AddressInfo } from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses } from "../../store/action/checkoutAction.js";
import { addToCart } from "../../store/action/cartAction.js";

export const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAddresses());
    }, [dispatch])
    
    const { address } = useSelector(state => state.auth);

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment"
    ];
  return (
      <div className='py-14 min-h-[calc(100vh-100px)]'>
          <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                  <Step key={index}>
                      <StepLabel>{ label }</StepLabel>
                  </Step>
              ))}
          </Stepper>
          <div className='mt-5'>
              {activeStep === 0 && <AddressInfo address={address} />}
          </div>
      </div>
  )
}
