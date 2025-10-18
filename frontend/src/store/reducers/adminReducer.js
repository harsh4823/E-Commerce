const initialState = {
    productCount: 0,
    totalRevenue: 0,
    totalOrders: 0
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
    
        default:
            return state;
    }
}