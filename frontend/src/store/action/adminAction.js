import api from "c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/api/api"

export const fetchAnalyticsData = () => async (dispatch) => {
    try {
        const { data } = await api.get("/admin/app/analytics");
        dispatch({
            type: "Fetch_Analytics_Data",
            payload: data,
        });
        
    } catch (error) {
        console.error(error);
    }
}

export const fetchOrders = (queryString) => async (dispatch) => {
    try{

        dispatch({type : "Is_Fetching"});

        const {data} = await api.get(`/admin/orders?${queryString}`);
        // console.log(data);
        dispatch(
            {
                type : "Fetch_Orders",
                payload : {
                    orders : data.orders,
                    pageNumber : data.pageNumber,
                    totalPages : data.totalPages,
                    totalItems : data.totalItems,
                    pageSize : data.pageSize,
                    lastPage : data.lastPage,
                },
            }
        )

        dispatch({type : "Is_Success"});

    }catch (error){
        console.log(error);

        dispatch({
            type:"Is_Error",
            payload : error?.response?.data?.message || "Failed To Fetch Orders",
        })
    }
};

export const updateOrderStatusFromDashboard = (toast, orderId, orderStatus,setLoader) =>
    async(dispatch) => {
        try {
            setLoader(true);
                const { data } = await api.put(`/admin/orders/${orderId}/status`,{status : orderStatus});
            toast.success(data.message || "Order Status Updated Successfully");
            await dispatch(fetchOrders());
            } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error"); 
        } finally {
            setLoader(false);
        }
    };
