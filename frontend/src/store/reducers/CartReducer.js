const initialState = {
    cart : [],
    totalPrice : 0,
    cartId : null,
};

export const cartReducer = (state=initialState,action) => {
    switch(action.type){
        case "Add_To_Cart": {
            const productToAdd = action.payload;
            // console.log(productToAdd);
            
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId 
            );
            if(existingProduct){
                const updatedCart = state.cart.map((item)=>{
                    if(item.productId===productToAdd.productId){
                        return productToAdd; 
                    }else{
                        return item;
                    }
                });
                return {
                    ...state,
                    cart:updatedCart,
                }
            }else{
                const newCart = [...state.cart,productToAdd];
                return {
                    ...state,
                    cart:newCart,
                }
            }
        }
        default :
            return state;
    }

};