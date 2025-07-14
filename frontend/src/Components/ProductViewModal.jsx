import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {Divider} from "@mui/material";
import Status from "./Status.jsx";
import {MdClose, MdDone} from "react-icons/md";

function ProductViewModal(
    {
        open,
        setOpen,
        product,
        isAvailable,
    }
) {
    const {
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
    } = product;

    return (
        <>
            <Dialog open={open} as="div" className="relative z-10" onClose={close} __demoMode>

                <DialogBackdrop className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"/>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex items-center justify-center p-4" >
                        <DialogPanel
                            transition
                            className="bg-white rounded-lg shadow-xl relative transform overflow-hidden transition-all md:max-w-[620px] md:min-w-[620px] w-full"
                        >
                            {image && (
                                <div className={'flex justify-center items-center aspect-[3/2]'}>

                                <img src={image} alt={productName}
                                     className= "w-full h-full cursor-pointer transition-transform duration-300 transform"/>
                                </div>
                            )}

                            <div className={'px-6 pt-10 pb-2'}>
                            <DialogTitle
                                as="h1"
                                className="lg:text-3xl sm:text-2xl font-semibold leading-6 text-gray-800 mb-4">
                                    {productName}
                            </DialogTitle>

                            <div className={'space-y-2 text-gray-700 pb-4'}>

                                <div className={'flex items-center justify-end gap-2'}>
                                {isAvailable ? (
                                    <Status
                                    text="In Stock"
                                    icon={MdDone}
                                    bg="bg-teal-200"
                                    color="text-teal-900"
                                    />

                                ):(
                                    <Status
                                    text="Out of Stock"
                                    icon={MdClose}
                                    bg="bg-rose-200"
                                    color="text-rose-900"
                                    />
                                    )}
                                </div>

                                <div className={'flex items-center justify-between gap-2'}>
                                    {specialPrice ? (
                                        <div className={'flex items-center gap-2'}>
                                            <span className={'text-gray-400 line-through'}>
                                            ${Number(price).toFixed(2)}
                                            </span>
                                            <span className={'sm:text-xl font-semibold text-slate-700'}>
                                            ${Number(specialPrice).toFixed(2)}
                                            </span>
                                        </div>
                                    ):(
                                        <div>
                                            {""}
                                            <span className={'sm:text-xl font-semibold text-slate-700'}>
                                            ${Number(price).toFixed(2)}
                                            </span>
                                        </div>
                                    )
                                    }
                                </div>

                                <Divider/>
                                <p>{description}</p>
                            </div>
                            </div>

                            <div className={'flex justify-end px-6 py-4 gap-4'}>
                                <button
                                    onClick={()=>{setOpen(false)}}
                                    type={'button'}
                                    className={'px-4 py-2 text-sm font-semibold border text-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md cursor-pointer'}
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}


export default ProductViewModal;
