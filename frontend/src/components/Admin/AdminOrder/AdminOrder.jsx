import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OrderDataTable from './OrderDataTable'

const AdminOrder = () => {
    const [open, setOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpenSnackBar(false);

    return (
        <div className="bg-yellow-50 min-h-[87vh]">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center p-6 border-b border-yellow-200'>
                    <h1 className='text-3xl font-bold text-yellow-800'>
                        Order Data
                    </h1>
                </div>
                <div className='bg-white shadow-lg rounded-lg mt-6'>
                    <OrderDataTable open={open} setOpen={setOpen} setOpenSnackBar={setOpenSnackBar} />
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
                            backgroundColor: '#EAB308', // Yellow-500
                            color: '#713F12' // Yellow-900 
                        }}
                    >
                        Order Updated Successfully
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default AdminOrder