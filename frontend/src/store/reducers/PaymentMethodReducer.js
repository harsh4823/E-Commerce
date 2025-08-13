const initialState = {
    paymentMethod : null,
};

export const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Add_Payment_Method": {
            return {
                ...state,
                paymentMethod: action.payload,
            };
        }
        default:
            return state;
    }
};