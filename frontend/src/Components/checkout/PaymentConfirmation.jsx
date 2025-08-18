import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Skeleton from './../Shared/Skeleton';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { stripePaymentConfirmation } from './../../store/action/paymentAction';
import toast from 'react-hot-toast';
import { Alert, AlertTitle } from '@mui/material';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.carts);
    const { selectedUserCheckoutAddress } = useSelector(state => state.auth);
    const [errorMessage,setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    useEffect(() => {
        if (paymentIntent && clientSecret && redirectStatus && cart && cart?.length) {

            const sendData = {
                addressId: selectedUserCheckoutAddress?.addressId,
                paymentMethod : "Online",
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: redirectStatus,
                pgResponseMessage : "Payment Successfull"
                
            }
            dispatch(stripePaymentConfirmation(setErrorMessage,setLoading,toast,sendData));
        }
    }, [paymentIntent,clientSecret,redirectStatus,cart,dispatch]);

  return (
        <div className='min-h-full flex items-center justify-center mt-40'>
          {loading ? (
              <div className='max-w-xl mx-auto'>
                  <Skeleton />
              </div>
          ) : errorMessage ? (
                  <div className='flex flex-col justify-center items-center'>
                      <FaExclamationTriangle className='text-red-500 m-4 ' size={74}/>
                <Alert severity="error" variant='filled' className='max-w-[400px]'>
                <AlertTitle>Something Went Wrong</AlertTitle>{errorMessage}
                </Alert>
                </div>
          ):(
            <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
            <div className="text-green-500 mb-4 flex  justify-center">    
            <FaCheckCircle size={64} />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Succesfull</h2>
            <p>Thank you for your purchase! Your payment was Succesfull, and we're processing your order.</p>
            </div>      
          )}
        </div>
  )
}

export default PaymentConfirmation;