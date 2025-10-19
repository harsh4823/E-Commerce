import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import { fetchOrders } from "c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/store/action/adminAction";

const useOrderFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        const URLParams = new URLSearchParams(searchParams);

        const currentPage = searchParams.get('page')
            ? Number(searchParams.get('page')):1;
        URLParams.set('pageNumber', currentPage-1);
       

        const queryString = URLParams.toString();
        // console.log(queryString);

        dispatch(fetchOrders(queryString));

    },[searchParams,dispatch]);
}

export default useOrderFilter;