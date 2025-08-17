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