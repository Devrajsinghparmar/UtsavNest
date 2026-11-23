'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-ivory-100 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-wide">
                Utsav<span className="text-gold-400">Nest</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Every celebration, all in one place. Discover and book wedding gardens, banquet halls, chefs, decorators, and event essentials across India with complete transparency and verified trust.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Venues & Safe Booking Escrow</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/venues" className="hover:text-gold-400 transition-colors">Wedding Venues & Gardens</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-400 transition-colors">Caterers & Services</Link>
              </li>
              <li>
                <Link href="/package-builder" className="hover:text-gold-400 transition-colors">Custom Package Builder</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">About UtsavNest</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider font-serif">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/venues?type=lawn" className="hover:text-gold-400 transition-colors">Wedding Gardens & Lawns</Link>
              </li>
              <li>
                <Link href="/venues?type=banquet" className="hover:text-gold-400 transition-colors">Party & Banquet Halls</Link>
              </li>
              <li>
                <Link href="/services?category=catering" className="hover:text-gold-400 transition-colors">Master Chefs & Catering</Link>
              </li>
              <li>
                <Link href="/services?category=decoration" className="hover:text-gold-400 transition-colors">Floral & Mandap Decoration</Link>
              </li>
              <li>
                <Link href="/services?category=sound_lighting" className="hover:text-gold-400 transition-colors">Concert Sound & Truss Lighting</Link>
              </li>
              <li>
                <Link href="/services?category=rentals" className="hover:text-gold-400 transition-colors">German Tents & Royal Furniture</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Help */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider font-serif">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>124 Celebration Street, C-Scheme, Jaipur, Rajasthan - 302001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 98765 43210 / 0141-2859400</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>support@utsavnest.in</span>
              </div>

              <div className="pt-3">
                <p className="text-xs text-gray-400 mb-2">Download Our App</p>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 bg-navy-800 rounded border border-navy-700 text-xs font-mono text-gray-200">
                    Google Play
                  </div>
                  <div className="px-3 py-1.5 bg-navy-800 rounded border border-navy-700 text-xs font-mono text-gray-200">
                    App Store
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} UtsavNest Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-gold-400">Privacy Policy</Link>
            <Link href="/about" className="hover:text-gold-400">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gold-400">Cancellation & Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
