const initialState = {
    productCount: 0,
    totalRevenue: 0,
    totalOrders: 0,
    sellers: [],
    pagination:{},
}
export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Fetch_Analytics_Data":
            return {
                ...state,
                productCount:action.payload.productCount,
                totalRevenue:action.payload.totalRevenue,
                totalOrders:action.payload.totalOrders,
            }
        case "Fetch_Sellers": 
            return {
                ...state,
                sellers: action.payload.sellers,
                pagination: {
                    ...state.pagination,
                    pageNumber : action.payload.pageNumber,
                    totalPages : action.payload.totalPages,
                    totalItems : action.payload.totalItems,
                    pageSize   : action.payload.pageSize,
                    lastPage   : action.payload.lastPage,
                },
            }
    
        default:
            return state;
    }
}