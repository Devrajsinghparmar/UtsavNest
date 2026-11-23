'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Users, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      {/* Hero Banner (Screen 9 of prototype) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-16 text-white text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/image_3.jpg')` }}
          />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full gold-gradient mx-auto flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              About UtsavNest
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-light">
              Making celebrations simpler, transparent, and memorable across India.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-ivory-300 card-shadow space-y-4 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-navy-900">
            Our Founding Mission
          </h2>
          <p>
            Planning an Indian wedding or milestone family celebration shouldn&apos;t mean calling dozens of unverified numbers, dealing with surprise overtime fees, or guessing whether a caterer will show up on time.
          </p>
          <p>
            <strong>UtsavNest</strong> was built on a simple promise: bringing verified wedding lawns, luxury banquet halls, master chefs, and trusted event coordinators into one unified platform where every package is itemized and transparent.
          </p>
          <blockquote className="p-4 rounded-2xl bg-ivory-100 border-l-4 border-gold-500 font-serif italic text-navy-900">
            &quot;This is not only a website business. It is a local marketplace plus an operations and trust business.&quot;
            <span className="block text-xs font-sans font-normal text-gray-500 not-italic mt-1">
              — UtsavNest Founding Blueprint
            </span>
          </blockquote>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h3 className="font-serif font-bold text-base text-navy-900">
              Strict Verification Process
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We physically verify venue guest capacity, fire NOC certifications, and food hygiene licenses before listing any vendor.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow space-y-2">
            <Award className="w-8 h-8 text-gold-600" />
            <h3 className="font-serif font-bold text-base text-navy-900">
              No Hidden Charges
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every quote clearly itemizes per-plate food costs, electricity units, cleaning fees, and setup hours so you stay in budget.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow space-y-2">
            <HeartHandshake className="w-8 h-8 text-rose-500" />
            <h3 className="font-serif font-bold text-base text-navy-900">
              Escrow-Protected Deposits
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your advance deposit is held securely until the venue coordinator confirms your date and signs the agreement.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow space-y-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h3 className="font-serif font-bold text-base text-navy-900">
              Dedicated Event Coordinator
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every confirmed booking includes an assigned wedding coordinator to ensure smooth delivery on your big day.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href="/venues"
            className="inline-flex px-8 py-3.5 rounded-xl gold-gradient text-white text-xs font-semibold shadow-md hover:brightness-105 transition-all"
          >
            Explore Verified Venues
          </Link>
        </div>
      </div>
    </div>
  );
}
