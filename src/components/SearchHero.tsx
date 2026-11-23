'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users, PartyPopper } from 'lucide-react';

export const SearchHero: React.FC = () => {
  const router = useRouter();
  const [city, setCity] = useState('Jaipur');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('300-500');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      city,
      type: eventType,
      date: eventDate,
      guests: guestCount,
    }).toString();
    router.push(`/venues?${query}`);
  };

  return (
    <div className="relative bg-navy-900 text-white overflow-hidden">
      {/* Background Hero Image with Indian Celebration Lighting */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/images/image_1.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/80 to-navy-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-medium mb-6">
          <PartyPopper className="w-4 h-4 text-gold-400" />
          <span>India&apos;s Most Trusted Celebration Marketplace</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ivory-50 max-w-4xl mx-auto leading-tight">
          Every Celebration, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
            All In One Place
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Book verified wedding gardens, royal party halls, master chefs, catering, luxury decor, and complete event essentials with upfront pricing.
        </p>

        {/* Live Multi-Parameter Search Bar */}
        <div className="mt-10 max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl text-navy-900 border border-gold-200/50">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* City */}
            <div className="text-left px-3 py-2 rounded-xl hover:bg-ivory-100 transition-colors border sm:border-0 border-gray-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-600" /> City / Location
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="Jaipur">Jaipur, Rajasthan</option>
                <option value="Udaipur">Udaipur, Rajasthan</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai, MH</option>
                <option value="Bengaluru">Bengaluru, KA</option>
              </select>
            </div>

            {/* Event Type */}
            <div className="text-left px-3 py-2 rounded-xl hover:bg-ivory-100 transition-colors border sm:border-0 border-gray-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 flex items-center gap-1">
                <PartyPopper className="w-3 h-3 text-emerald-600" /> Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="Wedding">Wedding / Pheras</option>
                <option value="Reception">Wedding Reception</option>
                <option value="Sangeet">Sangeet / Mehendi</option>
                <option value="Birthday">Birthday / Anniversary</option>
                <option value="Corporate">Corporate Gathering</option>
              </select>
            </div>

            {/* Date */}
            <div className="text-left px-3 py-2 rounded-xl hover:bg-ivory-100 transition-colors border sm:border-0 border-gray-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gold-600" /> Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-navy-900 focus:outline-none cursor-pointer"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Guests */}
            <div className="text-left px-3 py-2 rounded-xl hover:bg-ivory-100 transition-colors border sm:border-0 border-gray-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 flex items-center gap-1">
                <Users className="w-3 h-3 text-emerald-600" /> Guest Count
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="50-150">50 - 150 Guests</option>
                <option value="150-300">150 - 300 Guests</option>
                <option value="300-500">300 - 500 Guests</option>
                <option value="500-1000">500 - 1000 Guests</option>
                <option value="1000+">1000+ Grand Gathering</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="px-1 py-1">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl gold-gradient text-white font-semibold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
