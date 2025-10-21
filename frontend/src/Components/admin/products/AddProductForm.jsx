import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from './../../Shared/InputField';
import { Button } from '@mui/material';
import { FaSpinner } from 'react-icons/fa6';

import { useDispatch } from 'react-redux';
import { updateProduct } from './../../../store/action/adminAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProductForm = ({setOpen,product,update=false}) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({mode:'onTouched'});
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (update && product) {
            setValue("productName", product?.productName);
            setValue("price", String(product?.price).slice(1));
            setValue("quantity", product?.quantity);
            setValue("discount", String(product?.discount).slice(0,-1));
            setValue("specialPrice", String(product?.specialPrice).slice(1));
            setValue("description", product?.description);
        }    
    }, [update, product]);

    const saveProductHandler = (data) => {
        if (!update) {
            
        } else {
            const sendData = {
                ...data,
                id: product.id,
            };
            dispatch(updateProduct(sendData, toast, reset, setLoader, setOpen));
            navigate("/admin/products");
        }
    };

  return (
      <div className='py-5 relative h-full'>
          <form className='space-y-4' onSubmit={handleSubmit(saveProductHandler)}>
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
              </div>
              <div className='flex md:flex-row flex-col gap-4 w-full'>
                  <InputField
                      label={'Price'}
                      required={true}
                      id={'price'}
                      type={'number'}
                      message={'This Field is Required*'}
                      placeholder={'Product Price'}
                      register={register}
                      errors={errors}
                  /> 
                  <InputField
                      label={'Quantity'}
                      required={true}
                      id={'quantity'}
                      type={'number'}
                      message={'This Field is Required'}
                      placeholder={'Product Quantity'}
                      register={register}
                      errors={errors}
                  />
              </div>
              <div className='flex md:flex-row flex-col gap-4 w-full'>
                  <InputField
                      label={'Discount'}
                      required={true}
                      id={'discount'}
                      type={'number'}
                      message={'This Field is Required'}
                      placeholder={'Product Discount'}
                      register={register}
                      errors={errors}
                  /> 
                  <InputField
                      label={'Special Price'}
                      required={true}
                      id={'specialPrice'}
                      type={'number'}
                      message={'This Field is Required'}
                      placeholder={'Special Price'}
                      register={register}
                      errors={errors}
                  />
              </div>

              <div className='flex flex-col gap-4 w-full'>
                  <label htmlFor='description' className='font-semibold text-slate-800 text-sm'>
                      Description
                  </label>

                  <textarea
                    rows={5}
                    placeholder={'Product Description'}
                    className={`px-4 py-2 w-full outline-none border text-slate-800 rounded-md bg-transparent
                    ${errors['description']?.message ? "border-red-500" : "border-slate-700"}
                    `}
                    {...register('description', {

                        required: {
                            value: true,
                            message:"Description is Required*"
                        },
                        
                    })}
                  />
                   {errors['description']?.message && (
                    <p className="text-sm font-semibold text-red-600 mt-0.5">
                    {errors['description']?.message}
                    </p>
            )}
              </div>
              
               <div className='flex w-full justify-between items-center absolute bottom-15'>
                <Button disabled={loader} onClick={() => setOpen(false)} variant='outlined' className='text-white py-[10px] px-4 text-sm font-medium'>
                    Cancel
                </Button>
                <Button disabled={loader} type='submit' variant='contained' color='primary' className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium'>
                    {loader ? (
                        <div className='flex gap-2 items-center'>
                        <FaSpinner/> Loading...    
                        </div>   
                    ): (
                    "Upadate"      
                    )}
                </Button>
            </div>
          </form>
    </div>
  )
}

export default AddProductForm