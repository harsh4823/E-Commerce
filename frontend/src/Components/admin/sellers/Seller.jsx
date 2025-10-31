import { DataGrid } from '@mui/x-data-grid';
import { fetchSellers } from './../../../store/action/adminAction';
import { adminSellerTableColumns } from './../../helper/tableColumn';
import React, { useEffect } from 'react'
import { FaBoxOpen } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './../../Shared/Loader';

const Seller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { sellers, pagination } = useSelector(state => state.admin);
  const { isLoading } = useSelector(state => state.errors);

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);
  
     const tableRecords = sellers?.map((item) => ({
        id: item.userId,
        username: item.username,
        email: item.email,
     })) || [];
      
  const currentPage = pagination?.pageNumber || 0;
  const pageSize = pagination?.pageSize || 10;

  const handlePaginationChange = (paginationModel) => {
  
      const newPageForUrl = paginationModel.page + 1; 
  
      const params = new URLSearchParams(location.search);
      params.set("page", newPageForUrl.toString());
  
      navigate(`${location.pathname}?${params.toString()}`);
    };
  
  
  
    const emptySellers = !sellers || sellers.length === 0;
            
  return (
    <div className='pr-6'>
      {!emptySellers && (
        <h1 className='text-slate-800 font-bold text-3xl text-center pb-6 uppercase'>All Sellers</h1>
      )}
      {isLoading ? (
          <Loader/>
      ): (
          <>
            {emptySellers ? (
              <div className='flex flex-col justify-center items-center text-gray-600 py-10'>
                <FaBoxOpen className='mb-3' size={50}/>
                <h2 className='text-2xl font-semibold'>
                No Sellrs Yet
                </h2>
              </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                  <DataGrid
                    className='w-[801.6px]'
                    rows={tableRecords}
                    columns={adminSellerTableColumns()}
                    paginationMode='server'
                    rowCount={pagination?.totalItems || 0}
                    pageSizeOptions={[pageSize]}
                    density='standard'
                    
                
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
          )}
          </> 
      )}
    </div>
  )
}

export default Seller