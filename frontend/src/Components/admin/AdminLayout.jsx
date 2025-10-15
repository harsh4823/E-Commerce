import React, { useState } from 'react'
import SideBar from '../Shared/SideBar';

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='w-full flex'>
      <SideBar open={open} setOpen={setOpen}/>
    </div>
  )
}

export default AdminLayout