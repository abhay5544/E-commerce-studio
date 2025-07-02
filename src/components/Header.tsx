import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search,   
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  Crown,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useApp();
  const navigate = useNavigate();

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Bridal', path: '/products?category=bridal' },
    { name: 'Kurti', path: '/products?category=kurti' },
    { name: 'Dress', path: '/products?category=dress' },
    { name: 'Blouse', path: '/products?category=blouse' },
    { name: "Men's Wear", path: '/products?category=mens' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-navy-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <p>Free shipping on orders above ₹1999</p>
            <div className="flex items-center space-x-4">
              <span>Call: +91 0000000000</span>
              {/* Admin Login - Only show admin link, no customer login required */}
              {state.isAdmin ? (
                <Link to="/admin" className="hover:text-rose-300 transition-colors">
                  Admin Panel
                </Link>
              ) : (
                <Link to="/account" className="hover:text-rose-300 transition-colors flex items-center space-x-1">
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-rose-600 group-hover:text-rose-700 transition-colors" />
            <span className="text-2xl font-serif font-bold text-navy-800 group-hover:text-navy-900 transition-colors">
              Elegant Attire
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-rose-600 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-rose-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex justify-center space-x-8 py-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200 relative group"
              >
                {category.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;