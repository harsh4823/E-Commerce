import api from "../../api/api.js";

export const fetchCategory = () => async  (dispatch) => {
    try{
        const {data} = await api.get(`/public/categories`);
        console.log(data);

        dispatch(
            {
            type : "Fetch_Categories",
            payload : data.content,
            },
        )
    }catch (error){
        console.log(error);
    }
};