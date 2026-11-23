'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import VenueCard from '@/components/VenueCard';
import { mockVenues } from '@/data/mockData';

function VenuesListingContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || 'All';
  const initialType = searchParams.get('type') || 'All';

  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedCapacity, setSelectedCapacity] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity');

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  const filteredVenues = useMemo(() => {
    return mockVenues
      .filter((v) => {
        if (selectedCity !== 'All' && v.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
        if (selectedType !== 'All' && v.type.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }
        if (selectedCapacity !== 'All') {
          if (selectedCapacity === '100-300' && (v.capacityMin > 300 || v.capacityMax < 100)) return false;
          if (selectedCapacity === '300-500' && (v.capacityMin > 500 || v.capacityMax < 300)) return false;
          if (selectedCapacity === '500-1000' && (v.capacityMin > 1000 || v.capacityMax < 500)) return false;
          if (selectedCapacity === '1000+' && v.capacityMax < 1000) return false;
        }
        if (selectedPrice !== 'All') {
          if (selectedPrice === 'under_150k' && v.pricePerDay > 150000) return false;
          if (selectedPrice === '150k_250k' && (v.pricePerDay < 150000 || v.pricePerDay > 250000)) return false;
          if (selectedPrice === 'above_250k' && v.pricePerDay < 250000) return false;
        }
        if (selectedFacilities.length > 0) {
          const hasAll = selectedFacilities.every((fac) =>
            v.amenities.some((a) => a.toLowerCase().includes(fac.toLowerCase()))
          );
          if (!hasAll) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerDay - b.pricePerDay;
        if (sortBy === 'price_desc') return b.pricePerDay - a.pricePerDay;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [selectedCity, selectedType, selectedCapacity, selectedPrice, selectedFacilities, sortBy]);

  const clearAllFilters = () => {
    setSelectedCity('All');
    setSelectedType('All');
    setSelectedCapacity('All');
    setSelectedPrice('All');
    setSelectedFacilities([]);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-25 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/image_1.jpg')` }}
          />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
              Browse & Compare Verified Venues
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-2">
              Wedding Gardens, Lawns & Banquet Halls
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Find the perfect outdoor lawn or air-conditioned hall for weddings, receptions, and pre-wedding celebrations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
                <div className="flex items-center gap-2 font-serif font-bold text-navy-900">
                  <Filter className="w-4 h-4 text-gold-600" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gold-700 hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Location / City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                >
                  <option value="All">All Cities</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                  <option value="Udaipur">Udaipur, Rajasthan</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai, MH</option>
                  <option value="Bengaluru">Bengaluru, KA</option>
                </select>
              </div>

              {/* Venue Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Venue Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="lawn">Wedding Lawn & Garden</option>
                  <option value="banquet">Banquet & Party Hall</option>
                  <option value="palace">Heritage Palace</option>
                  <option value="resort">Wedding Resort</option>
                </select>
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Guest Capacity
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {['All', '100-300', '300-500', '500-1000', '1000+'].map((cap) => (
                    <label key={cap} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="capacity"
                        checked={selectedCapacity === cap}
                        onChange={() => setSelectedCapacity(cap)}
                        className="text-gold-600 focus:ring-gold-500"
                      />
                      <span>{cap === 'All' ? 'Any Capacity' : `${cap} Guests`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Price Per Day
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: 'All', label: 'All Budgets' },
                    { id: 'under_150k', label: 'Under ₹1,50,000' },
                    { id: '150k_250k', label: '₹1,50,000 - ₹2,50,000' },
                    { id: 'above_250k', label: '₹2,50,000+' },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === p.id}
                        onChange={() => setSelectedPrice(p.id)}
                        className="text-gold-600 focus:ring-gold-500"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Facilities
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {['Parking', 'Catering', 'Decor', 'AC', 'Wi-Fi'].map((fac) => (
                    <label key={fac} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFacilities.includes(fac)}
                        onChange={() => toggleFacility(fac)}
                        className="rounded text-gold-600 focus:ring-gold-500"
                      />
                      <span>{fac}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Listings Grid */}
          <main className="lg:col-span-3">
            <div className="hidden lg:flex items-center justify-between pb-4 mb-6 border-b border-ivory-300">
              <span className="text-xs text-gray-600 font-medium">
                Showing <strong className="text-navy-900">{filteredVenues.length}</strong> verified venues
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-ivory-300 rounded-lg px-2.5 py-1.5 font-semibold text-navy-900 focus:outline-none"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Highest Rating</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-ivory-300 card-shadow">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-bold text-navy-900">
                  No Venues Match Your Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-navy-900 text-white hover:bg-gold-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function VenuesListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading venues...</div>}>
      <VenuesListingContent />
    </Suspense>
  );
}
