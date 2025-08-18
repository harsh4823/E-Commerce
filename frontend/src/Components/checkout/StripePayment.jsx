import { Alert, AlertTitle } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from './../../store/action/paymentAction';
import Skeleton from '../Shared/Skeleton';

const StripePayment = () => {
  const dispatch = useDispatch();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const { totalPrice, clientSecret } = useSelector(state => state.carts);
  const { isLoading, errorMessage } = useSelector(state => state.errors);
  const { user,selectedUserCheckoutAddress } = useSelector(state => state.auth);

  useEffect(() => {
    if (!clientSecret) {
      const sendData = {
        amount: Number(totalPrice) * 100,
        currency: "INR",
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: "1"
        }
      };
       
      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret,totalPrice,dispatch]);
  
  if (isLoading) {
    return (
      <div className='max-w-lg mx-auto'>
        <Skeleton/>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <Alert severity="error" variant='filled' className='max-w-[400px]'>
          <AlertTitle>Something Went Wrong</AlertTitle>{errorMessage}
        </Alert>
      </div>
    )
  }
  
  return (
    <>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice}/>
    </Elements>
    </>
  )
}

export default StripePayment