import {useState} from "react";
import {FaShoppingCart} from "react-icons/fa";

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
    }
) => {

    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity > 0;

    const handleProductView = (product) => {
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    };

    return(
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
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
                <img src={image} alt={productName}  className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"/>
            </div>
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
                    className="text-lg font-semibold mb-2 cursor-pointer">{productName}</h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>

                <div className={'flex items-center justify-between'}>
                {specialPrice?
                    (
                        <div className="flex flex-col">
                            <span className={'text-gray-400 line-through'}>
                                ${Number(price).toFixed(2)}
                            </span>

                            <span className={'text-slate-700 text-xl font-bold'}>
                                ${Number(specialPrice).toFixed(2)}
                            </span>

                        </div>

                    ):
                    (
                        <div className={'flex flex-col'}>
                            {" "}
                            <span className={'text-slate-700 text-xl font-bold'}>
                                ${Number(price).toFixed(2)}
                            </span>
                        </div>
                    )
                }

                <button
                    disabled={!isAvailable || btnLoader}
                    className={`
                ${isAvailable ? "opacity-100 hover:bg-blue-600 cursor-pointer" :"opacity-70"}
                bg-blue-500 text-white py-2 px-3 rounded-lg transition-colors duration-300 items-center w-36 flex justify-center
                `}>
                    <FaShoppingCart className="mr-2"/>
                {isAvailable ?
                    (
                            "Add To Cart"

                    ):
                    (
                            "Stock Out"
                    )}
                </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;