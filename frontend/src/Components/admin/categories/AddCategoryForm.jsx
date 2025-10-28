import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from './../../Shared/InputField';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewCategory, updateCategory } from './../../../store/action/adminAction';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const AddCategoryForm = ({ setOpen, category, update }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: 'onTouched' });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onSaveHandler = (data) => {
        if (!update) {
            // console.log(data);
            dispatch(addNewCategory(data, toast, reset, setLoader, setOpen));
            navigate("/admin/categories");
        } else {
            const sendData = {
                ...data,
                categoryId: category.id,
            };
            dispatch(updateCategory(sendData, toast, reset, setLoader, setOpen));            
        }
    };

     useEffect(() => {
            if (update && category) {
                setValue("categoryName", category?.categoryName);
            }    
        }, [update, category]);

  return (
      <div className='py-5 relative h-fit'>
          <form className='space-y-4' onSubmit={handleSubmit(onSaveHandler)}>
              <div className='flex md:flex-row flex-col gap-4 w-full'>
                  <InputField
                    label="Category Name"
                    required
                    id="categoryName"
                    type="text"
                    message="This field is required*"
                    register={register}
                    placeholder="Category Name"
                    errors={errors}
                  /> 
              </div>
              <div className='flex w-full justify-between items-center absolute top-120'>
                <Button disabled={loader} onClick={() => setOpen(false)} variant='outlined' className='text-white py-[10px] px-4 text-sm font-medium'>
                    Cancel
                </Button>
                <Button disabled={loader} type='submit' variant='contained' color='primary' className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium'>
                    {loader ? (
                        <div className='flex gap-2 items-center'>
                        <FaSpinner/> Loading...    
                        </div>   
                    ): (
                    "Save"      
                    )}
                </Button>
            </div>
          </form>
    </div>
  )
}

export default AddCategoryForm;