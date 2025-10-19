import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { adminOrderTableColumns } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Components/helper/tableColumn'; // Assumed correct path
import { useLocation, useNavigate} from 'react-router-dom';

const OrderTable = ({ adminOrders, pagination }) => {
  const navigate = useNavigate();
  const location = useLocation();


  const currentPage = pagination?.pageNumber || 0;
  const pageSize = pagination?.pageSize || 10;

  const handlePaginationChange = (paginationModel) => {

    const newPageForUrl = paginationModel.page + 1; 
    
    const params = new URLSearchParams(location.search);
    params.set("page", newPageForUrl.toString());
    
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const tableRecords = adminOrders?.map((item) => ({
    id: item.orderId,
    email: item.email,
    totalAmount: item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
  })) || [];

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
          pageSizeOptions={[pageSize]}
      
          paginationModel={{
            page: currentPage, 
            pageSize: pageSize,
          }}
          
          onPaginationModelChange={handlePaginationChange}
          
          disableRowSelectionOnClick
          disableColumnResize
          
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default OrderTable;