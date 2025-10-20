import React, { useState } from 'react'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateOrderStatusFromDashboard } from './../../../store/action/adminAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateOrderForm = ({ setOpen, open, selectedId, selectedItem, loader, setLoader }) => {
    const ORDER_STATUSES = [
        "Pending",
        "Processing",
        "Shipped",
        "Delievered",
        "Cancelled",
        "Accepted",
    ];
    console.log(selectedItem.status);
    const navigate = useNavigate();
    
    const [orderStatus, setOrderStatus] = useState(selectedItem?.status ||  "Accepted");
    const [error, setError] = useState("");
    const dispatch =  useDispatch();

    const updateOrderStatus = (e) => {
        e.preventDefault();
        if (!orderStatus) {
            setError("Order Status is Required");
            return;
        }
        dispatch(updateOrderStatusFromDashboard(toast, selectedId, orderStatus, setLoader));
        navigate(`/admin/orders`)
        setOpen(false);
        
    };

  return (
      <div className='py-5 relative h-fit'>
          <form className='space-y-4' onSubmit={updateOrderStatus}>
              <FormControl fullWidth variant='outlined' error={!!error}>
                  <InputLabel id="order-status-label">Order Status</InputLabel>
                  <Select
                      labelId='order-status-label'
                      label='Order-Status'
                      value={orderStatus}
                      onChange={(e) => {
                          setOrderStatus(e.target.value);
                          setError("");
                       }}>
                      {
                          ORDER_STATUSES.map((status) => (
                              <MenuItem key={status} value={status}>{ status }</MenuItem>
                          ))
                 }     
                  </Select>

                  {error && <FormHelperText>{error}</FormHelperText>}
              </FormControl>

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

export default UpdateOrderForm