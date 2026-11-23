'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ServiceProvider } from '@/types';

interface ServiceCardProps {
  service: ServiceProvider;
  onSelect?: (service: ServiceProvider) => void;
  isSelected?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 card-shadow flex flex-col ${
        isSelected
          ? 'border-emerald-600 ring-2 ring-emerald-500/20'
          : 'border-ivory-300 hover:border-gold-400'
      }`}
    >
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={service.coverImage || '/images/image_2.jpg'}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {service.isVerified && (
          <div className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            Verified FSSAI
          </div>
        )}

        <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
          {service.categoryLabel}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="font-serif font-bold text-navy-900 text-base line-clamp-1">
              {service.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-navy-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{service.rating}</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {service.description}
          </p>

          {/* Cuisines or Services */}
          {service.cuisines && (
            <div className="flex flex-wrap gap-1 mb-3">
              {service.cuisines.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-ivory-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-gray-500">Starting from</div>
            <div className="text-sm font-bold text-navy-900 font-serif">
              ₹{service.startingPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-sans font-normal text-gray-500">
                /{service.priceUnit}
              </span>
            </div>
          </div>

          {onSelect ? (
            <button
              onClick={() => onSelect(service)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all ${
                isSelected
                  ? 'bg-emerald-700 text-white'
                  : 'bg-ivory-200 text-navy-900 hover:bg-gold-500 hover:text-white'
              }`}
            >
              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              {isSelected ? 'Selected' : 'Select'}
            </button>
          ) : (
            <Link
              href={`/package-builder?service=${service.id}`}
              className="px-3.5 py-1.5 bg-navy-900 hover:bg-gold-600 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Add to Package
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
