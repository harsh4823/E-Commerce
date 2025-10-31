import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from './Backdrop';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {BiUser} from "react-icons/bi"
import { MdOutlineShoppingCart } from 'react-icons/md';
import {IoExitOutline} from "react-icons/io5"
import { useDispatch } from 'react-redux';
import { deleteUser, logOutUser } from '../store/action/authAction';
import { FaRegTrashAlt, FaUserShield } from "react-icons/fa";
import toast from 'react-hot-toast';

const UserMenu = ({user}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const open = Boolean(anchorEl);
  const [isLoader, setLoader] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    };
    
    const logoutHandler = () => {
      dispatch(logOutUser(navigate,dispatch));
  }
  
  const deleteUserHandler = () => {
    dispatch(deleteUser(toast, navigate,setLoader));
    
  }

  const isAdmin = user.roles.some(item => item === "ROLE_ADMIN");

  return (
    <div className='relative z-30'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full 
              hover:shadow-md  transition text-slate-700'
      >
              <Avatar>{ user?.username.charAt(0)}</Avatar>
      </Button>
          <Menu
              sx={{
            width : "500px"
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
                'aria-labelledby': 'basic-button',
                sx : {width:180}
          },
        }}
          >
        <Link to={'/profile'}>
                  <MenuItem className="flex gap-2" onClick={handleClose}>
                      <BiUser className='text-xl' /><span className='font-bold text-[16px] mt-1'>{ user?.username}</span>
                  </MenuItem>
              </Link>
              <Link to={"/cart"}>
                  <MenuItem onClick={handleClose} className='flex gap-2'>
                     <MdOutlineShoppingCart className='text-xl'/> <span className='font-semibold'>My Orders</span>
                  </MenuItem>
              </Link>

              {isAdmin &&
              <Link to={"/admin"}>
              <MenuItem onClick={handleClose} className='flex gap-2'>
                <FaUserShield className='text-xl' /> <span className='font-semibold'>Admin Panel</span>
              </MenuItem>
              </Link>
              }
              <MenuItem className='flex gap-2' onClick={logoutHandler}>
                  <div className='flex gap-2 w-full font-semibold items-center bg-button-gradient px-4 py-1 
                     text-white rounded-sm'>
                 <IoExitOutline className='text-xl'/> <span className='font-bold text-[16px] mt-1'>LogOut</span>
                     </div>
              </MenuItem>
        <MenuItem className='flex gap-2' onClick={deleteUserHandler}>
          <div className='text-rose-500 flex justify-center items-center gap-2 hover:bg-rose-50'>
              <FaRegTrashAlt/> <span className='text-[16px] mt-1'>Delete Account</span>
          </div>
              </MenuItem>
      </Menu>
      {open && <Backdrop/>}
    </div>
  );
}

export default UserMenu;