import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaPhone, FaAddressCard, FaCity, FaMapMarkerAlt, FaMapPin, FaShoppingCart } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderDetails = {
            userId: user._id,
            customerName: formData.get('customerName'),
            customerContactNumber: formData.get('customerContactNumber'),
            address: `${formData.get('address')},${formData.get("city")},${formData.get("state")}`,
            pinCode: formData.get('pinCode'),
            products: cartItems,
        };
        try {
            const stripe = await loadStripe(`${import.meta.env.VITE_API_PUBLISHABLE_KEY}`);
            const body = orderDetails;

            const response = await axios.post(`${import.meta.env.VITE_API_URI}/create-checkout-session`, body);

            const result = stripe.redirectToCheckout({
                sessionId: response.data.id
            });
            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.log(error);
            alert('Payment failed. Please try again.');
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaShoppingCart className="mr-2 text-pink-600" />
                                Your Cart
                            </h2>
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} alt={item.productName} className="w-16 h-16 object-cover rounded-md" />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{item.productName}</h3>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900">₹{(item.productPrice * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="mt-6 text-right">
                                <p className="text-2xl font-bold text-gray-900">Total: ₹{totalAmount.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <form ref={formRef} onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <FaUser className="mr-4 text-pink-600" />
                                    <input type="text" name="customerName" placeholder="Your Name" required className="flex-1 p-2 focus:outline-none" />
                                </div>
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <FaPhone className="mr-4 text-pink-600" />
                                    <input type="text" name="customerContactNumber" placeholder="Phone Number" required className="flex-1 p-2 focus:outline-none" />
                                </div>
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <FaAddressCard className="mr-4 text-pink-600" />
                                    <input type="text" name="address" placeholder="Address" required className="flex-1 p-2 focus:outline-none" />
                                </div>
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <FaCity className="mr-4 text-pink-600" />
                                    <input type="text" name="city" placeholder="City" required className="flex-1 p-2 focus:outline-none" />
                                </div>
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <FaMapMarkerAlt className="mr-4 text-pink-600" />
                                    <input type="text" name="state" placeholder="State" required className="flex-1 p-2 focus:outline-none" />
                                </div>
                                <div className="flex items-center border-b border-gray-300 py-2">
                                    <FaMapPin className="mr-4 text-pink-600" />
                                    <input type="text" name="pinCode" placeholder="Pin Code" required className="flex-1 p-2 focus:outline-none" />
                                </div>
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 w-full text-lg font-semibold transition duration-300 ease-in-out">
                                    Complete Purchase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;