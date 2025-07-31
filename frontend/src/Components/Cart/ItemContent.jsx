import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQty, increaseCartQty, removeFromCart } from "../../store/action/cartAction";
import toast from "react-hot-toast";

const ItemContent = ({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        maxQty,
}) => {
    
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItems) => {
        dispatch(increaseCartQty(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    };

    const handleQtyDecrease = (cartItems) => {
        dispatch(decreaseCartQty(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    }

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };

    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-200 rounded-md lg:px-4 py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
                    <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
                    {productName}
                    </h3>
                </div>

                <div className="md:w-36 sm:w-24 w-12">
                    <img src={image} alt={productName}
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md" />

                <div className="flex items-start gap-5 mt-3 ">
                        <button className="cursor-pointer flex items-center font-semibold
                     space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600
                     rounded-md hover:bg-rose-50 transition-colors duration-300"
                            onClick={() => {
                                removeItemFromCart({
                                    productId,
                                    productName,
                                    image,
                                    description,
                                    quantity,
                                    price,
                                    discount,
                                    specialPrice,
                                    maxQty,
                                })
                            }}>
                        <FaRegTrashAlt size={18} className="mr-1" />Remove</button>
                         </div>
                </div>
            </div>

            <div className="flex justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
               ₹{Number(specialPrice)}
            </div>

            <div className="flex justify-self-center">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCouter={true}
                    handleQtyIncrease={() => {
                        handleQtyIncrease({
                            productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                            maxQty,
                        })}}
                    handleQtyDecrease={() => {
                        handleQtyDecrease({
                            productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                            maxQty,
                        
                        })
                    }}
                    removeItemFromCart={() => {
                        removeItemFromCart({
                            productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                            maxQty,
                        })
                    }}
                />
            </div>

            <div className="flex justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
               ₹{Number(specialPrice)*Number(currentQuantity)}
            </div>


        </div>
    )
};

export default ItemContent;