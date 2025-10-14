const initialState = {
    orderId: null,
    status: 'idle', 
    error: null,
    verificationStatus: 'idle',
    verificationError: null,
}

export const razorpayReducer = (state=initialState, action) => {
    switch (action.type) {
        case "Create_Order_Request":
            return {
                ...state,
                status: 'loading',
            }
        case "Create_Order_Success":
            return {
                ...state,
                status: 'succeeded',
                orderId: action.payload,
                error:null,
            }
        case  "Create_Order_Failure":
            return {
                ...state,
                status: 'failed',
                error:action.payload,
            }
        case "Verify_Payment_Request":
            return {
                ...state,
                verificationStatus: 'loading',
            }
        case "Verify_Payment_Success":
            return {
                ...state,
                verificationStatus: 'succeeded',
                verificationError:null,
            }
        case "Verify_Payment_Failure":
            return {
                ...state,
                verificationStatus: 'failed',
                verificationError: action.payload,
            };
        case "Remove_Order_Id": {
            return {
                ...state,
                 orderId: null,
                 status: 'idle', 
                 error: null,
                 verificationStatus: 'idle',
                 verificationError: null,
            }
        }
        default:
            return state;
    }
}