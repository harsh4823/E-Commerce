// src/components/SideBar.js

import React from 'react';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand, TbLayoutSidebarRight } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import classNames from 'classnames';
// A good practice is to use relative paths for your imports
import { adminNavigation } from '/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/Utils/index'; 
import { Link, useLocation } from 'react-router-dom';
import { BsLayoutSidebar } from "react-icons/bs";
import { useSelector } from 'react-redux';

// The props `sidebarOpen` and `setSidebarOpen` are passed down from AdminLayout
const SideBar = ({ open,setOpen }) => {
    const pathname = useLocation().pathname;
    const { user } = useSelector(state => state.auth);
    const sideBarLayout = adminNavigation;

    return (
        <>
        <div className={`${open ? 'w-64 p-5':'w-20 p-4'} bg-custom-gradient h-screen pt-8 fixed duration-300 ease-in-out`}>
            {/* Toogle button  */}
                <div className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center
                ${open && "rotate-180"} transition-all ease-in-out duration-300`}
                onClick={()=>setOpen(!open)}
                >
            {open ? <TbLayoutSidebarLeftExpand />:<TbLayoutSidebarLeftCollapse />}
        </div>
            {/* Logo and Title Button */}
                <div className={`flex items-center ${!open && "w-full justify-center"}`}>
                    <RiAdminFill className='text-white text-2xl' />
                    <h1 className={`text-white origin-left font-semibold text-xl ml-4 duration-200 ease-in-out
                    ${!open && "w-0 scale-0"}`}>
                        Admin Panel
                    </h1>
                </div>
                {/* sidebar item section  */}
                <div className='pt-12 space-y-5'>
                    {sideBarLayout.map((item) => (
                        <li key={item.name}>
                            <Link to={item.href} className={classNames(
                                pathname === item.href ? 'bg-custom-blue text-white' : 'text-gray-400 hover:bg-gray hover:text-white',
                                'group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6'
                            )}>
                                <div className={`flex items-center ${!open && "w-full justify-center"}`}>
                                <item.icon className='text-white text-2xl' />
                                <h1 className={`text-white origin-left text-base ml-4 duration-200 ease-in-out
                                ${!open && "w-0 scale-0"}`}>
                                {item.name}
                                </h1>
                                </div>
                            </Link>
                        </li>
                    ))}
                </div>
        </div>
            
        </>
    );
}

export default SideBar;