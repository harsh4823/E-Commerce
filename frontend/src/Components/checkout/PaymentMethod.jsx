import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethod } from './../../store/action/paymentAction';
import { createUserCart } from './../../store/action/authAction';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector(state => state.payment);
    const { cart,cartId } = useSelector(state => state.carts);
    const {errorMessage } = useSelector(state => state.errors);
    const paymentMethodHandler = (method) => {
        console.log(method);
        dispatch(addPaymentMethod(method));
    };

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                }
            });
            dispatch(createUserCart(sendCartItems));
        }
    },[dispatch,cart]);

  return (
      <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border'>
        <h1 className='text-2xl font-semibold mb-4'>Select Payment Method</h1>
        <FormControl>
            <RadioGroup
                aria-label="paymeent-method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e)=> paymentMethodHandler(e.target.value)}
            >
                <FormControlLabel value="Stripe" control={<Radio color='primary' />} label="Stripe" className='text-gray-700'/>
                <FormControlLabel value="Paypal" control={<Radio color='primary' />} label="Paypal" className='text-gray-700'/>
        </RadioGroup>
        </FormControl>
      </div>
  )
}

export default PaymentMethod;