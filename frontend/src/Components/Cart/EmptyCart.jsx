import { MdArrowBack, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="min-h-[600px] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <MdOutlineShoppingCart size={80} className="mb-4 text-slate-500"/>
                <div className="text-3xl font-bold text-slate-700">
                    Your Cart is Empty
                </div>
                <div className="text-lg mt-2 text-slate-500">
                    Add Some Products to get Started
                </div>
                <div className="mt-6">
                    <Link to={'/products'} className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition duration-300">
                    <MdArrowBack size={24}/>
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EmptyCart;