import api from "../../api/api.js";

export const fetchCategory = () => async  (dispatch) => {
    try{
        dispatch({type : "Is_Fetching"});
        const {data} = await api.get(`/public/categories`);
        // console.log(data);

        dispatch(
            {
            type : "Fetch_Categories",
            payload : {
                categories: data.content,
                pageNumber : data.pageNumber,
                totalPages : data.totalPages,
                totalItems : data.totalItems,
                pageSize : data.pageSize,
                lastPage : data.lastPage,
            }

            },
        );

        dispatch({type : "Is_Success"});
    }catch (error){
        dispatch({
            type:"Is_Error",
            payload : error?.response?.data?.message || "Failed To Fetch Categories",
        });
        console.log(error);
    }
};