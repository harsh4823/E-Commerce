import Loader from "./Shared/Loader.jsx";
import {FaExclamationTriangle} from "react-icons/fa";
import ProductCard from "./Shared/ProductCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../store/action/productAction.js";

const About = () => {
    const dispatch = useDispatch();

    const {products} = useSelector((state)=>state.products);
    const {isLoading,errorMessage} = useSelector((state)=>state.errors);

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    return(
        <div className={'max-w-7xl mx-auto px-4 py-8'}>
            <h1 className={'text-slate-800 text-4xl font-bold text-center mb-12'}>
            About Us Page
            </h1>
            <div className={'flex flex-col lg:flex-row justify-between items-center mb-12'}>
                <div className={'w-full md:w-1/2 text-center md:text-left'}>
                    <p className={'text-lg mb-4'}>
                        Welcome to our e-commerce website! We are dedicated to providing you with the best online shopping experience. Our mission is to offer a wide range of high-quality products at competitive prices, ensuring that you find exactly what you need. Whether you're looking for the latest fashion trends, electronics, home goods, or unique gifts, we have something for everyone.
                        Our user-friendly interface and secure payment options make shopping easy and convenient.
                        Thank you for choosing us for your online shopping needs!
                    </p>
                </div>
                <div className={'w-full md:w-1/2 mb-6 md:mb-0 ml-7'}>
                <img src={'https://placehold.co/600x400'} alt={'About Us'} className={'w-full h-auto rounded-lg transform transition-transform duration-300 hover:scale-105'}/>
                </div>
            </div>
            <div className={'py-7 space-y-8'}>
                <h1 className={'text-slate-800 text-4xl font-bold text-center mb-12'}>Our Products</h1>
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                    {products?products.slice(0,3)
                        .map((item,i)=>(
                        <ProductCard key={i}
                        image={item.image}
                        productName={item.productName}
                        description={item.description}
                        quantity={item.quantity}
                        price={item.price}
                        discount={item.discount}
                        specialPrice={item.specialPrice}
                        productId={item.productId}
                        about={true}
                        />
                    )):(
                        <div>
                            No Products Available
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default About;