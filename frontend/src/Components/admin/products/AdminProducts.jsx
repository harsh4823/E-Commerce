import React from 'react'
import { MdAddShoppingCart, MdShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Loader from './../../Shared/Loader';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductTableColumns } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Components/helper/tableColumn';

const AdminProducts = () => {
  const products = [
    {
      "productId": 1,
      "productName": "Smart TV 50-inch",
      "image": "http://localhost:8080/images/c920ddf9-a903-43a2-98d6-e3cd1b9cb309.jpg",
      "description": "Ultra HD 4K Smart LED TV with built-in WiFi, voice control, and screen mirroring support. Comes with 1-year warranty.",
      "quantity": 0,
      "price": 45000.0,
      "discount": 15.0,
      "specialPrice": 38250.0
    },
    {
      "productId": 2,
      "productName": "Wireless Bluetooth Headphones",
      "image": "http://localhost:8080/images/713a9f6e-c882-4442-8939-6bc6401545d4.webp",
      "description": "Noise-cancelling over-ear headphones with 40 hours of battery life, deep bass, and comfortable ear cups.",
      "quantity": 22,
      "price": 3500.0,
      "discount": 10.0,
      "specialPrice": 3150.0
    },
    {
      "productId": 3,
      "productName": "Laptop Cooling Pad",
      "image": "http://localhost:8080/images/07e3e060-e568-48a5-b483-0b3a4b6f246d.jpg",
      "description": "Multi-angle adjustable laptop stand with dual cooling fans and USB power support.",
      "quantity": 59,
      "price": 1200.0,
      "discount": 5.0,
      "specialPrice": 1140.0
    },
    {
      "productId": 4,
      "productName": "Power Bank 20000mAh",
      "image": "http://localhost:8080/images/7884f4ae-950f-4ddc-a7b4-d207e94f9605.webp",
      "description": "Fast-charging portable power bank with dual USB output, LED indicators, and lithium-polymer battery.",
      "quantity": 54,
      "price": 1800.0,
      "discount": 12.0,
      "specialPrice": 1584.0
    },
    {
      "productId": 5,
      "productName": "Non-Stick Cookware Set",
      "image": "http://localhost:8080/images/d8e1c7d3-16d5-4b2f-a479-5c58d42bb6c3.jpg",
      "description": "5-piece non-stick cookware set with heat-resistant handles, scratch-proof coating, and induction base.",
      "quantity": 24,
      "price": 2800.0,
      "discount": 20.0,
      "specialPrice": 2240.0
    }
  ];

  const pagination = {
    "pageNumber": 0,
    "pageSize": 16,
    "totalItems": 20,
    "totalPages": 2,
    "lastPage": false,
  };

   const tableRecords = products?.map((item) => ({
    id: item.productId,
    productName: item.productName,
    description: item.description,
    quantity : item.quantity,
    price: "₹" + item.price,
    discount : item.discount + "%",
    specialPrice: "₹" + item.specialPrice,
  })) || [];

  const { isLoading, errorMessage } = useSelector(state => state.errors);

  const emptyProducts = !products || products.length === 0;

  const handleEdit = (product) => {

  };
  const handleDelete = (product) => {

  };
  const handleImageUpload = (product) => {

  };
  const handleProductView = (product) => {

  };

  const handlePaginationChange = () => {

  };
  
  return (
    <div className='pr-6'>
      <div className='pt-6 pb-10 flex justify-end'>
        <button className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
          <MdAddShoppingCart className='text-2xl' />
          Add Product
        </button>
      </div>
      {!emptyProducts && (
        <h1 className='text-slate-800 font-bold text-3xl text-center pb-6 uppercase'>All Products</h1>
      )}
      {isLoading ? (
          <Loader/>
      ): (
          <>
            {emptyProducts ? (
              <div className='flex flex-col justify-center items-center text-gray-600 py-10'>
                <FaBoxOpen className='mb-3' size={50}/>
                <h2 className='text-2xl font-semibold'>
                No Products Created Yet
                </h2>
              </div>
            ) : (
                <div className='max-w-full'>
                  <DataGrid
                    className='w-full'
                    rows={tableRecords}
                    columns={adminProductTableColumns(handleEdit,handleDelete,handleImageUpload,handleProductView)}
                    paginationMode='server'
                    rowCount={pagination?.totalItems || 0}
                    pageSizeOptions={[pagination?.pageSize]}
                
                    paginationModel={{
                      page: pagination?.pageNumber, 
                      pageSize: pagination?.pageSize,
                    }}
                    
                    onPaginationModelChange={handlePaginationChange}
                    
                    disableRowSelectionOnClick
                    disableColumnResize
                    
                    showFirstButton
                    showLastButton
                  />
                </div>
          )}
          </> 
      )}
    </div>
  )
}

export default AdminProducts