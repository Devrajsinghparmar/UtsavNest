'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Menu,
  X,
  User,
  ShieldCheck,
  Store,
  CalendarCheck,
} from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { useAuth } from './AuthProvider';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/venues', label: 'Venues' },
    { href: '/services', label: 'Services' },
    { href: '/package-builder', label: 'Packages' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FCFBF7]/95 backdrop-blur-md border-b border-ivory-300 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-navy-900 font-serif">
                Utsav<span className="text-gold-600">Nest</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-emerald-700 font-semibold -mt-1">
                Every celebration, all in one place
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'text-navy-900 bg-ivory-200 font-semibold'
                      : 'text-gray-700 hover:text-gold-700 hover:bg-ivory-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher & Clerk Auth Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/provider"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gold-400 bg-gold-50/80 text-gold-900 hover:bg-gold-100 transition-colors shadow-xs"
            >
              <Store className="w-3.5 h-3.5 text-gold-600" />
              <span>List Your Garden</span>
            </Link>

            {/* Quick Prototype Role Switcher */}
            <div className="bg-ivory-200/80 p-1 rounded-full border border-ivory-300 flex items-center text-xs">
              <button
                onClick={() => setRole('customer')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                  role === 'customer'
                    ? 'bg-emerald-700 text-white font-medium shadow-sm'
                    : 'text-gray-600 hover:text-navy-900'
                }`}
                title="Customer View"
              >
                <User className="w-3 h-3" />
                Customer
              </button>
              <button
                onClick={() => setRole('provider')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                  role === 'provider'
                    ? 'bg-gold-600 text-white font-medium shadow-sm'
                    : 'text-gray-600 hover:text-navy-900'
                }`}
                title="Vendor View"
              >
                <Store className="w-3 h-3" />
                Vendor
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                  role === 'admin'
                    ? 'bg-navy-900 text-white font-medium shadow-sm'
                    : 'text-gray-600 hover:text-navy-900'
                }`}
                title="Admin View"
              >
                <ShieldCheck className="w-3 h-3" />
                Admin
              </button>
            </div>

            {/* Dashboard Quick Links */}
            {role === 'customer' && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-700" />
                My Bookings
              </Link>
            )}
            {role === 'provider' && (
              <Link
                href="/provider"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gold-50 text-gold-800 border border-gold-200 rounded-lg hover:bg-gold-100 transition-colors"
              >
                <Store className="w-3.5 h-3.5 text-gold-700" />
                Vendor Portal
              </Link>
            )}
            {role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                Admin
              </Link>
            )}

            {/* Clerk Authentication Controls */}
            <div className="flex items-center gap-2 pl-2 border-l border-ivory-300">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-xs font-semibold px-3 py-1.5 text-navy-900 hover:text-gold-700 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-xs font-semibold px-4 py-1.5 rounded-full gold-gradient text-white shadow-sm hover:brightness-105 active:scale-95 transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-2">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 ring-2 ring-gold-500',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy-900 rounded-lg hover:bg-ivory-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-ivory-300 bg-[#FCFBF7] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium px-3 py-2 rounded-md hover:bg-ivory-200 text-navy-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-ivory-300">
            <p className="text-xs font-semibold text-gray-500 mb-2">View Role:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setRole('customer');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs text-center rounded-lg border ${
                  role === 'customer' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  setRole('provider');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs text-center rounded-lg border ${
                  role === 'provider' ? 'bg-gold-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Vendor
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs text-center rounded-lg border ${
                  role === 'admin' ? 'bg-navy-900 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full py-2 text-sm font-semibold rounded-lg bg-navy-900 text-white">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full py-2 text-sm font-semibold rounded-lg gold-gradient text-white">
                    Create Account
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-emerald-700 text-white"
                >
                  My Dashboard ({role})
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
