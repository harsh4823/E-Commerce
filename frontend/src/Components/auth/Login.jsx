import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {AiOutlineLogin} from "react-icons/ai"
import InputField from "../Shared/InputField";

const Login = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched" });

    const loginHandler = async (data) => {
        console.log("Login Clicked");
    }

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
                <div>
                    <InputField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        register={register}
                        errors={errors}
                        message="*Username is required"
                        placeholder="Enter Your Username"
                    />
                </div>
            </form>
        </div>
    )

};

export default Login;