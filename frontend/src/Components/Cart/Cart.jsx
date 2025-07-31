import {MdArrowBack, MdOutlineShoppingCart} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";

const Cart = () => {

    const { cart } = useSelector(
        (state) => state.carts
    );
    
    if (!cart || cart.length === 0) {
        return (
            <h1>Cart Is Empty</h1>
        )
    }

    const newCart = { ...cart };
    newCart.totalPrice = cart?.reduce(
        (acc, curr) => acc * Number(curr?.specialPrice) * Number(curr?.quantity)
    );


    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <MdOutlineShoppingCart size={36}/>
                    Your Cart
                </h1>
                <p className="text-lg text-gray-600 mt-2">All Your Selected Items</p>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
                <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">Product</div>
                <div className="justify-self-center text-lg text-slate-800">Price</div>
                <div className="justify-self-center text-lg text-slate-800">Quantity</div>
                <div className="justify-self-center text-lg text-slate-800">Total</div>
            </div>

            <div>
                {cart && cart.length > 0 &&
                    cart.map((item, i) => (
                        <ItemContent key={i} {...item} />
                    ))}
            </div>

            <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 
            flex-col sm:justify-between gap-4">
                   <div></div> 
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>SubTotal</span>
                        <span>$400</span>
                    </div>
                    <p className="text-slate-500">Taxes and Shipping Calculated at Checkout</p>

                    {/* Checkout Button */}
                    <Link to={'/checkout'}
                    className="w-full flex justify-end"
                    >
                        <button className="font-semibold w-[300px] py-2 px-4 rounded-sm
                         bg-custom-blue text-white flex items-center justify-center gap-2 cursor-pointer
                         hover:text-gray-200 transition duration-500">
                            <MdOutlineShoppingCart size={20}/>
                            CheckOut
                        </button>
                    </Link>

                    <Link to={'/products'}
                    className="flex items-center mt-2 gap-2 text-slate-500"
                    >
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Cart;