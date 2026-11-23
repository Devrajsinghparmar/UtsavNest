'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { UtensilsCrossed, Sparkles, Volume2, Armchair, Camera, Filter } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { mockServices } from '@/data/mockData';

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Services', icon: Sparkles },
    { id: 'catering', label: 'Chefs & Catering', icon: UtensilsCrossed },
    { id: 'decoration', label: 'Decor & Theme', icon: Sparkles },
    { id: 'sound_lighting', label: 'Sound & Lighting', icon: Volume2 },
    { id: 'rentals', label: 'Furniture Rentals', icon: Armchair },
    { id: 'photography', label: 'Photography', icon: Camera },
  ];

  const filteredServices = useMemo(() => {
    return mockServices.filter((s) => {
      if (selectedCategory !== 'All' && s.category !== selectedCategory) {
        return false;
      }
      if (
        selectedCuisine !== 'All' &&
        s.cuisines &&
        !s.cuisines.some((c) => c.toLowerCase().includes(selectedCuisine.toLowerCase()))
      ) {
        return false;
      }
      if (
        selectedServiceType !== 'All' &&
        s.serviceTypes &&
        !s.serviceTypes.some((t) => t.toLowerCase().includes(selectedServiceType.toLowerCase()))
      ) {
        return false;
      }
      if (
        selectedDietary !== 'All' &&
        s.dietaryOptions &&
        !s.dietaryOptions.some((d) => d.toLowerCase().includes(selectedDietary.toLowerCase()))
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedCuisine, selectedServiceType, selectedDietary]);

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      {/* Hero Banner (Screen 4 of prototype) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-25 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/image_2.jpg')` }}
          />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
              Curated Event Services
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-2">
              Chefs, Catering & Celebration Services
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Delicious multi-cuisine spreads, royal floral mandaps, and concert-grade sound setups for weddings & parties.
            </p>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex gap-2 overflow-x-auto py-4 mt-4 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-white border border-ivory-300 text-gray-700 hover:bg-ivory-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-400' : 'text-gray-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
                <div className="flex items-center gap-2 font-serif font-bold text-navy-900">
                  <Filter className="w-4 h-4 text-gold-600" />
                  <span>Service Filters</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCuisine('All');
                    setSelectedServiceType('All');
                    setSelectedDietary('All');
                  }}
                  className="text-xs text-gold-700 hover:underline font-medium"
                >
                  Reset
                </button>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Cuisine
                </label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                >
                  <option value="All">All Cuisines</option>
                  <option value="North Indian">North Indian & Dal Baati</option>
                  <option value="Mughlai">Mughlai & Awadhi</option>
                  <option value="Pan-Asian">Pan-Asian & Continental</option>
                  <option value="South Indian">South Indian Delicacies</option>
                </select>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Service Format
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: 'All', label: 'All Formats' },
                    { id: 'Buffet', label: 'Buffet Dining' },
                    { id: 'Plated', label: 'Plated Sit-down' },
                    { id: 'Live', label: 'Live Cooking Stations' },
                  ].map((fmt) => (
                    <label key={fmt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceType"
                        checked={selectedServiceType === fmt.id}
                        onChange={() => setSelectedServiceType(fmt.id)}
                        className="text-gold-600 focus:ring-gold-500"
                      />
                      <span>{fmt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Options */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Dietary Preferences
                </label>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: 'All', label: 'All Dietary' },
                    { id: 'Pure Veg', label: 'Pure Veg Catering' },
                    { id: 'Jain', label: 'Dedicated Jain Counters' },
                    { id: 'Non-Veg', label: 'Veg & Non-Veg Multi-buffet' },
                  ].map((diet) => (
                    <label key={diet.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dietary"
                        checked={selectedDietary === diet.id}
                        onChange={() => setSelectedDietary(diet.id)}
                        className="text-gold-600 focus:ring-gold-500"
                      />
                      <span>{diet.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-ivory-300">
              <span className="text-xs text-gray-600">
                Found <strong className="text-navy-900">{filteredServices.length}</strong> verified providers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
