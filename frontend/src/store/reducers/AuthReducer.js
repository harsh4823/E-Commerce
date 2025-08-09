const initialState = {
    user: null,
    address : [],
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Login_User": {
            return {
                ...state,
                user: action.payload,
            }
        };
        case "Log_Out": {
            return {
                ...state,
                user: null,
                address: null,
            }
        };
        case "Delete_User": {
            return {
                ...state,
                user: null,
                address: null,
            }
        };
        case "User_Addresses": {
            return {
                ...state,
                address: action.payload,
            }
        };
        default:
            return state;
    }
}