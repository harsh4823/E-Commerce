import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from './Backdrop';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import {BiUser} from "react-icons/bi"
import { MdOutlineShoppingCart } from 'react-icons/md';
import {IoExitOutline} from "react-icons/io5"

const UserMenu = ({user}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    };
    
    const logoutHandler = () => {
        handleClose();
        console.log('logout');
        
    }

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
            width : "400px"
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
                'aria-labelledby': 'basic-button',
                sx : {width:160}
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
              <MenuItem className='flex gap-2' onClick={logoutHandler}>
                  <div className='flex gap-2 w-full font-semibold items-center bg-button-gradient px-4 py-1 
                     text-white rounded-sm'>
                 <IoExitOutline className='text-xl'/> <span className='font-bold text-[16px] mt-1'>LogOut</span>
                     </div>
              </MenuItem>
      </Menu>
      {open && <Backdrop/>}
    </div>
  );
}

export default UserMenu;