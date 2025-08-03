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
        toast.error(error?.response?.data?.mesaage || "Internal Server Error");
        
    } finally {
        setLoader(false);
    }

}