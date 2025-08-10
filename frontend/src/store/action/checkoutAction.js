import api from './../../api/api';

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) =>
    async(dispatch, getState) => {
        // const { user } = getState().auth;
        dispatch({
            type: "Button_Loader",
        });
        try {
             const user = JSON.parse(localStorage.getItem("auth"));
            const token = user?.jwtToken;

            if (!token) {
                toast.error("Please login again.");
                return;
            }

            const { data } = await api.post(`/addresses`,sendData, {
            headers: {
                Authorization : `Bearer ${token}`
            }
            });
            
            dispatch({
                type : "Is_Success",
            })
            toast.success("Address Saved Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
            dispatch({
                type: "Is_Error",
                payload : null,
            })   
        } finally {
            setOpenAddressModal(false);
        }
    };

export const fetchUserAddresses = () => async  (dispatch) => {
    try{
        dispatch({ type: "Is_Fetching" });
        
        const {data} = await api.get(`/user/addresses`);
        // console.log(data);

        dispatch(
            {
            type : "User_Addresses",
            payload :data,
            },
        );

        dispatch({type : "Is_Success"});
    }catch (error){
        dispatch({
            type:"Is_Error",
            payload : error?.response?.data?.message || "Failed To Fetch User Address",
        });
        console.log(error);
    }
};