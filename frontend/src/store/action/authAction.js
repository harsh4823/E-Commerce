import api from "../../api/api.js";
import { store } from './../store';

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post(`/auth/sign-in`,sendData);
        dispatch(
            {
                type: "Login_User",
                payload: data,
            }
        );
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login Success");
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        
    } finally {
        setLoader(false);
    }

}
export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post(`/auth/sign-up`,sendData);
        dispatch(
            {
                type: "Login_User",
                payload: data,
            }
        );
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success(data?.mesaage || "User Registerd Successfully");
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        
    } finally {
        setLoader(false);
    }

}

export const logOutUser = (navigate,dispatch) => {
    dispatch(
        {
            type: "Log_Out"
        }
    );
    localStorage.removeItem("auth");
    navigate("/login");
}

export const logOutUserPlain = () => {
    store.dispatch(
        {
            type: "Log_Out"
        }
    );
    localStorage.removeItem("auth");
    window.location.href = "/login";
}

export const deleteUser = (toast, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        await api.delete(`auth/delete-account`);
        dispatch(
            {
                type: "Delete_User"
            }
        );
        localStorage.removeItem("auth");
        toast.success("Account Deleted Successfully");
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
    } finally {
        setLoader(false);
    }
}

export const createUserCart = (sendCartItem) => async (dispatch) => {
    try {
        dispatch({ type: "Is_Fetching" });
        await api.post(`carts/create`, sendCartItem);
        dispatch(fetchUserCart());
    } catch (error) {
        dispatch({
            type: "Is_Error",
            payload: error?.response?.data?.message || "Failed to Create Cart Items",
        });
    }
} 
export const fetchUserCart = () => async (dispatch,getState) => {
    try {
        dispatch({ type: "Is_Fetching" });
        const { data } = await api.get(`carts/user/cart`);
        console.log(data);
        
        
        dispatch({
            type: "Get_User_Cart_Products",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId,
        });
        
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "Is_Success" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "Is_Error",
            payload: error?.response?.data?.message || "Failed to Fetch Cart Items",
        });
        
    }
} 