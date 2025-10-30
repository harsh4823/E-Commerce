import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdLogin } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {AiOutlineLogin} from "react-icons/ai"
import InputField from "../Shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { authenticateSignInUser } from "../../store/action/authAction";
import toast from "react-hot-toast";
import { SpinnerCircularFixed } from "spinners-react";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit,reset, formState: { errors } } = useForm({ mode: "onTouched" });
    const { user } = useSelector(state => state.auth);

    const loginHandler = async (data) => {
        console.log("Login Clicked");
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    }

    const from = location.state?.from?.pathname || '/';

     useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    return (
        <div className="min-h-[calc(90vh-64px)] flex justify-center items-center">
            <form onSubmit={handleSubmit(loginHandler)}
            className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded">
                <div className="flex flex-col justify-center items-center space-y-4">
                    <AiOutlineLogin className="text-slate-800 text-5xl"/>
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Login Here
                    </h1>
                </div>
                <hr className="mt-2 mr-5 text-black"/>
                <div className="flex flex-col gap-3">
                    <InputField
                        label="Email"
                        required
                        id="email"
                        type="Email"
                        register={register}
                        errors={errors}
                        message="*Email is required"
                        placeholder="Enter Your Email"
                    />
                    <InputField
                        label="Password" 
                        required
                        id="password"
                        type="password"
                        register={register}
                        errors={errors}
                        message="*Password is required"
                        placeholder="Enter Your PassWord"
                    />
                </div>
                <button className={`bg-button-gradient flex gap-2 items-center justify-center 
                font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors
                duration-100  rounded-sm my-3 ${loader?'cursor-default':'cursor-pointer'}`} disabled={loader} type="submit">
                    {loader ?
                        <div className="flex gap-4">
                            <SpinnerCircularFixed size={20} thickness={100} speed={100} color="white" secondaryColor="rgba(0, 0, 0, 0.44)">
                            </SpinnerCircularFixed>
                            Loading...
                        </div>
                         :
                    <>Login</>}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6">
                    Dont't have a account?
                    <Link className="font-semibold underline hover:text-black" to={'/register'}>
                        <span className="pl-2">SignUp</span>
                    </Link>
                </p>
            </form>
        </div>
    )

};

export default Login;