import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('No file chosen');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : 'No file chosen');
        handleChange(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/users/signup`, data);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-yellow-100 to-rose-100">
            {/* Left side - Beauty Image and Categories */}
            <div className="md:w-1/2 bg-cover bg-center p-8 flex flex-col  text-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
                <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg ">
                    <h1 className="text-3xl font-bold text-rose-600 mb-4">Discover Your Beauty</h1>
                    <p className="text-gray-800 mb-6">Join our community and explore a world of beauty products tailored just for you.</p>
                    {/* <div className="grid grid-cols-2 gap-4">
                        {['Skincare', 'Makeup', 'Haircare', 'Fragrance'].map((category, index) => (
                            <div key={index} className="bg-gradient-to-r from-yellow-200 to-rose-200 p-3 rounded-lg shadow">
                                <p className="text-gray-800 font-medium">{category}</p>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="md:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                    <div>
                        <div className="flex justify-center">
                            <img src="https://img.icons8.com/color/96/000000/spa-flower.png" alt="Beauty Logo" className="h-20 w-20"/>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your beauty account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to='/login' className="font-medium text-rose-500 hover:text-rose-400 transition duration-150 ease-in-out">
                                Login
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="">
                            <div className='flex gap-2 mb-2'>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            
                                <input
                                    type="text"
                                    name="lastName"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-2'>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex gap-2 mb-2'>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm"
                                    placeholder="Contact No."
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="userImage"
                                        id="userImage"
                                        required
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="userImage"
                                        className="cursor-pointer bg-gradient-to-r from-yellow-200 to-rose-200 text-gray-700 rounded-b-md py-2 px-3 w-full inline-flex items-center justify-between border border-gray-300 hover:from-yellow-300 hover:to-rose-300 transition duration-300 ease-in-out"
                                    >
                                        <span className="flex items-center">
                                            <FaUpload className="mr-2" />
                                            Choose Profile Picture
                                        </span>
                                        <span className="text-gray-600 text-sm truncate max-w-[200px]">
                                            {fileName}
                                        </span>
                                    </label>
                                </div>
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
                                Join the Beauty Community
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;