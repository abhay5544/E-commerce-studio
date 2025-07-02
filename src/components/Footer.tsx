import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-rose-400" />
              <span className="text-2xl font-serif font-bold">Elegant Attire</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your destination for premium fashion and bridal wear. We bring you the finest collection 
              of traditional and contemporary clothing with exceptional quality and craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=bridal" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=kurti" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Kurti Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=dress" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Dress Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=mens" className="text-gray-300 hover:text-rose-400 transition-colors">
                  Men's Wear
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-rose-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-400" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-400" />
                <span className="text-gray-300">info@elegantattire.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-rose-400 mt-1" />
                <span className="text-gray-300">
                  123 Fashion Street,<br />
                  Delhi, India - 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Service Links */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link to="/shipping" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Shipping Info
            </Link>
            <Link to="/returns" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Returns & Exchange
            </Link>
            <Link to="/size-guide" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Size Guide
            </Link>
            <Link to="/care" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Care Instructions
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Terms & Conditions
            </Link>
            <Link to="/faq" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-rose-400 transition-colors text-sm">
              Contact Support
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Elegant Attire. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-rose-400" /> for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;