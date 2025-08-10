import React from 'react'
import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch } from 'react-redux'

const AddressList = ({ addresses, setSelectAddress, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const selectedUserAddress = addresses[0];

    const handleAddressSelection = (address) => {
        
    };

    const onEditButtonHandler = (address) => {
        setSelectAddress(address);
        setOpenAddressModal(true);
    };
    
    const onDeleteButtonHandler = (address) => {
        setSelectAddress(address);
    };
  return (
      <div className='space-y-4'>
          {addresses.map((address) => (
              <div key={address.addressId} onClick={() => handleAddressSelection(address)}
                  className={`p-4 rounded-md cursor-pointer border relative
                ${selectedUserAddress?.addressId===address.addressId ? "bg-green-100":"bg-white"}`}
              >
            <div className='flex items-start'>
            <div className='space-y-1'>   
            {/* BuildingName */}
            <div className='items-center flex'>
                <FaBuilding size={14} className='mr-2 text-gray-600'/>
                <p className='font-semibold'>{address.buildingName}</p>
                    {selectedUserAddress?.addressId === address.addressId && (
                        <FaCheckCircle className='text-green-500 ml-2'/>
                )}
            </div>
            {/* Street */}
            <div className='items-center flex'>
                <FaStreetView size={14} className='mr-2 text-gray-600'/>
                <p>{address.street}</p>
            </div>
            {/* City , State*/}
            <div className='items-center flex'>
                <MdLocationCity size={14} className='mr-2 text-gray-600'/>
                <p>{address.city}, { address.state}</p>
            </div>
            {/* PinCode */}
            <div className='items-center flex'>
                <MdPinDrop size={14} className='mr-2 text-gray-600'/>
                <p>{address.pinCode}</p>
            </div>
            {/* Country */}
            <div className='items-center flex'>
                <MdPublic size={14} className='mr-2 text-gray-600'/>
                <p>{address.country}</p>
            </div>
            </div>
            </div>   
                <div className='flex gap-4 absolute top-2 right-2'>
                      <button onClick={()=>onEditButtonHandler(address)}>
                        <FaEdit size={18} className='text-teal-700'/>
                      </button>
                      <button onClick={()=>onDeleteButtonHandler(address)}>
                          <FaTrash size={17} className='text-rose-600'/>
                      </button>
                </div>
            </div>
          ))}
      </div>
  )
}

export default AddressList