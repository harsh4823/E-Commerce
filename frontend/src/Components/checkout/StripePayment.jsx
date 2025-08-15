import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const StripePayment = () => {
  return (
      <div className='h-96 flex justify-center items-center'>
        <Alert severity="warning" variant='filled' className='max-w-[400px]'>
        <AlertTitle>Stripe  Unavailabe</AlertTitle>
        Stripe  Unavailable. Please try another payment method.
        </Alert>
    </div>
  )
}

export default StripePayment