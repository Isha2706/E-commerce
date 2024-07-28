import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/slices/cartSlice';
// import { addToWishlist } from '../../redux/slices/wishlistSlice';
import { fetchProducts, STATUES } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { HeartIcon as HeartOutline, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const categories = [
    { name: 'Skincare', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { name: 'Makeup', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { name: 'Haircare', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { name: 'Fragrance', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
];

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [randomizedProducts, setRandomizedProducts] = useState([]);
    const { products, status } = useSelector((state) => state.product);
    // const wishlist = useSelector((state) => state.wishlist);
    // const [wishlistItems, setWishlistItems] =("")

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const shuffled = [...products].sort(() => Math.random() - 0.5);
            setRandomizedProducts(shuffled);
        }
    }, [products]);

    const handleAddToCart = (data) => {
        dispatch(add(data));
    };

    // const isInWishlist = (itemId) => {
    //     return wishlistItems && wishlistItems.some(wishlistItem => wishlistItem._id === itemId);
    // };
    
    // const handleToggleWishlist = (item) => {
    //     if (wishlistItems && wishlistItems.some(wishlistItem => wishlistItem._id === item._id)) {
    //         dispatch(removeFromWishlist(item._id));
    //     } else {
    //         dispatch(addToWishlist(item));
    //     }
    // };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (status === STATUES.LOADING) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='text-3xl font-bold text-yellow-600 animate-pulse'>Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-rose-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-yellow-600 text-center">Beauty Haven</h1>

                {/* Categories Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-rose-600">Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <div key={category.name} className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group">
                                <img src={category.image} alt={category.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Products Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-rose-600">Featured Products</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                        {randomizedProducts?.map((item) => (
                            <div
                                key={item._id}
                                className='bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl'
                            >
                                <div
                                    onClick={() => handleProductClick(item._id)}
                                    className='cursor-pointer'
                                >
                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                                        <img
                                            src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                            alt={item.productName}
                                            className='object-cover object-center w-full h-48'
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className='text-sm font-semibold text-gray-800 line-clamp-2'>{item.productName}</h4>
                                        <p className='text-yellow-600 mt-2 font-bold'>
                                            ₹{item.productPrice}
                                        </p>
                                    </div>
                                </div>
                                <div className='px-4 pb-4 flex space-x-2'>
                                    {/* <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleWishlist(item);
                                        }}
                                        className="flex-1 rounded-full font-semibold text-rose-600 hover:text-rose-700 transition-colors duration-300"
                                    >
                                        {isInWishlist(item._id) ? (
                                            <HeartSolid className="h-6 w-6 inline-block" />
                                        ) : (
                                            <HeartOutline className="h-6 w-6 inline-block" />
                                        )}
                                    </button> */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className={`flex-1 py-2 px-3 rounded-full font-semibold transition-colors duration-300 ${item.status
                                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        disabled={!item.status}
                                    >
                                        <ShoppingBagIcon className="h-5 w-5 inline-block mr-1" />

                                        {item.status ? 'Add' : 'Out of stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Products;