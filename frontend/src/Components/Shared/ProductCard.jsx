import {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import ProductViewModal from "./ProductViewModal.jsx";
import {TruncateText} from "../../Utils/TruncateText.js";
import { addToCart } from "../../store/action/cartAction.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utils/formatPrice.js";

const ProductCard = (
    {
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        about = false,
    }
) => {
    
    const maxQty = Number(quantity);
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about){
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems,1,toast));
    }

    const { cart } = useSelector((state) => state.carts);

    const goToCart = cart.find(
        (item) => item.productId === productId
    );


    return(
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">

            {/*image section*/}
            <div onClick={()=>{
                handleProductView({
                    id:productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }}
                 className="w-full overflow-hidden aspect-[3/2]">
                <img src={image} alt={productName}  className={`w-full h-full ${!about?'cursor-pointer':'cursor-default'} transition-transform duration-300 transform hover:scale-105`}/>
            </div>

            {/*product details section*/}
            <div className="p-4">

                <h2 onClick={()=>{
                    handleProductView({
                        id:productId,
                        productName,
                        image,
                        description,
                        quantity,
                        price,
                        discount,
                        specialPrice,
                    })
                }}
                    className={`text-lg font-semibold mb-2 ${!about?'cursor-pointer':'cursor-default'}`}>{TruncateText(productName,30)}</h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{TruncateText(description)}</p>
                </div>
                    {!about &&(
                <div className={'flex items-center justify-between'}>
                        {specialPrice?
                                (
                                    <div className="flex flex-col">
                            <span className={'text-gray-400 line-through'}>
                                 {formatPrice(Number(price).toFixed(2))}
                            </span>

                                        <span className={'text-slate-700 text-xl font-bold'}>
                                {formatPrice(Number(specialPrice).toFixed(2))}
                            </span>
                                    </div>
                                ):
                                (
                                    <div className={'flex flex-col'}>
                                        {" "}
                                        <span className={'text-slate-700 text-xl font-bold'}>
                                 {formatPrice(Number(price).toFixed(2))}
                            </span>
                                    </div>
                                )
                        }
                        {/*add to cart button*/}

                        {goToCart ?
                            (
                                <Link
                                     className={`${isAvailable ? "opacity-100 hover:bg-blue-800 cursor-pointer" :"opacity-70"}
                            bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-300 items-center w-36 flex justify-center`}
                                    to={'/cart'}>
                                    <FaShoppingCart className="mr-2"/> Go To Cart
                                </Link>
                            ): (
                                    
                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={()=>addToCartHandler({
                                productId,
                                productName,
                                image,
                                description,
                                quantity,
                                price,
                                discount,
                                specialPrice,
                                maxQty,
                            })}
                            
                            className={`${isAvailable ? "opacity-100 hover:bg-blue-600 cursor-pointer" :"opacity-70"}
                            bg-blue-500 text-white py-2 px-3 rounded-lg transition-colors duration-300 items-center w-36 flex justify-center`}>
                            <FaShoppingCart className="mr-2"/>
                            {isAvailable ?
                                (
                                    "Add To Cart"
                                ):
                                (
                                    "Stock Out"
                                )}
                        </button>
                        )}
                            
                </div>
                    )}
            </div>
            <ProductViewModal
            open={openProductViewModal}
            setOpen={setOpenProductViewModal}
            product={selectedViewProduct}
            isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;