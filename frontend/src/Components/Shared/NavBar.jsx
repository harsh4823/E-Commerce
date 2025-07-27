import {Link, useLocation} from "react-router-dom";
import {FaStore} from "react-icons/fa6";
import {FaSignInAlt} from "react-icons/fa";
import {Badge} from "@mui/material";
import {MdOutlineShoppingCart} from "react-icons/md";
import {useState} from "react";
import {RxCross2} from "react-icons/rx";
import {IoIosMenu} from "react-icons/io";

const NavBar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    return(
        <div className={'h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0'}>
            <div className={'lg:px-14 sm:px-8 px-4 w-full flex justify-between'}>
                <Link
                    className={'flex items-center text-2xl font-bold'}
                    to={"/"}>
                        <FaStore className={'mr-2 text-3xl'}/>
                    <span className={'font-[Poppins]'}>E-Shop</span>
                </Link>

                <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md 
                ${navbarOpen?'h-fit sm:pb-0 pb-5':'h-0 overflow-hidden'}
                    transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>
                    {/*Home*/}
                    <li className={'font-[500] transition-all duration-150 pt-3'}>
                        <Link
                            className={`${
                                path === '/' ? 'text-white font-bold':'text-gray-200'
                            }`}
                            to={"/"}>Home</Link>
                    </li>
                    {/*Products*/}
                    <li className={'font-[500] transition-all duration-150 pt-3'}>
                        <Link
                            className={`${
                                path === '/products' ? 'text-white font-bold':'text-gray-200'
                            }`}
                            to={"/products"}>Products</Link>
                    </li>
                    {/*About*/}
                    <li className={'font-[500] transition-all duration-150 pt-3'}>
                        <Link
                            className={`${
                                path === '/about' ? 'text-white font-bold':'text-gray-200'
                            }`}
                            to={"/about"}>About</Link>
                    </li>
                    {/*Contact*/}
                    <li className={'font-[500] transition-all duration-150 pt-3'}>
                        <Link
                            className={`${
                                path === '/contact' ? 'text-white font-bold':'text-gray-200'
                            }`}
                            to={"/contact"}>Contact</Link>
                    </li>
                    {/*Cart*/}
                    <li className={'font-[500] transition-all duration-150'}>
                        <Link
                            className={`${
                                path === '/cart' ? 'text-white font-bold':'text-gray-200'
                            }`}
                            to={"/cart"}>
                            <Badge
                            showZero={true}
                            badgeContent={0}
                            color={'primary'}
                            overlap={'circular'}
                            anchorOrigin={{
                                vertical:'top',
                                horizontal:'right'
                            }}
                            >
                            <MdOutlineShoppingCart size={30} className={'mt-1'}/>
                            </Badge>
                        </Link>
                    </li>
                    {/*Login*/}
                    <li className={'font-[500] transition-all duration-150'}>
                        <Link
                            className='flex items-center space-x-2 px-4 py-[6px] mt-2
                             bg-gradient-to-r from-purple-600 to-red-500 text-white
                             font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400
                             transition duration-300 ease-in-out transform'
                            to={"/login"}>
                            <FaSignInAlt/>
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>
                <button
                onClick={()=> setNavbarOpen(!navbarOpen)}
                className={'sm:hidden flex items-center sm:mt-0 mt-2'}
                >
                    {navbarOpen?(
                        <RxCross2 className={'text-white text-3xl'}/>
                    ):(
                        <IoIosMenu className={'text-white text-3xl'}/>
                        )}
                </button>
            </div>
        </div>
    )
}

export default NavBar;