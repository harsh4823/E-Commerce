import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { fetchOrders } from "../store/action/adminAction";

const useOrderFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    useEffect(()=>{
        const URLParams = new URLSearchParams(searchParams);

        const currentPage = searchParams.get('page')
            ? Number(searchParams.get('page')):1;
        URLParams.set('pageNumber', currentPage-1);
       

        const queryString = URLParams.toString();
        // console.log(queryString);

        dispatch(fetchOrders(queryString,isAdmin));

    },[searchParams,dispatch]);
}

export default useOrderFilter;