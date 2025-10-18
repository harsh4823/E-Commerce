import { FaEdit } from "react-icons/fa";

export const adminOrderTableColumns = [
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
          <button className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
            <FaEdit className='mr-2' />
            Edit
          </button>
        </div>
      );
    }
  },
];