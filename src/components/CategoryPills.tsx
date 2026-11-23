'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trees,
  Landmark,
  UtensilsCrossed,
  Sparkles,
  Volume2,
  Armchair,
  Camera,
} from 'lucide-react';

export const CategoryPills: React.FC = () => {
  const categories = [
    {
      label: 'Wedding Gardens & Lawns',
      href: '/venues?type=lawn',
      icon: Trees,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-500',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Marriage Halls & Banquet Halls',
      href: '/venues?type=banquet',
      icon: Landmark,
      color: 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-500',
      iconColor: 'text-gold-600',
    },
    {
      label: 'Chefs & Catering',
      href: '/services?category=catering',
      icon: UtensilsCrossed,
      color: 'bg-orange-50 text-orange-900 border-orange-200 hover:border-orange-500',
      iconColor: 'text-orange-600',
    },
    {
      label: 'Decoration & Setup',
      href: '/services?category=decoration',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-500',
      iconColor: 'text-rose-600',
    },
    {
      label: 'Lighting & Sound',
      href: '/services?category=sound_lighting',
      icon: Volume2,
      color: 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-500',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Furniture Rentals',
      href: '/services?category=rentals',
      icon: Armchair,
      color: 'bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-500',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Photography & More',
      href: '/services?category=photography',
      icon: Camera,
      color: 'bg-teal-50 text-teal-900 border-teal-200 hover:border-teal-500',
      iconColor: 'text-teal-600',
    },
  ];

  return (
    <section className="py-12 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
            Explore Our Categories
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Choose from handpicked venues and essential celebration vendors
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 hover:scale-105 hover:shadow-md ${cat.color}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2.5">
                  <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                </div>
                <span className="text-xs font-semibold leading-tight line-clamp-2">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryPills;
