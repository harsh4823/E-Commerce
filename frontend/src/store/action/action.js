import api from "../../api/api.js";

export const fetchProducts = (queryString) => async (dispatch) => {
    try{

        dispatch({type : "Is_Fetching"});

        const {data} = await api.get(`/public/products?${queryString}`);
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
