import { fetchCategory } from "./categoryAction";
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

export const fetchAdminProducts = (queryString) => async (dispatch) => {
try{

    dispatch({type : "Is_Fetching"});

    const {data} = await api.get(`/admin/products?${queryString}`);
    // console.log(data);
    dispatch(
        {
            type : "Fetch_Products",
            payload : {
                products : data.content,
                pageNumber : data.pageNumber,
                totalPages : data.totalPages,
                totalItems : data.totalItems,
                pageSize : data.pageSize,
                lastPage : data.lastPage,
                isFallback : data.fallback,
            },
        }
    )

    dispatch({type : "Is_Success"});

}catch (error){
    console.log(error);

    dispatch({
        type:"Is_Error",
        payload : error?.response?.data?.message || "Failed To Fetch Products",
    })
}
};

export const updateProduct = (sendData, toast,reset,setLoader,setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.put(`/admin/products/${sendData.id}`,sendData);
        toast.success("Product Update Successfull");
        reset();
        setLoader(false);
        setOpen(false);
        await dispatch(fetchAdminProducts());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to Update")
    }
};

export const deleteProduct = (setLoader,productId,toast,setDeleteOpenModal) => async (dispatch) => {
    try {
        setLoader(true);
        await api.delete(`/admin/products/${productId}`);
        toast.success("Product Deleted Successfully");
        await dispatch(fetchAdminProducts());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed To Delete Product");
        console.log(error);
    } finally {
        setLoader(false);
        setDeleteOpenModal(false);
    }
}

export const uploadProductImage = (productId, formData, toast, setLoader, setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.put(`/admin/products/${productId}/image`, formData);
        toast.success("Image uploaded successfully");
        await dispatch(fetchAdminProducts());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed To Upload Product Image");
        console.log(error);
    } finally {
        setLoader(false);
        setOpen(false);
    }
};

export const addNewProduct = (sendData,toast,reset,setLoader,setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.post(`/admin/categories/${sendData.categoryId}/product`, sendData);
        toast.success("Product added Successfully");
        reset();
        await dispatch(fetchAdminProducts());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed To Add New Product");
        console.log(error);
    } finally {
        setLoader(false);
        setOpen(false);
    }
};

export const addNewCategory = (sendData,toast,reset,setLoader,setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.post(`/admin/categories`, sendData);
        toast.success("Category added Successfully");
        reset();
        await dispatch(fetchCategory());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed To Add New Category");
        console.log(error);
    } finally {
        setLoader(false);
        setOpen(false);
    }
};
export const updateCategory = (sendData,toast,reset,setLoader,setOpen) => async (dispatch) => {
    try {
        setLoader(true);
        await api.put(`/admin/categories/${sendData.categoryId}`, sendData);
        toast.success("Category Updated Successfully");
        reset();
        await dispatch(fetchCategory());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed To Update Category");
        console.log(error);
    } finally {
        setLoader(false);
        setOpen(false);
    }
};

export const deleteCategory = (setLoader, categoryId, toast, setDeleteOpenModal) => async (dispatch) => {
    try {
        setLoader(true);
        await api.delete(`/admin/categories/${categoryId}`);
        toast.success("Category Deleted Successfully");
        await dispatch(fetchCategory());
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed To Delete Category");
        console.log(error);
    } finally {
        setLoader(false);
        setDeleteOpenModal(false);
    }
};

export const fetchSellers = () => async (dispatch) => {
try{

    dispatch({type : "Is_Fetching"});

    const {data} = await api.get(`/auth/sellers`);
    // console.log(data);
    dispatch(
        {
            type : "Fetch_Sellers",
            payload : {
                sellers : data.content,
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
        payload : error?.response?.data?.message || "Failed To Fetch Products",
    })
}
};

