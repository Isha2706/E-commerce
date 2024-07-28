import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#FFFBEB',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
};

export default function UserDataTable({ open, setOpen, setOpenSnackBar }) {
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(null);
    const [file, setFile] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setFormData({});
        setEdit(false);
        setFile(null);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/getAllUsers`);
            const newRows = response.data.data.map((item, i) => ({ ...item, id: i + 1 }));
            setRows(newRows);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSwitch = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            if (file) {
                formDataToSend.append('userImage', file);
            }

            if (edit) {
                await axios.put(`${import.meta.env.VITE_API_URI}/users/updateUser/${formData._id}`, formData);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URI}/users/newUser`, formDataToSend);
            }
            console.log("formDataToSend: ", formDataToSend);
            console.log("formData._id: ", formData._id);

            setOpenSnackBar(true);
            handleClose();
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditClick = (data) => {
        setEdit(true)
        setFormData(data);
        setOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URI}/users/deleteUser/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'userImage',
            headerName: 'Profile',
            width: 80,
            renderCell: (params) => (
                <img
                    src={`${import.meta.env.VITE_API_URI}/${params.row.userImage}`}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
            ),
        },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 240 },
        { field: 'contactNumber', headerName: 'Contact Number', width: 160 },
        {
            field: 'password',
            headerName: 'Password',
            width: 130,
            renderCell: () => <div className="font-mono">•••••</div>
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
            renderCell: (params) => (
                <div className={`px-2 text-center py-1 rounded-full text-xs font-medium ${params.row.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {params.row.status ? "Active" : "Inactive"}
                </div>
            )
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <button
                        onClick={() => handleEditClick(params.row)}
                        className="p-1 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors duration-200"
                    >
                        <CiEdit className='text-xl' />
                    </button>
                    <button
                        onClick={() => handleDelete(params.row._id)}
                        className="p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors duration-200"
                    >
                        <MdDelete className='text-xl' />
                    </button>
                </div>
            )
        },
    ];

    if (loading) {
        return (
            <div className='h-[69vh] flex justify-center items-center'>
                <CircularProgress style={{ color: '#EAB308' }} />
            </div>
        )
    }

    return (
        <div className="h-[430px] w-full bg-white shadow-lg rounded-lg overflow-hidden" >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                        alignContent: 'center',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row': {
                        '&:nth-of-type(odd)': {
                            backgroundColor: '#FFFBEB',
                        },
                        '&:hover': {
                            backgroundColor: '#FDE68A',
                        },
                    },
                }}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4 text-2xl font-bold text-yellow-800">
                        {edit ? "Edit User" : "Add User"}
                    </Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                                name="firstName"
                                onChange={handleChange}
                                value={formData.firstName || ""}
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                                name="lastName"
                                onChange={handleChange}
                                value={formData.lastName || ""}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                                name="email"
                                onChange={handleChange}
                                value={formData.email || ""}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                                name="password"
                                onChange={handleChange}
                                value={formData.password || ""}
                            />
                            <input
                                type="number"
                                placeholder="Contact Number"
                                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                                name="contactNumber"
                                onChange={handleChange}
                                value={formData.contactNumber || ""}
                            />
                            <div className="col-span-2 flex items-center justify-center bg-yellow-100 p-3 rounded-md">
                                <div className="flex items-center">
                                    <Switch
                                        checked={formData.status || false}
                                        name="status"
                                        onChange={handleSwitch}
                                        color="warning"
                                    />
                                    <span className="ml-2 text-yellow-700">{formData.status ? "Active" : "Inactive"}</span>
                                </div>
                            </div>
                            {!edit && (
                                <div className="col-span-2">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 w-full"
                                    />
                                </div>

                            )
                            }
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 font-medium text-lg"
                        >
                            {edit ? "Update User" : "Add User"}
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}   