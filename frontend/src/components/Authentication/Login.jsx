import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { FaArrowRight } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-yellow-100 to-rose-100">
            {/* Left side - Beauty Image */}
            <div className="md:w-1/2 bg-cover bg-center hidden md:block" style={{backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')"}}>
                <div className="h-full flex items-center justify-center bg-black bg-opacity-40">
                    <h1 className="text-4xl font-bold text-white text-center px-6">Discover Your Beauty with Glam Up</h1>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="md:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                    <div>
                        <div className="flex justify-center">
                            <img src="https://img.icons8.com/color/96/000000/spa-flower.png" alt="Beauty Logo" className="h-20 w-20"/>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-rose-500 hover:text-rose-400 transition duration-150 ease-in-out">
                                Join the beauty community
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-yellow-400 to-rose-500 hover:from-yellow-500 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition duration-150 ease-in-out"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FaArrowRight className="h-5 w-5 text-yellow-300 group-hover:text-yellow-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Beauty Product Categories - Mobile View */}
            <div className="md:hidden bg-white p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Beauty Categories</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['Skincare', 'Makeup', 'Haircare', 'Fragrance'].map((category, index) => (
                        <div key={index} className="bg-gradient-to-r from-yellow-200 to-rose-200 p-4 rounded-lg shadow">
                            <p className="text-gray-800 font-medium">{category}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Login;