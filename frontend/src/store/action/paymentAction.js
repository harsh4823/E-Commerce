import api from './../../api/api';

export const addPaymentMethod = (method) => {
    return {
        type: "Add_Payment_Method",
        payload: method,
    }
};

export const createStripePaymentSecret = (sendData) => async(dispatch) => {
    try {
        dispatch({ type: "Is_Fetching" });
        const { data } = await api.post(`/order/stripe-client-secret`,sendData);
        dispatch({
            type: "Client_Secret",
            payload: data,
        });
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({ type: "Is_Success" });
    } catch (error) {
        console.log(error);
        dispatch({ type: "Is_Error" });
        
    }
};

export const stripePaymentConfirmation = (setErrorMessage,setLoading,toast,sendData) => async(dispatch) => {
    try {
        const { data } = await api.post(`/order/users/payment/online`, sendData);
        console.log(data);
        
        if (data) {   
            dispatch({type: "Remove_Client_Secret"});
            dispatch({type: "Remove_Selected_Checkout_Address"});
            localStorage.removeItem("client-secret");
            localStorage.removeItem("cartItems");
            toast.success("Order Accepted");
        } else {
            setErrorMessage("Payment Failed. Please Try Again.")
        }
    } catch (error) {
        console.log(error);
        toast.error("Payment Failded. Please Try Again.")
        setErrorMessage("Payment Failed. Please Try Again.")
    }
};

export const createRazorpayOrder = (amount, toast) => async (dispatch) => {
    dispatch({ type: "Create_Order_Request" });
        try {
            const { data } = await api.post(`/order/razorpay-order?amount=${amount}`);
            dispatch({
                type: "Create_Order_Success",
                payload: data,
            });
            return data;
        } catch (error) {
            dispatch({
            type: "Create_Order_Failure",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
            toast.error(error.response?.data?.message || 'Failed to create Order');
        }
};

export const verifyPayment = (paymentData, toast,navigate) => async (dispatch) => {
    dispatch({ type: "Verify_Payment_Request" });
    try {
        const { data } = await api.post("/verify/payment", paymentData);
        dispatch({
            type: "Verify_Payment_Success",
            payload: data,
        });
        if (data) {   
            dispatch({type: "Remove_Client_Secret"});
            dispatch({ type: "Remove_Selected_Checkout_Address" });
            dispatch({ type: "Remove_Order_Id" });
            localStorage.removeItem("client-secret");
            localStorage.removeItem("cartItems");
            toast.success("Order Accepted");
        }
        navigate("/");
        return data;
    } catch (error) {
        dispatch({
            type:"Verify_Payment_Failure",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        toast.error(error?.response?.data?.message || "Payment Confirmation Failed");   
    }
}