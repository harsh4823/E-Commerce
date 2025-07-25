import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../store/action/productAction.js";

const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        const URLParams = new URLSearchParams(searchParams);

        const currentPage = searchParams.get('page')
            ? Number(searchParams.get('page')):1;
        const category = searchParams.get('category') || null;
        const sortOrder = searchParams.get('sortBy') || 'asc';
        const keyword = searchParams.get('keyword') || null;

        URLParams.set('pageNumber', currentPage-1);
        URLParams.set('sortBy','price');
        URLParams.set('sortOrder',sortOrder);

        if (category){
            URLParams.set('category',category);
        }
        if (keyword){
            URLParams.set('keyword',keyword);
        }

        const queryString = URLParams.toString();
        console.log(queryString);

        dispatch(fetchProducts(queryString));

    },[searchParams,dispatch]);
}

export default useProductFilter;