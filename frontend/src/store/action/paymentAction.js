export const addPaymentMethod = (method) => {
    return {
        type: "Add_Payment_Method",
        payload : method,
    }
}