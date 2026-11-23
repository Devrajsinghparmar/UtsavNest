'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarCheck,
  Heart,
  MessageSquare,
  User,
  LogOut,
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { mockBookings, mockVenues } from '@/data/mockData';
import { useAuth } from '@/components/AuthProvider';

export default function UserDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [activeNav, setActiveNav] = useState<'bookings' | 'saved' | 'enquiries'>('bookings');

  const filteredBookings = mockBookings.filter((b) => {
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'past') return b.status === 'completed';
    return b.status === 'cancelled';
  });

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar (Screen 7 of prototype) */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-6">
              {/* User Avatar & Info */}
              <div className="flex items-center gap-3 pb-6 border-b border-ivory-200">
                <div className="w-12 h-12 rounded-full emerald-gradient flex items-center justify-center text-white font-bold font-serif shadow-sm">
                  {user?.name?.slice(0, 2).toUpperCase() || 'DS'}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-serif font-bold text-navy-900 text-sm truncate">
                    {user?.name || 'Devraj Singh'}
                  </h3>
                  <p className="text-[11px] text-gray-500 truncate">
                    {user?.email || 'devraj@example.com'}
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 text-xs">
                <button
                  onClick={() => setActiveNav('bookings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-colors ${
                    activeNav === 'bookings'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-gray-700 hover:bg-ivory-100'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>My Bookings</span>
                </button>

                <button
                  onClick={() => setActiveNav('saved')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-colors ${
                    activeNav === 'saved'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-gray-700 hover:bg-ivory-100'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Saved Venues</span>
                </button>

                <button
                  onClick={() => setActiveNav('enquiries')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-colors ${
                    activeNav === 'enquiries'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-gray-700 hover:bg-ivory-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-gold-600" />
                  <span>Quote Inquiries</span>
                </button>

                <div className="pt-4 mt-4 border-t border-ivory-200">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Dashboard Area */}
          <main className="lg:col-span-3 space-y-6">
            {activeNav === 'bookings' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-navy-900">
                      My Bookings
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Track upcoming celebrations, vendor confirmations, and payments
                    </p>
                  </div>

                  {/* Tabs: Upcoming / Past / Cancelled */}
                  <div className="flex p-1 bg-ivory-100 rounded-xl text-xs font-semibold">
                    {(['upcoming', 'past', 'cancelled'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                          activeTab === tab
                            ? 'bg-white text-navy-900 shadow-xs'
                            : 'text-gray-500 hover:text-navy-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Cards (matching Screen 7 of prototype) */}
                <div className="space-y-4">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 sm:p-5 rounded-2xl border border-ivory-300 bg-ivory-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-shadow-hover"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                            <Image
                              src={b.venueImage}
                              alt={b.venueName}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif font-bold text-navy-900 text-base">
                                {b.venueName}
                              </h4>
                              <span
                                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                  b.status === 'confirmed'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                                }`}
                              >
                                {b.status}
                              </span>
                            </div>

                            <div className="text-xs text-gray-600 flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-gold-600" />
                                {b.eventDate}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-emerald-600" />
                                {b.guestCount} Guests
                              </span>
                            </div>

                            <div className="text-xs text-gray-500">
                              Booking Ref: <span className="font-mono">{b.bookingNumber}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-ivory-200">
                          <div className="text-sm font-bold text-navy-900 font-serif">
                            ₹{b.totalPrice.toLocaleString('en-IN')}
                          </div>
                          <Link
                            href={`/venues/${b.venueId}`}
                            className="px-4 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-gold-600 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-xs text-gray-500">
                      No {activeTab} bookings found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Saved Venues Tab */}
            {activeNav === 'saved' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-4">
                <h2 className="text-2xl font-serif font-bold text-navy-900">
                  Saved Favorite Venues
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockVenues.slice(0, 2).map((v) => (
                    <div key={v.id} className="p-4 rounded-xl border border-ivory-300">
                      <h4 className="font-bold text-navy-900 text-sm">{v.name}</h4>
                      <p className="text-xs text-gray-500">{v.location}</p>
                      <Link
                        href={`/venues/${v.id}`}
                        className="text-xs font-semibold text-gold-700 hover:underline mt-2 inline-block"
                      >
                        View Venue &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enquiries Tab */}
            {activeNav === 'enquiries' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-4">
                <h2 className="text-2xl font-serif font-bold text-navy-900">
                  Active Quote Enquiries
                </h2>
                <div className="p-4 rounded-xl border border-ivory-300 bg-ivory-50 text-xs text-gray-700 space-y-1">
                  <div className="font-bold text-navy-900">Sunshine Meadows & Palace Garden</div>
                  <div>Event Date: 2025-06-28 • 300 Guests</div>
                  <div className="text-emerald-700 font-semibold">Vendor responded with quote: ₹4,20,000</div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
