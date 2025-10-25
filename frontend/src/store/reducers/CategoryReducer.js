const initialState = {
    categories: [],
    pagination : {},
}

export const categoryReducer = (state = initialState , action) => {
    switch (action.type){
        case "Fetch_Categories":
            return {
                ...state,
                categories: action.payload.categories,
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