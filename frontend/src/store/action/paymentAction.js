import api from './../../api/api';

export const addPaymentMethod = (method) => {
    return {
        type: "Add_Payment_Method",
        payload: method,
    }
};

export const createStripePaymentSecret = (totalPrice) => async(dispatch) => {
    try {
        dispatch({ type: "Is_Fetching" });
        const { data } = await api.post(`/order/stripe-client-secret`,
            {
                "amount": Number(totalPrice)*100,
                "currency" : "inr"
            }
        );
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