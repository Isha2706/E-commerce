import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../../../redux/slices/productSlice';
import { FaUpload } from 'react-icons/fa';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

export default function ProductDataTable({ open, setOpen, setOpenSnackBar }) {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');

  const dispatch = useDispatch();
  const { products, status, isSuccess } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : 'No file chosen');
    handleChange(e);
  }

  useEffect(() => {
    if (products) {
      const newRows = products.map((item, i) => ({ ...item, id: i + 1 }));
      setRows(newRows);
    }
  }, [products]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setEdit(false);
      setFormData({});
    }
  }, [isSuccess, setOpen]);

  const handleClose = () => {
    setOpen(false);
    setFormData({});
    setEdit(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const handleSwitch = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("productCategory", formData.productCategory);
    data.append("productDesc", formData.productDesc);
    data.append("productImage", formData.productImage);
    
    if (edit) {
      dispatch(updateProduct({ id: formData._id, updatedProduct: formData }));
    } else {
      dispatch(createProduct(data));
    }
    setOpenSnackBar(true);
  };

  const handleEditClick = (data) => {
    setEdit(true);
    setFormData(data);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      setOpenSnackBar(true);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'image', headerName: 'Image', width: 100, 
        renderCell: (params) => (
        <img
          src={`${import.meta.env.VITE_API_URI}/${params.row.productImage}`}
          alt={params.row.productName}
          className='w-10 h-10 rounded-full object-cover transition-transform duration-200 ease-in-out hover:scale-150'
        />
      )
    },
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'productPrice', headerName: 'Price', width: 130, renderCell: (params) => `₹${params.value}` },
    { field: 'productCategory', headerName: 'Category', width: 160 },
    { field: 'status', headerName: 'Status', width: 120, 
        renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${params.row.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {params.row.status ? "In-Stock" : "Out of Stock"}
        </span>
      )
    },
    { field: 'Action', headerName: 'Action', width: 120, 
        renderCell: (params) => (
        <div className='flex gap-2'>
          <button onClick={() => handleEditClick(params.row)} className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors duration-200">
            <CiEdit className='text-xl' />
          </button>
          <button onClick={() => handleDelete(params.row._id)} className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors duration-200">
            <MdDelete className='text-xl' />
          </button>
        </div>
      )
    },
  ];

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress style={{ color: '#EAB308' }} />
      </div>
    );
  }

  return (
    <div className="h-[425px] w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
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
        <Box sx={{...modalStyle, bgcolor: '#FFFBEB'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4 text-2xl font-bold text-yellow-800">
            {edit ? "Edit Product" : "Add Product"}
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="col-span-2 p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                name="productName"
                onChange={handleChange}
                value={formData.productName || ""}
              />
              <input
                type="text"
                placeholder="Product Price"
                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                name="productPrice"
                onChange={handleChange}
                value={formData.productPrice || ""}
              />
              <input
                type="text"
                placeholder="Product Category"
                className="p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                name="productCategory"
                onChange={handleChange}
                value={formData.productCategory || ""}
              />
              <textarea
                placeholder="Product Description"
                className="col-span-2 p-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                name="productDesc"
                onChange={handleChange}
                value={formData.productDesc || ""}
                rows="3"
              />
              <div className="col-span-2">
                <input
                  type="file"
                  name="productImage"
                  id="productImage"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="productImage"
                  className="cursor-pointer bg-yellow-200 text-yellow-900 rounded-md py-3 px-4 w-full inline-flex items-center justify-between border border-yellow-600 hover:bg-yellow-600 transition duration-300 ease-in-out"
                >
                  <span className="flex items-center">
                    <FaUpload className="mr-2" />
                    Choose File
                  </span>
                  <span className="text-yellow-800 text-sm truncate max-w-[200px]">
                    {fileName}
                  </span>
                </label>
              </div>
              {edit && (
                <div className="col-span-2 flex items-center justify-between bg-yellow-100 p-3 rounded-md">
                  <span className="font-medium text-yellow-800">Product Status:</span>
                  <div className="flex items-center">
                    <Switch
                      checked={formData.status || false}
                      name="status"
                      onChange={handleSwitch}
                      color="warning"
                    />
                    <span className="ml-2 text-yellow-700">{formData.status ? "In-Stock" : "Out of Stock"}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 font-medium text-lg"
            >
              {edit ? "Update Product" : "Add Product"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}