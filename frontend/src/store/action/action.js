import api from "../../api/api.js";

export const fetchProducts = () => async (dispatch) => {
    try{
        const {data} = await api.get(`/public/products`);
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
    }catch (error){
        console.log(error);
    }
};