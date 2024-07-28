import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productSlice';

const heroImage = 'https://i.pinimg.com/564x/36/f5/2f/36f52fe3f5c3737e4175313ac35d2752.jpg';
const categoryImages = {
    skincare: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    makeup: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    haircare: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    fragrance: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    nailcare: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
};

const categories = [
    { name: 'Skincare', image: categoryImages.skincare, id: 'skincare' },
    { name: 'Makeup', image: categoryImages.makeup, id: 'makeup' },
    { name: 'Hair Care', image: categoryImages.haircare, id: 'haircare' },
    { name: 'Fragrance', image: categoryImages.fragrance, id: 'fragrance' },
    { name: 'Nail Care', image: categoryImages.nailcare, id: 'nailcare' },
];

const CategoryCard = ({ category, onSelect }) => (
    <div onClick={() => onSelect(category.id)} className="cursor-pointer group">
        <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <img src={category.image} alt={category.name} className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-600 via-yellow-500/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">{category.name}</h3>
                <p className="text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore products</p>
            </div>
        </div>
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts()).catch(error => {
            console.error('Failed to fetch products:', error);
            // You might want to dispatch an action to set an error state here
        });
    }, [dispatch]);

    const handleCategorySelect = (categoryId) => {
        console.log(categoryId);
        navigate(`/products/${categoryId}`);
    };

    const featuredProducts = products.slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-50 to-rose-50">
            <div className="container mx-auto px-4 py-5 flex-grow select-none">
                {/* Hero Section */}
                <div className="relative mb-24 rounded-2xl overflow-hidden shadow-2xl">
                    <img src={heroImage} alt="Hero" className="w-full h-[60vh] sm:h-[79vh] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/70 to-rose-500/70 flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 sm:mb-8 text-center leading-tight">Discover Your Beauty</h1>
                        <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12 text-center max-w-3xl font-light">Explore our curated collection of premium beauty products</p>
                        <Link
                            to="/products"
                            className="bg-white text-yellow-700 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mb-24">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center text-brown-800">Shop by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                        {categories.map((category, index) => (
                            <CategoryCard key={index} category={category} onSelect={handleCategorySelect} />
                        ))}
                    </div>
                </div>

                {/* Featured Products Section */}
                <div className="mb-24">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center text-brown-800">Featured Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product) => (
                                <Link
                                    to={`/product/${product._id}`}
                                    key={product._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <img
                                        src={`${import.meta.env.VITE_API_URI}/${product.productImage}`}
                                        alt={product.name}
                                        className="w-full h-48 sm:h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-rose-600 mb-2 line-clamp-1">{product.productName}</h3>
                                        <p className="text-rose-600 text-2xl font-bold">${product.productPrice}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;