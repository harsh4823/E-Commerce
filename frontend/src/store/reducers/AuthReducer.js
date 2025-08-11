const initialState = {
    user: null,
    address: [],
    selectedUserCheckoutAddress : null,
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
        case "Add_User_Addresses": {
            return {
                ...state,
                address: [...state.address,action.payload],
            }
        };
        case "Update_User_Addresses": {
            return {
                ...state,
                address: state.address.map(item => 
                    item.addressId === action.payload.addressId ? action.payload.address : item
                )
            }
        };
        case "Select_Checkout_Address": {
            return {
                ...state,
                selectedUserCheckoutAddress: action.payload,
            }
        };
        default:
            return state;
    }
}