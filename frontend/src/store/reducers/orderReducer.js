const initialState = {
    adminOrders: null,
    pagination : {},
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Fetch_Orders":
            return {
                ...state,
                adminOrders: action.payload.orders,
                pagination: {
                    ...state.pagination,
                    pageNumber : action.payload.pageNumber,
                    totalPages : action.payload.totalPages,
                    totalItems : action.payload.totalItems,
                    pageSize : action.payload.pageSize,
                    lastPage : action.payload.lastPage,
                }
            }
    
        default:
            return state;
    }
}