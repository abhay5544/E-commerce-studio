import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
      },
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in">
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-rose-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
              {discount}% OFF
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-navy-800 text-white px-2 py-1 text-xs font-semibold rounded-full">
              Featured
            </div>
          )}

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
            <Heart className="h-4 w-4 text-gray-600 hover:text-rose-600" />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-navy-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-navy-900"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-sm text-gray-500 capitalize mb-1">{product.category}</p>
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Size Options Preview */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-600"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{product.sizes.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            {product.inStock ? (
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;