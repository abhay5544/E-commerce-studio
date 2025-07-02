import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, Eye, Truck, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Account: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'profile' | 'orders' | 'wishlist'>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only admin login - customers don't need accounts
    if (loginForm.email === 'admin@elegantattire.com') {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: loginForm.email,
        role: 'admin' as const,
        phone: '+91 9876543210',
        address: '123 Fashion Street, Delhi, India - 110001'
      };

      dispatch({ type: 'LOGIN', payload: adminUser });
      setActiveTab('profile');
    } else {
      alert('Invalid admin credentials. Only admin login is available here.');
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setActiveTab('login');
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Admin Login
            </h2>
            <p className="text-gray-600 mt-2">
              Access admin panel to manage your store
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="admin@elegantattire.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Login as Admin
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Admin Access:</p>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Email:</strong> admin@elegantattire.com</p>
              <p><strong>Password:</strong> Any password works for demo</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium mb-2">For Customers:</p>
            <div className="text-xs text-green-700">
              <p>No account needed! Shop directly and checkout as guest - just like Meesho!</p>
              <Link to="/products" className="text-green-600 hover:text-green-700 font-medium">
                Start Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-rose-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{state.user?.name}</h3>
                <p className="text-sm text-gray-600">{state.user?.email}</p>
                {state.isAdmin && (
                  <span className="mt-2 inline-block bg-navy-100 text-navy-800 px-3 py-1 text-xs font-semibold rounded-full">
                    Admin
                  </span>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.key
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Admin Profile</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={state.user?.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={state.user?.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={state.user?.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={state.user?.address}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">All Orders</h2>
                  
                  {state.orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No orders found</p>
                      <p className="text-sm text-gray-400 mt-2">Customer orders will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {state.orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600">
                                Placed on {order.createdAt.toLocaleDateString('en-IN')}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 md:mt-0">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <Link
                                to={`/track-order/${order.id}`}
                                className="flex items-center space-x-1 text-rose-600 hover:text-rose-700 text-sm font-medium"
                              >
                                <Truck className="h-4 w-4" />
                                <span>Track Order</span>
                              </Link>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                              <div className="space-y-2">
                                {order.items.slice(0, 2).map((item, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.product.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                {order.items.length > 2 && (
                                  <p className="text-xs text-gray-500">
                                    +{order.items.length - 2} more items
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Order Total</h4>
                              <p className="text-lg font-bold text-gray-900">
                                ₹{order.total.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Wishlist</h2>
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Wishlist feature coming soon</p>
                    <p className="text-sm text-gray-400 mt-2">Customer wishlists will be managed here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;