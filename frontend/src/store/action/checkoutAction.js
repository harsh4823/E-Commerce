import api from './../../api/api';

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) =>
    async(dispatch) => {
        // const { user } = getState().auth;
        dispatch({
            type: "Button_Loader",
        });
        try {
            dispatch({ type: "Is_Fetching" });

            if (addressId) {
                const { data } = await api.put(`/addresses/${addressId}`,sendData);

                dispatch(
                    {
                        type : "Update_User_Addresses",
                        payload: {
                            addressId: addressId,
                            address : data,
                        },
                    },
                );
                toast.success("Address Updated Successfully");
            } else {
                
                const { data } = await api.post(`/addresses`,sendData);
                
                dispatch(
                    {
                        type : "Add_User_Addresses",
                        payload :data,
                    },
                );
                toast.success("Address Saved Successfully");
            }
            
            dispatch({
                type : "Is_Success",
            })
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

export const selectedCheckoutAddress = (address) => {
    return {
        type: "Select_Checkout_Address",
        payload : address,
    }
}

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
        dispatch({ type: "Button_Loader" });
        
        await api.delete(`/addresses/${addressId}`);

        dispatch({
            type: "Delete_User_Address",
            payload: addressId,
        });
        dispatch({type : "Is_Success"})
        toast.success("Address Deleted Successfully");
    } catch (error) {
        dispatch({
            type:"Is_Error",
            payload : error?.response?.data?.message || "Failed To Delete Address",
        });
        console.log(error);
    } finally {
        setOpenDeleteModal(false);
    }
}