import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";

export const adminOrderTableColumns = (handleEdit) =>
  [
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "id",
    headerName: "OrderID",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Order ID</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "email",
    headerName: "Email",
    minWidth : 200,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Email</span>
  },
  {
    sortable: true,
    disabledColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Total Amount</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "status",
    headerName: "status",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Status</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "date",
    headerName: "orderDate",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Order Date</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "action",
    headerName: "action",
    minWidth : 250,
    headerAlign : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className='text-center'>Action</span>,
    renderCell: (params) => {
      return (
        <div className='flex justify-center items-center space-x-2 h-full pt-2'>
          <button className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md' onClick={() => handleEdit(params.row)}>
            <FaEdit className='mr-2' />
            Edit
          </button>
        </div>
      );
    }
  },
  ];

export const adminProductTableColumns = (handleEdit,handleDelete,handleImageUpload,handleProductView) =>
  [
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "id",
    headerName: "ProductId",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Product ID</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    minWidth : 200,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Product Name</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "image",
    headerName: "image",
    minWidth : 200,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className='text-center'>Image</span>,
    renderCell: (param) => {
      return (
        <div className="flex items-center justify-center h-full w-full">
        <img src={param.row.image} alt={param.row.productName} className="h-16 w-16 object-contain"/>
      </div>
      )
    }
  },
  {
    sortable: true,
    disabledColumnMenu: true,
    field: "description",
    headerName: "description",
    minWidth : 300,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Description</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "quantity",
    headerName: "quantity",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Quantity</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "price",
    headerName: "price",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Price</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "discount",
    headerName: "discount",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Discount</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "specialPrice",
    headerName: "specialPrice",
    minWidth : 180,
    headerAlign: "center",
    align : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Special Price</span>
  },
  {
    sortable: false,
    disabledColumnMenu: true,
    field: "action",
    headerName: "action",
    minWidth : 400,
    headerAlign : "center",
    editable : false,
    headerClassName : "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className='text-center'>Action</span>,
    renderCell: (params) => {
      return (
        <div className='flex justify-center items-center space-x-2 h-full pt-2'>
          <button className='flex items-center bg-green-500 text-white px-4 h-9 rounded-md' onClick={() => handleImageUpload(params.row)}>
            <FaImage className='mr-2' />
            Image
          </button>
          <button className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md' onClick={() => handleEdit(params.row)}>
            <FaEdit className='mr-2' />
            Edit
          </button>
          <button className='flex items-center bg-red-500 text-white px-4 h-9 rounded-md' onClick={() => handleDelete(params.row)}>
            <FaTrashAlt className='mr-2' />
            Delete
          </button>
          <button className='flex items-center bg-slate-800 text-white px-4 h-9 rounded-md' onClick={() => handleProductView(params.row)}>
            <FaEye className='mr-2' />
            View
          </button>
        </div>
      );
    }
  },
];