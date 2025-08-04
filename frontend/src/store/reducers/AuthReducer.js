const initialState = {
    user: null,
    address : [],
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Login_User" :  {
            return {
                ...state,
                user : action.payload,
            }
        }
        case "Log_Out": {
            return {
                ...state,
                user: null,
                address : null,
            }
        }
        default:
            return state;
    }
}