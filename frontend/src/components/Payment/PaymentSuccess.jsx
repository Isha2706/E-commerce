import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';
import { FaCheckCircle, FaShoppingBag, FaClipboardList } from 'react-icons/fa';

const PaymentSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-yellow-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-5xl text-green-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-green-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-700 mb-8 text-lg">
                    Thank you for your purchase. Your order is being processed and will be on its way soon!
                </p>
                <div className="space-y-4">
                    <Link 
                        to="/" 
                        className=" w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                    >
                        <FaShoppingBag className="mr-2" />
                        Continue Shopping
                    </Link>
                    <Link 
                        to="/myorder" 
                        className=" w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                    >
                        <FaClipboardList className="mr-2" />
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;