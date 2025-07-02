import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { state } = useApp();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const foundOrder = state.orders.find(o => o.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId, state.orders]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const trackingSteps = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been placed and confirmed',
      icon: CheckCircle,
      completed: true,
      timestamp: order.createdAt,
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'We are preparing your items for shipment',
      icon: Package,
      completed: ['processing', 'shipped', 'out_for_delivery', 'delivered'].includes(order.status),
      timestamp: new Date(order.createdAt.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Your order has been shipped and is on its way',
      icon: Truck,
      completed: ['shipped', 'out_for_delivery', 'delivered'].includes(order.status),
      timestamp: new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000), // 1 day later
    },
    {
      id: 'out_for_delivery',
      title: 'Out for Delivery',
      description: 'Your order is out for delivery',
      icon: MapPin,
      completed: ['out_for_delivery', 'delivered'].includes(order.status),
      timestamp: new Date(order.createdAt.getTime() + 6 * 24 * 60 * 60 * 1000), // 6 days later
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Your order has been delivered successfully',
      icon: CheckCircle,
      completed: order.status === 'delivered',
      timestamp: order.estimatedDelivery,
    },
  ];

  const currentStepIndex = trackingSteps.findIndex(step => step.id === order.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">Order #{order.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h2>
              
              <div className="space-y-8">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : index === currentStepIndex + 1
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${
                          step.completed ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h3>
                        {step.completed && step.timestamp && (
                          <span className="text-sm text-gray-500">
                            {step.timestamp.toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                      
                      {/* Progress Line */}
                      {index < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-4 ml-5 ${
                          step.completed ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Estimated Delivery */}
              {order.estimatedDelivery && order.status !== 'delivered' && (
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Estimated Delivery</span>
                  </div>
                  <p className="text-blue-700 mt-1">
                    {order.estimatedDelivery.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium">#{order.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tracking Number</span>
                  <span className="font-medium">{order.trackingNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-lg">₹{order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                </div>
              </div>

              {/* Contact Support */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+91 9876543210</span>
                  </a>
                  <a
                    href="mailto:support@elegantattire.com"
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                    <span>support@elegantattire.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;