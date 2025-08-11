import React, { useState } from 'react'
import Skeleton from '../Shared/Skeleton';
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useSelector } from 'react-redux';
import AddressList from './AddressList';

export const AddressInfo = ({address}) => {
  const noAddressExit = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector(state => state.errors);

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");

  const addNewAddressHandler = () => {
    setSelectAddress("");
    setOpenAddressModal(true);
  };

  return (
    <div className='pt-4'>
      {noAddressExit ? (
        <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
          <FaAddressBook size={50} className='text-gray-500 mb-4' />
           <h1 className='mb-2 text-slate-900 text-center font-semibold text-2xl'>
              No Address Added Yet
            </h1>
           <p className='mb-6 text-slate-800 text-center'>
              Please add your address to complete purchase
          </p>
          <button
            className='cursor-pointer px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all'
            onClick={addNewAddressHandler}
          >
            Add Address
          </button>
          </div>
      ): (
          <div className='relative p-6 rounded-lg max-w-md mx-auto'>
            <h1 className='text-slate-800 text-center font-bold text-2xl'>
              Select Address
            </h1>
            
            {isLoading ? 
              <div className='py-4 px-8'>
                <Skeleton />
              </div>:
              <>
              <div className='space-y-4 pt-6'>
                <AddressList
                addresses = {address} 
                setSelectAddress = {setSelectAddress}
                setOpenAddressModal = {setOpenAddressModal}
                />
                </div>
                
              {address.length>0 && (
                  <div className='mt-4'>
                    <button
                      className='cursor-pointer px-4 py-2 bg-blue-600 text-white 
                                font-medium rounded hover:bg-blue-700 transition-all'
                      onClick={addNewAddressHandler}>
                      Add More
                    </button>
                  </div>
                )}
             </>   
          }
          </div>
      )}
      <AddressInfoModal isOpen={openAddressModal} setIsOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectAddress}
          setOpenAddressModal = {setOpenAddressModal}
        />
      </AddressInfoModal>
    </div>
  )
}
