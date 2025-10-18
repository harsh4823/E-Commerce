import { createRazorpayOrder, verifyPayment } from './../../store/action/paymentAction';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RazorPay = () => {
  const { totalPrice } = useSelector(state => state.carts);
  // The 'status' from your state might be useful for showing loading/success/error states
  const { status } = useSelector(state => state.razorpay); 
  const { selectedUserCheckoutAddress } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to handle the payment process
    const handlePayment = async () => {
      if (totalPrice === 0) {
        toast.warn("Your Cart is Empty");
        return;
      }

      try {
        // 1. Await the result from the dispatched action
        // This will pause execution until the promise resolves with the order ID
        const orderId = await dispatch(createRazorpayOrder(totalPrice, toast));

        // 2. Check if a valid orderId was returned
        if (!orderId) {
          console.error("Failed to get a valid order id from the action.");
          toast.error("Could not create an order. Please try again.");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is loaded correctly
          amount: totalPrice * 100,
          currency: "INR",
          name: "Your Company Name",
          description: "Payment for your Order",
          order_id: orderId, // 3. Use the awaited orderId here
          handler: function (response) {
            console.log(response);
            const paymentData = {
              orderID: response.razorpay_order_id,
              paymentID: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              addressId: selectedUserCheckoutAddress?.id,
            };
            // This is also async, but you can dispatch it without awaiting
            // if you don't need to do anything immediately after it completes.
            dispatch(verifyPayment(paymentData, toast, navigate));
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9000000000"
          },
          theme: {
            color: "#3498db",
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      } catch (error) {
        console.error("Payment initiation failed:", error);
        toast.error("Could not start payment process. Please try again.");
      }
    };

    // 4. Call the async function
    handlePayment();

  }, [dispatch, totalPrice]); // Dependencies are correct

  return (
    // You might want to show a loading spinner here based on the 'status'
    <div>
      {status === 'loading' && <p>Processing Payment...</p>}
    </div>
  );
}

export default RazorPay;