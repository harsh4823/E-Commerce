import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {AiOutlineLogin} from "react-icons/ai"
import InputField from "../Shared/InputField";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/action/authAction";
import toast from "react-hot-toast";
import { FaUserPlus } from 'react-icons/fa';
import { SpinnerCircularFixed } from 'spinners-react';

export const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onTouched" });

    const registerHandler = async (data) => {
        console.log("Register Clicked");
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    }

    return (
        <div className="min-h-[calc(90vh-64px)] flex justify-center items-center">
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded">
                <div className="flex flex-col justify-center items-center space-y-4">
                    <FaUserPlus className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Register Here
                    </h1>
                </div>
                <hr className="mt-2 mr-5 text-black" />
                <div className="flex flex-col gap-3">
                    {/* UserName */}
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
                    {/* Email */}
                    <InputField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        register={register}
                        errors={errors}
                        message="*Email is required"
                        placeholder="Enter Your Email"
                    />
                    {/* Password */}
                    <InputField
                        label="Password"
                        required
                        id="password"
                        min={6}
                        type="password"
                        register={register}
                        errors={errors}
                        message="*PassWord is required"
                        placeholder="Enter Your PassWord"
                    />
                </div>
                <button className={`bg-button-gradient flex gap-2 items-center justify-center 
                font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors
                duration-100  rounded-sm my-3 ${loader ? 'cursor-default' : 'cursor-pointer'}`} disabled={loader} type="submit">
                    {loader ?
                    <div className="flex gap-4">
                        <SpinnerCircularFixed size={20} thickness={100} speed={100} color="white" secondaryColor="rgba(0, 0, 0, 0.44)">
                        </SpinnerCircularFixed>
                        Loading...
                    </div> :
                        <>Regiter</>}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6">
                    Already have a account?
                    <Link className="font-semibold underline hover:text-black" to={'/login'}>
                        <span className="pl-2">LogIn</span>
                    </Link>
                </p>
            </form>
        </div>
    )
};

export default Register;
