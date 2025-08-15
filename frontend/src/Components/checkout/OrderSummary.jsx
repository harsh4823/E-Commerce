import { formatPrice } from './../../Utils/formatPrice';
import React from 'react'

const OrderSummary = ({totalPrice,cart,address,paymentMethod}) => {
  return (
      <div className='container mx-auto px-4 mb-8'>
          <div className='flex flex-wrap'>
              <div className='w-full lg:w-8/12 pr-4'>
                <div className='space-y-4'>
                      <div className='p-4 border rounded-lg shadow-sm'>
                          <h2 className='text-2xl font-semibold mb-2'>Billing Address</h2>
                          <p>
                              <strong> Building Name :  </strong> {address?.buildingName}
                          </p>
                          <p>
                              <strong> Street :  </strong> {address?.street}
                          </p>
                          <p>
                              <strong> City :  </strong> {address?.city}
                          </p>
                          <p>
                              <strong> State :  </strong> {address?.state}
                          </p>
                          <p>
                              <strong> Country :  </strong> {address?.country}
                          </p>
                          <p>
                              <strong> PinCode :  </strong> {address?.pinCode}
                          </p>
                      </div>
                      <div className='p-4 border rounded-lg shadow-sm'>
                          <h2 className='text-2xl font-semibold mb-2'>Payment Method</h2>
                          <p>
                              <strong>Method : </strong> {paymentMethod}
                          </p>
                      </div>
                  <div className='p-4 border rounded-lg shadow-sm'>
                    <h2 className='text-2xl font-semibold mb-2'>Order Items</h2>
                      <div className='space-y-2'>
                              {cart.map((item) => (
                                  <div key={item.productId} className='flex items-center'>
                                      <img src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                                        alt={item?.productName}
                                        className='w-12 h-12 rounded mr-4'
                                      />
                                      <div className='text-gray-500'>
                                          <p>{item?.productName}</p>
                                          <p>
                                        {item?.quantity} X {formatPrice(item?.specialPrice)} = {formatPrice(item?.quantity * item?.specialPrice)}
                                          </p>
                                      </div>
                              </div>
                          ))}
                    </div>
                  </div>
                  </div>
              </div>
              <div className='w-full lg:max-w-4/12 mt-4 lg:mt-0'>
                  <div className='border rounded-lg shadow-sm p-4 space-y-4'>
                      <h2 className='text-2xl font-semibold mb-2'>Order Summary</h2>
                      <div className='space-y-2'>
                          <div className='flex justify-between'>
                              <span>Products</span>
                              <span>{formatPrice(totalPrice)}</span>
                          </div>
                          <div className='flex justify-between'>
                              <span>Tax (0%)</span>
                              <span>{formatPrice(0.00)}</span>
                          </div>
                          <div className='flex justify-between'>
                              <span>SubTotal</span>
                              <span>{formatPrice(totalPrice)}</span>
                          </div>
                      </div>
              </div>
                  
              </div>
        </div>
      </div>
  )
}

export default OrderSummary;