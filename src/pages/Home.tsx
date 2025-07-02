import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  HeadphonesIcon,
  Star,
  ArrowRight,
  Crown,
  Sparkles
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockProducts';

const Home: React.FC = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Initialize products
    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  const featuredProducts = state.products.filter(product => product.featured);
  const categories = [
    {
      name: 'Bridal Collection',
      description: 'Exquisite bridal wear for your special day',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      path: '/products?category=bridal',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      name: 'Kurti Collection',
      description: 'Comfortable and stylish everyday wear',
      image: 'https://images.pexels.com/photos/9588113/pexels-photo-9588113.jpeg',
      path: '/products?category=kurti',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Designer Dresses',
      description: 'Elegant dresses for every occasion',
      image: 'https://images.pexels.com/photos/9588005/pexels-photo-9588005.jpeg',
      path: '/products?category=dress',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: "Men's Collection",
      description: 'Premium ethnic wear for men',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      path: '/products?category=mens',
      gradient: 'from-gray-700 to-gray-900'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-800/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg)'
          }}
        ></div>
        
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Crown className="h-16 w-16 text-rose-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
            Elegant Attire
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
            Where Tradition Meets Modern Elegance
          </p>
          <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto animate-slide-up">
            Discover our exquisite collection of bridal wear, designer outfits, and premium fashion pieces 
            crafted with love and attention to detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link 
              to="/products" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Shop Now</span>
            </Link>
            <Link 
              to="/products?category=bridal" 
              className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Bridal Collection</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Free delivery on orders above ₹1999'
              },
              {
                icon: Shield,
                title: 'Quality Guarantee',
                description: 'Premium fabrics and craftsmanship'
              },
              {
                icon: HeadphonesIcon,
                title: '24/7 Support',
                description: 'Dedicated customer service team'
              },
              {
                icon: Star,
                title: 'Trusted Brand',
                description: 'Thousands of happy customers'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collections designed for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2 group-hover:scale-110 transition-transform">
                      {category.name}
                    </h3>
                    <p className="text-lg opacity-90 mb-4">{category.description}</p>
                    <div className="flex items-center justify-center space-x-2 group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold">Explore Collection</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections from our premium collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-navy-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-navy-900 transition-colors transform hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the latest updates on new arrivals, exclusive offers, and fashion trends
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;