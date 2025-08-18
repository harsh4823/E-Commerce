import InputField from '../Shared/InputField'
import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { SpinnerCircularFixed } from 'spinners-react';
import { Link } from 'react-router-dom';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from './../../store/action/checkoutAction';
import { useEffect } from 'react';

const AddAddressForm = ({address,setOpenAddressModal}) => {
  const { register, handleSubmit,setValue, formState: { errors } } = useForm({ mode: "onTouched" });
  const { btnLoder } = useSelector(state => state.errors);
  const dispatch = useDispatch();

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal,
        ));
    };

    useEffect(() => {
        if (!address?.addressId) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await res.json();

        // Auto-fill & validate
        setValue("street", data.address.residential || data.address.city_block || "", { shouldValidate: true, shouldDirty: true });
        setValue("city", data.address.city || data.address.town || data.address.city_district || "", { shouldValidate: true, shouldDirty: true });
        setValue("state", data.address.state || data.address.city || "", { shouldValidate: true, shouldDirty: true });
        setValue("country", data.address.country || "", { shouldValidate: true, shouldDirty: true });
        setValue("pinCode", data.address.postcode || "", { shouldValidate: true, shouldDirty: true });
    });
        }
        
    }, [setValue,address]);
    
    useEffect(() => {
        if (address?.addressId) {
            setValue("street", address.street);
            setValue("city", address.city);
            setValue("state", address.state);
            setValue("country", address.country);
            setValue("pinCode", address.pinCode);
            setValue("buildingName", address.buildingName);
        }
    }, [address, setValue]);

  return (
  <div className="">
            <form onSubmit={handleSubmit(onSaveAddressHandler)}
            className="">
                <div className="flex justify-center items-center font-semibold text-2xl mb-4 text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl"/>
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                       {address?.addressId ? "Update Address" : "Add Address"}
                    </h1>
                </div>
        
              <div className="flex flex-col gap-4">
                {/* Country */}
                <InputField
                    label="Country"
                    required = {true}
                    id="country"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*Country is required"
                    placeholder="Enter Country"
                    />
                    {/* State */}
                <InputField
                    label="State"
                    required= {true}
                    id="state"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*State is required"
                    placeholder="Enter State"
                    />
                    {/* City */}
                <InputField
                    label="City"
                    required= {true}
                    id="city"
                    type="text"                   
                    register={register}
                    errors={errors}
                    message="*City is required"
                    placeholder="Enter City"
                    />
                    {/* PinCode */}
                <InputField
                    label="PinCode"
                    required= {true}
                    id="pinCode"
                    type="number"                    
                    register={register}
                    errors={errors}
                    min={6}
                    message="*PinCode is required"
                    placeholder="Enter PinCode"
                    />
                    {/* Street */}
                <InputField
                    label="Street"
                    required= {true}
                    id="street"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*Street is required"
                    placeholder="Enter Street"
                    />
                  {/* Building Name */}
                <InputField
                    label="BuildingName"
                    required= {true}
                    id="buildingName"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*BuildingName is required"
                    placeholder="Enter BuildingName"
                    />
                </div>
                <button className={`text-white bg-custom-blue px-4 py-2 rounded-md mt-4 ${btnLoder?'cursor-default':'cursor-pointer'}`} disabled={btnLoder} type="submit">
                    {btnLoder ?
                        <div className="flex gap-4">
                            <SpinnerCircularFixed size={20} thickness={100} speed={100} color="white" secondaryColor="rgba(0, 0, 0, 0.44)">
                            </SpinnerCircularFixed>
                            Loading...
                        </div>
                         :
                    <>Save</>}
                </button>
            </form>
        </div>
  )
}

export default AddAddressForm