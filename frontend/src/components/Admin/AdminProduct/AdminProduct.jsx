import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProductDataTable from './ProductDataTable';

const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <div className="bg-yellow-50 min-h-[87vh]">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center p-6 border-b border-yellow-200'>
          <h1 className='text-3xl font-bold text-yellow-600'>
            Product Management
          </h1>
          <button
            className='bg-yellow-500 text-white px-6 py-2 rounded-md font-medium hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'
            onClick={handleOpen}
          >
            Add New Product
          </button>
        </div>
        <div className='bg-white shadow-md rounded-lg mt-6'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-yellow-600 mb-4'>Product Inventory</h2>
            <ProductDataTable open={open} setOpen={setOpen} setOpenSnackBar={setOpenSnackBar} />
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          open={openSnackBar}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ 
              width: '100%',
              backgroundColor: '#EAB308', // Yellow-600
              '& .MuiAlert-icon': {
                color: '#FEF9C3' // Yellow-100
              }
            }}
          >
            Product Updated Successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default AdminProduct;