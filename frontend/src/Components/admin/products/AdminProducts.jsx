import React, { useState } from 'react'
import { MdAddShoppingCart, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../../Shared/Loader';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductTableColumns } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Components/helper/tableColumn';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDashboardProductFilter } from 'c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Hooks/useProductFilter';
import Modal from './../../Shared/Modal';
import AddProductForm from './AddProductForm';
import { DeleteModal } from './../../checkout/DeleteModal';
import toast from 'react-hot-toast';
import { deleteProduct } from '../../../store/action/adminAction';
import ImageUpload from './ImageUpload';
import ProductViewModal from './../../Shared/ProductViewModal';

const AdminProducts = () => {
  const { products, pagination } = useSelector(state => state.products);

   const tableRecords = products?.map((item) => ({
    id: item.productId,
    productName: item.productName,
    image : item.image,
    description: item.description,
    quantity : item.quantity,
    price: "₹" + item.price,
    discount : item.discount + "%",
    specialPrice: "₹" + item.specialPrice,
   })) || [];
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [addOpenModal, setAddOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");


  const currentPage = pagination?.pageNumber || 0;
  const pageSize = pagination?.pageSize || 10;

  const handlePaginationChange = (paginationModel) => {

    const newPageForUrl = paginationModel.page + 1; 
    
    const params = new URLSearchParams(location.search);
    params.set("page", newPageForUrl.toString());
    
    navigate(`${location.pathname}?${params.toString()}`);
  };


  const { isLoading} = useSelector(state => state.errors);

  const emptyProducts = !products || products.length === 0;

  const handleEdit = (product) => {
    setSelectedItem(product);
    setUpdateOpenModal(true);
  };

  const handleDelete = (product) => {
    setSelectedItem(product);
    setDeleteOpenModal(true);
  };

  const handleImageUpload = (product) => {
    setSelectedItem(product);
    setOpenImageUploadModal(true);
  };

  const handleProductView = (product) => {
    setSelectedItem(product);
    setOpenViewModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(deleteProduct(setLoader, selectedItem.id, toast, setDeleteOpenModal));
    navigate("/admin/products");
  }

  useDashboardProductFilter();

  return (
    <div className='pr-6'>
      <div className='pt-6 pb-10 flex justify-end'>
        <button onClick={()=>setAddOpenModal(true)} className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
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
          )}
          </> 
      )}

      {/* Add and Update Product  */}
      <Modal
        open={ updateOpenModal || addOpenModal }
        setOpen={updateOpenModal ? setUpdateOpenModal : setAddOpenModal }
        title={updateOpenModal ? "Update Prodcut" : "Add Product"}      
      >
        <AddProductForm
        setOpen={updateOpenModal ? setUpdateOpenModal : setAddOpenModal}
        product={selectedItem}
        update={updateOpenModal}
        />
      </Modal>

      {/* Upload Image  */}
      <Modal
        open={ openImageUploadModal }
        setOpen={setOpenImageUploadModal }
        title={"Upload Product Image"}      
      >
        <ImageUpload
        setOpen={setOpenImageUploadModal}
        product={selectedItem}
        />
      </Modal>

      {/* Delete Product  */}
      <DeleteModal
        open={ deleteOpenModal }
        setOpen={setDeleteOpenModal}
        title={"Delete Product"}      
        onDeleteHandler={onDeleteHandler}
        loader={loader}
      />

      {/* View Product  */}
      <ProductViewModal
        product={{
          ...selectedItem,
          price: String(selectedItem.price).slice(1),
          discount: String(selectedItem?.discount).slice(0, -1),
          specialPrice: String(selectedItem?.specialPrice).slice(1) 
        }}
        open={openViewModal}
        setOpen={setOpenViewModal}
        isAvailable={selectedItem.quantity}
      /> 
    </div>
  )
}

export default AdminProducts