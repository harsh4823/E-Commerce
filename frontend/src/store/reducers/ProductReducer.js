const initialState = {
    products:null,
    categories:null,
    pagination:{},
}

export const productReducer = (state=initialState,action) => {
    switch (action.type){
        case "Fetch_Products":
            return{
                ...state,
                products: action.payload.products,
                pagination: {
                    ...state.pagination,
                    pageNumber : action.payload.pageNumber,
                    totalPages : action.payload.totalPages,
                    totalItems : action.payload.totalItems,
                    pageSize   : action.payload.pageSize,
                    lastPage   : action.payload.lastPage,
                }
            };
        default:
            return state;
    }
};