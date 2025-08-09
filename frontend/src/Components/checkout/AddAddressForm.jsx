import InputField from '../Shared/InputField'
import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { SpinnerCircularFixed } from 'spinners-react';
import { Link } from 'react-router-dom';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from './../../store/action/checkoutAction';
import { Location } from '../../Utils/Location';

const AddAddressForm = ({address,setOpenAddressModal}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched" });
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

    const  currentLocation  = Location();

  return (
  <div className="">
            <form onSubmit={handleSubmit(onSaveAddressHandler)}
            className="">
                <div className="flex justify-center items-center font-semibold text-2xl mb-4 text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl"/>
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                       Add Address
                    </h1>
                </div>
        
              <div className="flex flex-col gap-4">
                {/* Country */}
                <InputField
                    label="Country"
                    required
                    id="country"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*Country is required"
                    placeholder="Enter Country"
                    value={currentLocation.country}
                    />
                    {/* State */}
                <InputField
                    label="State"
                    required
                    id="state"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*State is required"
                    placeholder="Enter State"
                    value={currentLocation.state}
                    />
                    {/* City */}
                <InputField
                    label="City"
                    required
                    id="city"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*City is required"
                    placeholder="Enter City"
                    value={currentLocation.city}
                    />
                    {/* PinCode */}
                <InputField
                    label="PinCode"
                    required
                    id="pinCode"
                    type="number"
                    register={register}
                    errors={errors}
                    min={6}
                    message="*PinCode is required"
                    placeholder="Enter PinCode"
                    value={currentLocation.pincode}
                    />
                    {/* Street */}
                <InputField
                    label="Street"
                    required
                    id="street"
                    type="text"
                    register={register}
                    errors={errors}
                    message="*Streetis required"
                    placeholder="Enter Street"
                    value={currentLocation.street}
                    />
                  {/* Building Name */}
                <InputField
                    label="BuildingName"
                    required
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