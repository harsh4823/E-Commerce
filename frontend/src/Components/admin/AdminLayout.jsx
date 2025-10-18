import React, { useState } from 'react'
import SideBar from '../Shared/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='w-full'>
      <SideBar open={open} setOpen={setOpen} />
      <main className={`grow ${open ? 'pl-70':'pl-30'} py-10 duration-300 ease-in-out`}>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout