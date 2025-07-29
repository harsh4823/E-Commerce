export const addToCart = (data,qty=1) =>
     (dispatch,getState) => {
        // Find Product 
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        
        console.log(getProduct);

        // Check for Stocks
        const isQuantityExists = getProduct.quantity >= qty;

        // If in Stock -> add
        if(isQuantityExists){
            dispatch(
                {
                    type : "Add_To_Cart",
                    payload : {
                        ...data,
                        quantity:qty,
                    }
                }
            );
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
        }else{
            // error
        }
}