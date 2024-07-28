import React from 'react';
import { remove, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { role, auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const totalSum = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const handleCheckout = async () => {
        if (totalSum === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }

        if (auth) {
            if (role === "admin") {
                return alert("Please Login with Customer Account")
            }
            navigate("/checkout")
        } else {
            alert("Please Login...")
        }
    }

    const reversedCartItems = [...cartItems].reverse();

    return (
        <div className="bg-gradient-to-r from-yellow-50 to-rose-50 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-8 text-yellow-600 select-none">Cart</h1>
                {reversedCartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-lg text-center select-none">
                        <p className="text-2xl font-bold text-yellow-600 select-none uppercase">Your beauty cart is empty.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto pb-4 container select-none">
                        <div className="flex gap-6 px-9 items-center flex-wrap">
                            {reversedCartItems.map((item) => (
                                <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex-shrink-0 w-64">
                                    <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} alt={item.productName} className="w-full h-48 object-cover select-none" />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-rose-800 mb-2 line-clamp-1">{item.productName}</h2>
                                        <p className="text-yellow-600 mb-2 capitalize"><span className="font-bold">Category:</span> {item.productCategory}</p>
                                        <p className="text-xl font-bold text-rose-500 mb-2">₹{item.productPrice}</p>
                                        <div className="flex items-center justify-between mb-2">
                                            <button onClick={() => handleDecrease(item._id)} className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-lg font-bold text-rose-700 hover:bg-yellow-300 transition-colors">-</button>
                                            <span className="text-lg font-semibold">{item.quantity}</span>
                                            <button onClick={() => handleIncrease(item._id)} className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-lg font-bold text-rose-700 hover:bg-yellow-300 transition-colors">+</button>
                                        </div>
                                        <button onClick={() => handleRemove(item._id)} className="w-full px-4 py-2 bg-rose-500 text-white font-semibold rounded-full hover:bg-rose-600 transition-colors">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-8 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-center select-none">
                    <h2 className="text-3xl font-bold text-rose-800 mb-4 md:mb-0">Total: <span className="text-yellow-500">₹{totalSum.toFixed(2)}</span></h2>
                    <button
                        className={`px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-colors ${totalSum === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-yellow-400 hover:bg-yellow-500'
                            // : 'bg-gradient-to-r from-yellow-400 to-rose-400 hover:from-yellow-500 hover:to-rose-500'
                            }`}
                        onClick={handleCheckout}
                        disabled={totalSum === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;