import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

const AddressInfoModal = ({isOpen,setIsOpen,children}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="relative w-full bg-white max-w-md mx-auto transform overflow-hidden rounded-lg shadow-xl transition-all">
          <div className='p-6'>
            {children}
           </div>
       <div className={'flex justify-end absolute right-4 top-2 gap-4'}>
        <button
            onClick={()=>{setIsOpen(false)}}
            type={'button'}>
            <FaTimes className='text-slate-700' size={25}/>
        </button>
    </div>
          </DialogPanel>
      </div>
      </Dialog>
  )
}

export default AddressInfoModal