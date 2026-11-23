'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  BadgeIndianRupee,
  Award,
} from 'lucide-react';
import SearchHero from '@/components/SearchHero';
import CategoryPills from '@/components/CategoryPills';
import VenueCard from '@/components/VenueCard';
import { mockVenues } from '@/data/mockData';

export default function HomePage() {
  const featuredVenues = mockVenues.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Live Multi-Search Bar */}
      <SearchHero />

      {/* 2. Category Pills (7 Categories from prototype) */}
      <CategoryPills />

      {/* 3. Top Featured Venues Section */}
      <section className="py-12 bg-ivory-100/60 border-y border-ivory-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                Handpicked & Verified
              </div>
              <h2 className="text-3xl font-serif font-bold text-navy-900">
                Top Venues in Rajasthan & Delhi NCR
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Discover lavish wedding lawns, royal heritage palaces, and modern banquet halls
              </p>
            </div>

            <Link
              href="/venues"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-800 transition-colors group"
            >
              <span>View All Venues</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner: "Your Dream Event Starts Here" (matching Screen 1) */}
      <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('/images/image_3.jpg')` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-full gold-gradient mx-auto flex items-center justify-center mb-4 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Your Dream Event Starts Here
          </h2>
          <p className="mt-3 text-base text-gray-300 max-w-xl mx-auto">
            Plan your complete celebration with trusted venues, royal master chefs, and professional event coordinators in one unified package.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/package-builder"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-gradient font-semibold text-sm text-white shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              Build Custom Package
            </Link>
            <Link
              href="/venues"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold text-sm text-white transition-all backdrop-blur-sm"
            >
              Browse All Venues
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Trust & How It Works Pillars */}
      <section className="py-16 bg-[#FCFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
              Why Choose UtsavNest?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Eliminate vendor coordination stress with our transparent, verified marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                100% Verified Providers
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every venue capacity, FSSAI catering license, and decor portfolio is physically verified by our local city team.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-4">
                <BadgeIndianRupee className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                Transparent Itemized Quotes
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No hidden charges or surprise electricity overtime fees. You see exact per-plate, per-day, and equipment rates upfront.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow text-center">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 mx-auto flex items-center justify-center mb-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                Single Event Coordination
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Combine your wedding garden with catering, lighting, and sound into a single booking checklist with a dedicated manager.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
