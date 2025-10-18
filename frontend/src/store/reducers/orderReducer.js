const initialState = {
    adminOrders: null,
    pagination : {},
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "":
            return {
                ...state,
            }
    
        default:
            return state;
    }
}