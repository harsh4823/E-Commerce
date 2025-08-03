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
        default:
            return state;
    }
}