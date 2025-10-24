import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { uploadProductImage } from './../../../store/action/adminAction';
import { useNavigate } from 'react-router-dom';

const ImageUpload = ({ setOpen, product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [preview, setPreview] = useState(null);
    const [loader, setLoader] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg","image/jpg","image/png"].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            toast.error("Please Select a Valid Image File (.jpeg,.jpg,.png)");
            setPreview(null);
            setSelectedFile(null);
        }
    };

    const addNewImageHandler = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            toast.error("Please select a image before saving.")
            return;
        }
        const formData = new FormData();
        formData.append("image", selectedFile);
        dispatch(uploadProductImage(product?.id, formData, toast, setLoader, setOpen));
        navigate("/admin/products");
    };

    const handleClearImage = () => {
        setPreview(null);
        setSelectedFile(null);
        fileInputRef.current.value = null;
    };

    return (
        <div className='py-5 relative h-fit'>
          <form className='space-y-4' onSubmit={addNewImageHandler}>
              <div className='flex flex-col gap-4 w-full'>
                  <label className='flex items-center gap-2 cursor-pointer text-custom-blue border border-dashed border-custom-blue rounded-md p-3 w-full justify-center'>
                      <FaCloudUploadAlt size={24}/>
                      <span> Upload Product Image</span>
                      <input
                          type='file'
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className='hidden'
                          accept='.jpeg,.jpg,.png'
                      />
                    </label>
                    
                    {preview && (
                        <div>
                            <img src={preview} alt='image' className='h-60 rounded-md mb-2' />
                            <button className='bg-rose-600 text-white py-1 px-2 rounded-md' onClick={handleClearImage} type='button'>
                                Clear Image
                            </button>
                        </div>
                    )}
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
                    "Upadate"      
                    )}
                </Button>
            </div>
          </form>
    </div>
  )
}

export default ImageUpload