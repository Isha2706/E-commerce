import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaShoppingCart, FaStore } from 'react-icons/fa';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-400 to-yellow-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                        <FaTimes className="text-5xl text-red-600" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-red-700 mb-4">Order Cancelled</h1>
                <p className="text-gray-700 mb-8 text-lg">
                    You had Cancelled the Order. So, you will get refund in 48 hours.
                </p>
                <div className="space-y-4">
                    <Link
                        to="/cart"
                        className=" w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                    >
                        <FaShoppingCart className="mr-2" />
                        Return to Cart
                    </Link>
                    <Link
                        to="/"
                        className=" w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                    >
                        <FaStore className="mr-2" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;