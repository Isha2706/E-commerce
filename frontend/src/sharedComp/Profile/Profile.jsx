import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { MdOutlineMailOutline, MdPerson, MdLogout, MdPhone, MdShoppingBag, MdFavorite } from 'react-icons/md';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-r from-yellow-50 to-rose-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-5xl mx-auto">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <div className="h-full">
                                <img
                                    className="w-full h-full object-cover"
                                    src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`}
                                    alt={`${user?.name || user?.FirstName}`}
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <div className="mb-6">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{user?.name}</h1>
                                <p className="text-xl text-rose-600 font-semibold">{user?.role}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                <div className="flex items-center text-gray-700">
                                    <MdOutlineMailOutline className="flex-shrink-0 mr-3 h-6 w-6 text-yellow-500" />
                                    <a href={`mailto:${user?.email}`} className="text-rose-800 hover:underline">
                                        {user?.email}
                                    </a>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <MdPhone className="flex-shrink-0 mr-3 h-6 w-6 text-yellow-500" />
                                    <span>{user?.contactNumber || 'Phone not specified'}</span>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <MdPerson className="flex-shrink-0 mr-3 h-6 w-6 text-yellow-500" />
                                    <span>{user?.role}</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Style Preferences</h2>
                                <div className="flex flex-wrap gap-2">
                                    {user?.preferences?.map((pref, index) => (
                                        <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {pref}
                                        </span>
                                    )) || 'No preferences set'}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-rose-400 text-white font-semibold rounded-full shadow-md hover:from-yellow-500 hover:to-rose-500 transition duration-300 ease-in-out flex items-center justify-center"
                            >
                                <MdLogout className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-rose-400 text-white px-8 py-6">
                        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                        <p className="text-gray-100">
                            {user?.bio || 'No bio available. This beauty enthusiast is a person of mystery and style!'}
                        </p>
                    </div>
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shopping Activity</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to={"/cart"} className="bg-gradient-to-r from-yellow-100 to-rose-100 rounded-lg p-4 flex items-center">
                                <MdShoppingBag className="h-10 w-10 text-rose-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">Cart</p>
                                    <p className="text-3xl font-bold text-yellow-600">{cartItems.length || 0}</p>
                                </div>
                            </Link>
                            <Link to={"/myorder"} className="bg-gradient-to-r from-yellow-100 to-rose-100 rounded-lg p-4 flex items-center">
                                <MdFavorite className="h-10 w-10 text-rose-500 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">My Orders</p>
                                    {/* <p className="text-3xl font-bold text-yellow-600">{user?.favoritesCount || 0}</p> */}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;