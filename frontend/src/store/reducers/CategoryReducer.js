const initialState = {
    categories : [],
}

export const categoryReducer = (state = initialState , action) => {
    switch (action.type){
        case "Fetch_Categories":
            return {
                ...state,
                categories: action.payload,
            }
        default:
            return state;
    }
}