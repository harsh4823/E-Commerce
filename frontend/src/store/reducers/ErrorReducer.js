const initialState = {
    isLoading : false,
    errorMessage: null,
    categoryLoader: false,
    categoryError : null,
    btnLoader : false,
}

export const errorReducer = (state = initialState,action) => {

    switch (action.type) {
        case "Is_Fetching":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            }
        case "Is_Success":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            }
        case "Is_Error":
            return{
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}