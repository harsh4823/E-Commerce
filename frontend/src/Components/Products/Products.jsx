import ProductCard from "../Shared/ProductCard.jsx";
import {FaExclamationTriangle} from "react-icons/fa";
import {useSelector} from "react-redux";
import Filter from "./Filter.jsx";
import useProductFilter from "../../Hooks/useProductFilter.js";
import Loader from "../Shared/Loader.jsx";
import Paginations from "/src/Components/Shared/Paginations.jsx";

const Products = () => {
    const {isLoading,errorMessage} = useSelector(
        state => state.errors
    )

    const {products,isFallback,pagination} = useSelector(
        state => state.products
    );

    // const dispatch = useDispatch();
    useProductFilter();
    //
    // useEffect(()=>{
    //     dispatch(fetchProducts());
    // },[dispatch]);

    // console.log(products);

    return(
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <Filter/>
            {
                isLoading ?
                    <Loader text={"Loading Products..."}/>
                    : errorMessage ?
                        <div className="flex items-center justify-center h-[200px] ">
                            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                            <span className="text-slate-800 text-lg font-medium">
                                {errorMessage}
                            </span>
                        </div>
                    :
                        <div className="min-h-[700px]">
                            {isFallback && (
                                <div className={'pt-10 font-semibold text-slate-800 text-3xl'}>
                                    No products found for your search. Showing all products instead.
                                </div>
                            )}

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
                            <Paginations
                            numberOfPages={pagination?. totalPages}
                            />
                        </div>
            }
        </div>
    )
}

export default Products;