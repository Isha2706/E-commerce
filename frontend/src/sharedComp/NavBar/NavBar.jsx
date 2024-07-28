import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { Avatar, Badge, IconButton, Menu, MenuItem, styled, Tooltip, InputBase } from '@mui/material';
import { CiBoxes, CiShoppingCart, CiUser, CiHeart, CiSearch } from 'react-icons/ci';
import { MdLogout } from 'react-icons/md';
import LOGO from '../../assets/LOGO.png';
import Hamburger from 'hamburger-react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

// const [isOpen, setOpen] = useState(false);

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  // const { wishlistItems } = useSelector((state) => state.wishlist);
  const { auth, role, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className='bg-gradient-to-r from-yellow-100 to-rose-100 scroll-smooth shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3 flex flex-wrap justify-between items-center'>
        <Link to="/" className='transition duration-300 h-[60px]'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-yellow-800 italic'>Glam Up</h1>
        </Link>

        {/* Search Bar */}
        <div className='flex-1 max-w-xl mx-4 my-2 order-3 md:order-2 w-full md:w-auto'>
          <div className='relative'>
            <InputBase
              placeholder="Search beauty products..."
              className='w-full bg-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-300'
            />
            <CiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500' size={20} />
          </div>
        </div>
        
        <div className='flex items-center space-x-4 order-2 md:order-3'>

            {/* wishlist */}
          {/* <Tooltip title="Wishlist">
            <IconButton aria-label="wishlist" onClick={() => navigate("/wishlist")}>
              <StyledBadge badgeContent={wishlistItems.length} color="secondary">
                <CiHeart className='text-rose-500' size={24} />
              </StyledBadge>
            </IconButton>
          </Tooltip> */}

          {/* cart button */}
          <Tooltip title="Cart">
            <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
              <StyledBadge badgeContent={cartItems.length} color="secondary">
                <CiShoppingCart className='text-yellow-600' size={24} />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          
          {auth ? (
            <div>
              <Tooltip title="Profile">
                <IconButton onClick={handleClick}>
                  <Avatar
                    alt={`${user?.name || user?.FirstName}`}
                    src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
              >
                <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>
                  <Avatar src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`} /> Profile
                </MenuItem>
                {role === "user" ? (
                  <MenuItem onClick={() => { handleClose(); navigate("/myorder"); }}>
                    <CiShoppingCart className='mr-2' /> My Order
                  </MenuItem>
                ) : (
                  <div>
                    <MenuItem onClick={() => { handleClose(); navigate("/adminuser"); }}>
                      <CiUser className='mr-2' /> Users
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); navigate("/adminorder"); }}>
                      <CiShoppingCart className='mr-2' /> Orders
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); navigate("/adminproduct"); }}>
                      <CiBoxes className='mr-2' /> Products
                    </MenuItem>
                  </div>
                )}
                <MenuItem onClick={handleLogOut}>
                  <MdLogout className='mr-2' /> Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className='space-x-2'>
              <Link to="/login" className='px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition duration-300'>Login</Link>
              <Link to="/signup" className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition duration-300'>Signup</Link>
            </div>
          )}
        </div>
        {/* <Hamburger toggled={isOpen} toggle={setOpen} /> */}
        
      </div>
    </nav>
  );
};

export default NavBar;