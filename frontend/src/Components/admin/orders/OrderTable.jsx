import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit } from 'react-icons/fa';
import { adminOrderTableColumns } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Components/helper/tableColumn';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

const OrderTable = ({ adminOrders, pagination }) => {
  
  const [currentPage, setCurrentPage] = useState(pagination?.pageNumber + 1 || 1);

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    Navigate(`${pathName}?${params}`);
  }

  const tableRecords = adminOrders?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date : item.orderDate
    }
  });
  return (
    <div>
          <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>All Orders</h1>
    <div>
        <DataGrid
        className='w-full'
        rows={tableRecords}
        columns={adminOrderTableColumns}
        paginationMode='server'
        rowCount={pagination?.totalItems || 0}  
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pagination?.pageSize || 10,
              page : currentPage+1 ,
            },
          },
          }}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[pagination?.pageSize]}
        disableRowSelectionOnClick
        disableColumnResize  
        pagination
          paginationOptions={{
          showFirstButton:true,
          showLastButton:true,
          hideNextButton : currentPage === pagination?.totalPages,
        }}  
      />
          </div>
      </div>
  )
}

export default OrderTable