import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = products?.find(product => product._id === productId);
        if (product) {
            setSelectedProduct(product);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, productId, navigate, status]);

    const handleClick = () => {
        if (selectedProduct) {
            dispatch(add(selectedProduct));
        }
    };

    if (status === 'loading') return <div className="flex items-center justify-center h-screen text-3xl font-bold text-yellow-700">Loading...</div>
    if (status === 'error') return <div className="flex items-center justify-center h-screen text-3xl font-bold text-red-600">Error loading product.</div>
    if (!selectedProduct) return <div className="flex items-center justify-center h-screen text-3xl font-bold text-yellow-700">Product not found.</div>

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-rose-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full mx-auto">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <div className="relative pb-[100%]">
                            <img
                                className="absolute inset-0 w-full h-full object-cover pl-6"
                                src={`${import.meta.env.VITE_API_URI}/${selectedProduct.productImage}`}
                                alt={selectedProduct.productName}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="uppercase tracking-wide text-sm text-rose-500 font-semibold mb-2">
                            {selectedProduct.productCategory}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {selectedProduct.productName}
                        </h1>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            {selectedProduct.productDesc}
                        </p>
                        <div className="flex items-center mb-6">
                            <span className="text-3xl font-bold text-rose-600 mr-2">₹{selectedProduct.productPrice}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedProduct.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {selectedProduct.status ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <button
                            onClick={handleClick}
                            className={`w-full py-4 px-8 text-lg font-semibold rounded-full transition-all duration-300 ${selectedProduct.status
                                    ? 'bg-yellow-400 hover:bg-yellow-500 text-rose-800 transform hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!selectedProduct.status}
                        >
                            <ShoppingBagIcon className="h-5 w-5 inline-block mr-1" />
                            {selectedProduct.status ? 'Add to Beauty Collection' : 'Currently Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;