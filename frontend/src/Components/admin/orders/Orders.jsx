import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';

const Orders = () => {
  const adminOrders = [{ "orderId": 100, "email": "harsh@example.com", "orderItems": [ { "orderItemId": 205, "product": { "productId": 2, "productName": "Wireless Bluetooth Headphones", "image": "713a9f6e-c882-4442-8939-6bc6401545d4.webp", "description": "Noise-cancelling over-ear headphones with 40 hours of battery life, deep bass, and comfortable ear cups.", "quantity": 22, "price": 3500, "discount": 10, "specialPrice": 3150 }, "quantity": 1, "discount": 10, "orderedProductPrice": 3150 }, { "orderItemId": 204, "product": { "productId": 1, "productName": "Smart TV 50-inch", "image": "c920ddf9-a903-43a2-98d6-e3cd1b9cb309.jpg", "description": "Ultra HD 4K Smart LED TV with built-in WiFi, voice control, and screen mirroring support. Comes with 1-year warranty.", "quantity": 0, "price": 45000, "discount": 15, "specialPrice": 38250 }, "quantity": 5, "discount": 15, "orderedProductPrice": 38250 }, { "orderItemId": 206, "product": { "productId": 19, "productName": "Office Chair Ergonomic", "image": "9905da6e-5258-4ee5-8fd5-013c4ca15778.avif", "description": "Adjustable ergonomic office chair with lumbar support, mesh backrest, and 360° swivel wheels.", "quantity": 8, "price": 7500, "discount": 20, "specialPrice": 6000 }, "quantity": 1, "discount": 20, "orderedProductPrice": 6000 } ], "orderDate": "2025-08-19", "payment": { "paymentId": 100, "paymentMethod": "Online", "pgPaymentId": "pi_3RxtNB1AyglZgWkA10Vpnibg", "pgStatus": "succeeded", "pgResponseMessage": "Payment Successfull", "pgName": "Stripe" }, "totalAmount": 200400, "orderStatus": "Order Placed", "addressId": 44 }]
  const pagination = {pageNumber: 0,pageSize: 16,totalItems: 19,totalPages: 2,lastPage: false}
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