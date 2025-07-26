import Slider from "./Slider.jsx";
import ProductCard from "../Shared/ProductCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../../store/action/productAction.js";
import Loader from "../Shared/Loader.jsx";
import {FaExclamationTriangle} from "react-icons/fa";

const Home = () => {

    const dispatch = useDispatch();

    const {products} = useSelector((state)=>state.products);
    const {isLoading,errorMessage} = useSelector((state)=>state.errors);

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    return(
        <div className={'lg:px-14 sm:px-8 px-4'}>
            <div className={'py-6'}>
            <Slider/>
            </div>

            <div className={'py-5'}>
                <div className={'flex flex-col justify-center items-center space-y-2'}>
                   <h1 className={'text-4xl font-bold text-slate-800'}>Products</h1>
                       <span className={'text-slate-700'}>Discover our handpicked selection of top rated products .</span>
                </div>

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
                        :(
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                {
                    products ?
                        products.slice(0,8)
                            .map((item,i)=>(
                            <ProductCard key={i} {...item}/>
                        ))
                        :
                        <div>
                            No Products Available
                        </div>
                }
            </div>
                    )
            }
        </div>
            </div>
    )
}

export default Home;
