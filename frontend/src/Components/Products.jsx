import ProductCard from "./ProductCard.jsx";
import {FaExclamationTriangle} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../store/action/action.js";

const Products = () => {
    const isLoading = false;
    const errorMessage = "";

    const {products} = useSelector(
        state => state.products
    );

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    // console.log(products);




    return(
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {
                isLoading ?
                    <div>
                        Its loading...
                    </div>
                    : errorMessage ?
                        <div className="flex items-center justify-center h-[200px] ">
                            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                            <span className="text-slate-800 text-lg font-medium">
                                {errorMessage}
                            </span>
                        </div>
                    :<div className="min-h-[700px]">
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {
                                products ?
                                    products.map((item,i)=>(
                                        <ProductCard key={i} {...item}/>
                                    ))
                                    :
                                    <div>
                                    No Products Available
                                    </div>
                            }
                        </div>

                        </div>
            }
        </div>
    )
}

export default Products;