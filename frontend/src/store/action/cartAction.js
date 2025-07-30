export const addToCart = (data,qty=1,toast) =>
     (dispatch,getState) => {
        // Find Product 
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        
        // console.log(getProduct);

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
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
        }else{
            // error
            toast.error('Out Of Stock');
        }
}