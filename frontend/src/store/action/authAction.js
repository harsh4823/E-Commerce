import api from "../../api/api.js";

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