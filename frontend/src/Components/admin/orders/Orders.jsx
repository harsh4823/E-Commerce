import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';
import { useSelector } from 'react-redux';
import useOrderFilter from './../../../Hooks/useOrderFilter';

const Orders = () => {
  const { adminOrders, pagination } = useSelector(state => state.order);
  useOrderFilter();
  const emptyOrders = !adminOrders || adminOrders.length===0;
  return (
      <div className='pb-6 pt-20'>
          {emptyOrders ? (
              <div className='flex flex-col justify-center text-gray-600 items-center py-10'>
                  <FaShoppingCart size={50} className='mb-3'/>
                  <h2 className='text-2xl font-semibold'>No Orders Placed Yet </h2>
              </div>
          ): (
          <OrderTable adminOrders={adminOrders} pagination={ pagination } />
          )}
    </div>
  )
}

export default Orders