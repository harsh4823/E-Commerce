import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './../../Shared/InputField';
import { Button } from '@mui/material';
import { FaSpinner, FaCloudUploadAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, updateProduct } from './../../../store/action/adminAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SelectTextField from './../../Shared/SelectTextField';
import { fetchCategory } from './../../../store/action/categoryAction';
import Skeleton from './../../Shared/Skeleton';
import ErrorPage from './../../Shared/ErrorPage';

const AddProductForm = ({ setOpen, product, update = false }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: 'onTouched' });
    const [loader, setLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    
    // Image Upload State
    const fileInputRef = useRef();
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories } = useSelector(state => state.categories);
    const { isLoading, errorMessage } = useSelector(state => state.errors);

    useEffect(() => {
        if (!update) {
            dispatch(fetchCategory());
        }
    }, [dispatch, update]);

    useEffect(() => {
        if (!isLoading && categories) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, isLoading]);

    useEffect(() => {
        if (update && product) {
            setValue("productName", product?.productName);
            setValue("price", String(product?.price).slice(1));
            setValue("quantity", product?.quantity);
            setValue("discount", String(product?.discount).slice(0, -1));
            setValue("specialPrice", String(product?.specialPrice).slice(1));
            setValue("description", product?.description);
        }
    }, [update, product, setValue]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            toast.error("Please Select a Valid Image File (.jpeg, .jpg, .png)");
            setPreview(null);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    };

    const handleClearImage = () => {
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const saveProductHandler = (data) => {
        if (!update && !selectedFile) {
            toast.error("Please upload a product image.");
            return;
        }

        // Construct FormData to handle both @ModelAttribute text fields and @RequestParam file
        const formData = new FormData();
        formData.append("productName", data.productName);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("discount", data.discount);
        formData.append("specialPrice", data.specialPrice);
        formData.append("description", data.description);
        
        if (selectedFile) {
            formData.append("imageFile", selectedFile);
        }

        if (!update) {
            // Dispatching categoryId separately to map to your backend @PathVariable
            dispatch(addNewProduct(selectedCategory.categoryId, formData, toast, reset, setLoader, setOpen));
            navigate("/admin/products");
        } else {
            formData.append("id", product.id);
            dispatch(updateProduct(product.id, formData, toast, reset, setLoader, setOpen));
            navigate("/admin/products");
        }
    };

    if (isLoading) {
        return <Skeleton />
    }

    if (errorMessage) {
        return <ErrorPage />
    }

    return (
        <div className='py-5 relative h-full'>
            <form className='space-y-4 pb-20' onSubmit={handleSubmit(saveProductHandler)}>
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField
                        label="Product Name"
                        required
                        id="productName"
                        type="text"
                        message="This field is required*"
                        register={register}
                        placeholder="Product Name"
                        errors={errors}
                    />

                    {!update && (
                        <SelectTextField
                            label={'Select Categories'}
                            select={selectedCategory}
                            setSelect={setSelectedCategory}
                            lists={categories}
                        />
                    )}
                </div>
                
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField label={'Price'} required={true} id={'price'} type={'number'} message={'This Field is Required*'} placeholder={'Product Price'} register={register} errors={errors} />
                    <InputField label={'Quantity'} required={true} id={'quantity'} type={'number'} message={'This Field is Required'} placeholder={'Product Quantity'} register={register} errors={errors} />
                </div>
                
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <InputField label={'Discount'} required={true} id={'discount'} type={'number'} message={'This Field is Required'} placeholder={'Product Discount'} register={register} errors={errors} />
                    <InputField label={'Special Price'} required={true} id={'specialPrice'} type={'number'} message={'This Field is Required'} placeholder={'Special Price'} register={register} errors={errors} />
                </div>

                {/* Integrated Image Upload Section */}
                <div className='flex flex-col gap-4 w-full'>
                    <label className='font-semibold text-slate-800 text-sm'>Product Image</label>
                    <label className='flex items-center gap-2 cursor-pointer text-custom-blue border border-dashed border-custom-blue rounded-md p-3 w-full justify-center hover:bg-blue-50 transition-colors'>
                        <FaCloudUploadAlt size={24} />
                        <span>Upload Product Image</span>
                        <input
                            type='file'
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className='hidden'
                            accept='.jpeg,.jpg,.png'
                        />
                    </label>

                    {preview && (
                        <div className="relative w-fit mt-2">
                            <img src={preview} alt='preview' className='h-40 object-cover rounded-md border border-slate-300' />
                            <button
                                className='absolute -top-2 -right-2 bg-rose-600 text-white text-xs py-1 px-2 rounded-full hover:bg-rose-700 transition-colors'
                                onClick={handleClearImage}
                                type='button'
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <label htmlFor='description' className='font-semibold text-slate-800 text-sm'>
                        Description
                    </label>
                    <textarea
                        rows={5}
                        placeholder={'Product Description'}
                        className={`px-4 py-2 w-full outline-none border text-slate-800 rounded-md bg-transparent ${errors['description']?.message ? "border-red-500" : "border-slate-700"}`}
                        {...register('description', {
                            required: { value: true, message: "Description is Required*" },
                        })}
                    />
                    {errors['description']?.message && (
                        <p className="text-sm font-semibold text-red-600 mt-0.5">
                            {errors['description']?.message}
                        </p>
                    )}
                </div>

                <div className='flex w-full justify-between items-center mt-6'>
                    <Button disabled={loader} onClick={() => setOpen(false)} variant='outlined' className='text-custom-blue py-[10px] px-4 text-sm font-medium'>
                        Cancel
                    </Button>
                    <Button disabled={loader} type='submit' variant='contained' color='primary' className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium'>
                        {loader ? (
                            <div className='flex gap-2 items-center'>
                                <FaSpinner className="animate-spin" /> Saving...
                            </div>
                        ) : (
                            "Save Product"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;