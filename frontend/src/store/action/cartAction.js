export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        // Find Product 
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        
        // console.log(getProduct);
        
        // Check for Stocks
        const isQuantityExists = getProduct.quantity >= qty;
        
        // If in Stock -> add
        if (isQuantityExists) {
            dispatch(
                {
                    type: "Add_To_Cart",
                    payload: {
                        ...data,
                        quantity: qty,
                    }
                }
            );
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            // error
            toast.error('Out Of Stock');
        }
    };

export const increaseCartQty = (data, toast, currentQty, setCurrentQty) =>
    (dispatch, getState) => {

        console.log(data);
        
        const isQuantityExists = data.maxQty >= currentQty + 1;

        if (isQuantityExists) {
            const newQty = currentQty + 1;
            setCurrentQty(newQty);

            dispatch({
                type: "Add_To_Cart",
                payload: {
                    ...data,
                    quantity:newQty,
                }
            })  
            toast.success(`Quantiy has been increased to ${newQty}`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity reached its limit");
        }
    };
   
export const decreaseCartQty = (data, toast, currentQty, setCurrentQty) =>
    (dispatch, getState) => {
        const isQuantityExists = currentQty > 1;

        if (isQuantityExists) {
            const newQty = currentQty - 1;
            setCurrentQty(newQty);

            dispatch({
                type: "Add_To_Cart",
                payload: {
                    ...data,
                    quantity: newQty,
                }
            })
            toast.success(`Quantiy has been decreased to ${newQty}`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Remove the product from cart");
        }
    };

export const removeFromCart = (data,toast) =>
    (dispatch,getState) => {
        dispatch({
            type: "Remove_From_Cart",
            payload: data,
        });

        toast.success(`${data.productName} has been removed from cart`)
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

    };

