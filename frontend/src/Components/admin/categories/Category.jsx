import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './../../Shared/Loader';
import { FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { adminCategoryTableColumns } from './../../helper/tableColumn';
import Modal from './../../Shared/Modal';
import { fetchCategory } from './../../../store/action/categoryAction';
import { DataGrid } from '@mui/x-data-grid';
import AddCategoryForm from './AddCategoryForm';
import { DeleteModal } from './../../checkout/DeleteModal';
import toast from 'react-hot-toast';
import { deleteCategory } from './../../../store/action/adminAction';

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  
  const { categories, pagination } = useSelector(state => state.categories);
  const { isLoading } = useSelector(state => state.errors);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  
     const tableRecords = categories?.map((item) => ({
        id: item.categoryId,
        categoryName: item.categoryName,
     })) || [];
  
  const onDeleteHandler = () => {
      dispatch(deleteCategory(setLoader,selectedItem.id,toast,setDeleteOpenModal));
      navigate("/admin/categories");
  };
      
  const currentPage = pagination?.pageNumber || 0;
  const pageSize = pagination?.pageSize || 10;

  const handlePaginationChange = (paginationModel) => {
  
      const newPageForUrl = paginationModel.page + 1; 
  
      const params = new URLSearchParams(location.search);
      params.set("page", newPageForUrl.toString());
  
      navigate(`${location.pathname}?${params.toString()}`);
    };
  
  
  
    const emptyCategories = !categories || categories.length === 0;
  
    const handleEdit = (category) => {
        setSelectedItem(category);
        setUpdateOpenModal(true);
      };
    
      const handleDelete = (category) => {
          setSelectedItem(category);
          setDeleteOpenModal(true);
        };
            
  return (
    <div className='pr-6'>
      <div className='pt-6 pb-10 flex justify-end'>
        <button onClick={()=>setAddOpenModal(true)} className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
          <FaClipboardList className='text-2xl' />
          Add Category
        </button>
      </div>
      {!emptyCategories && (
        <h1 className='text-slate-800 font-bold text-3xl text-center pb-6 uppercase'>All Categories</h1>
      )}
      {isLoading ? (
          <Loader/>
      ): (
          <>
            {emptyCategories ? (
              <div className='flex flex-col justify-center items-center text-gray-600 py-10'>
                <FaBoxOpen className='mb-3' size={50}/>
                <h2 className='text-2xl font-semibold'>
                No Category Created Yet
                </h2>
              </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                  <DataGrid
                    className='max-w-[851.7px]'
                    rows={tableRecords}
                    columns={adminCategoryTableColumns(handleEdit, handleDelete)}
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

      {/* Add and Update Product  */}
      <Modal
        open={ updateOpenModal || addOpenModal }
        setOpen={updateOpenModal ? setUpdateOpenModal : setAddOpenModal }
        title={updateOpenModal ? "Update Category" : "Add Category"}      
      >
        <AddCategoryForm
          category={selectedItem}
          setOpen={updateOpenModal ? setUpdateOpenModal : setAddOpenModal}
          update={updateOpenModal}
        />
      </Modal>

      {/* Delete Product  */}
      <DeleteModal
        open={ deleteOpenModal }
        setOpen={setDeleteOpenModal}
        title={"Delete Category"}      
        onDeleteHandler={onDeleteHandler}
        loader={loader}
      />

      {/* View Product  */}
      {/* <ProductViewModal
        product={{
          ...selectedItem,
          price: String(selectedItem.price).slice(1),
          discount: String(selectedItem?.discount).slice(0, -1),
          specialPrice: String(selectedItem?.specialPrice).slice(1) 
        }}
        open={openViewModal}
        setOpen={setOpenViewModal}
        isAvailable={selectedItem.quantity}
      />  */}
      </div>
  )
}

export default Category;