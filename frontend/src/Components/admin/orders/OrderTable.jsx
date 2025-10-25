import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { adminOrderTableColumns } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Components/helper/tableColumn'; // Assumed correct path
import { useLocation, useNavigate} from 'react-router-dom';
import Modal from './../../Shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({ adminOrders, pagination }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);


  const currentPage = pagination?.pageNumber || 0;
  const pageSize = pagination?.pageSize || 10;

  const handlePaginationChange = (paginationModel) => {

    const newPageForUrl = paginationModel.page + 1; 
    
    const params = new URLSearchParams(location.search);
    params.set("page", newPageForUrl.toString());
    
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
}

  const tableRecords = adminOrders?.map((item) => ({
    id: item.orderId,
    email: item.email,
    totalAmount: "₹" + item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
  })) || [];

  return (
    <div>
      <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>All Orders</h1>
      <div className='flex flex-col justify-center items-center'>
        <DataGrid
          className='w-[1171.6px]'
          rows={tableRecords}
          columns={adminOrderTableColumns(handleEdit)}
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
      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title='Update Order Status'>
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          open={updateOpenModal}
          loader={loader}
          setLoader={setLoader}
          selectedId={selectedItem.id}
          selectedItem={selectedItem}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;