'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Users, Heart, ShieldCheck } from 'lucide-react';
import { Venue } from '@/types';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-ivory-300 card-shadow card-shadow-hover flex flex-col group">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <Image
          src={venue.coverImage || '/images/image_1.jpg'}
          alt={venue.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Verified Badge */}
        {venue.isVerified && (
          <div className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            Verified
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition-transform active:scale-90"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Type Label Pill */}
        <div className="absolute bottom-3 left-3 bg-navy-900/80 text-ivory-100 text-xs px-2.5 py-0.5 rounded-md backdrop-blur-sm">
          {venue.typeLabel}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-serif font-bold text-navy-900 group-hover:text-gold-700 transition-colors line-clamp-1">
              {venue.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-navy-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{venue.rating}</span>
              <span className="text-gray-500 font-normal">({venue.reviewsCount})</span>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-600 gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span className="line-clamp-1">{venue.location}</span>
          </div>

          {/* Quick Amenities Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {venue.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-ivory-100 border border-ivory-300 text-gray-700 px-2 py-0.5 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-ivory-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-500 font-medium">Starting from</div>
            <div className="text-base font-bold text-navy-900 font-serif">
              ₹{venue.pricePerDay.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-sans font-normal text-gray-500">/ day</span>
            </div>
            <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-0.5">
              <Users className="w-3 h-3" />
              <span>{venue.capacityMin} - {venue.capacityMax} guests</span>
            </div>
          </div>

          <Link
            href={`/venues/${venue.id}`}
            className="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded-xl hover:bg-gold-600 active:scale-95 transition-all shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
