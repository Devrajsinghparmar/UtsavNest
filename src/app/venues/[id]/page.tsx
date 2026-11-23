'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Star,
  MapPin,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Share2,
  Heart,
  ChevronRight,
  Info,
} from 'lucide-react';
import { mockVenues } from '@/data/mockData';

export default function VenueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const venueId = params.id as string;

  const venue =
    mockVenues.find((v) => v.id === venueId || v.slug === venueId) ||
    mockVenues[0];

  const [activeImage, setActiveImage] = useState<string>(venue.coverImage);
  const [eventDate, setEventDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('300');
  const [availabilityStatus, setAvailabilityStatus] = useState<
    'idle' | 'checking' | 'available'
  >('idle');

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventDate) {
      alert('Please select an event date');
      return;
    }
    setAvailabilityStatus('checking');
    setTimeout(() => {
      setAvailabilityStatus('available');
    }, 600);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/venues" className="hover:text-gold-700">Venues</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-navy-900 font-semibold truncate">{venue.name}</span>
        </nav>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-navy-900 text-ivory-100 px-3 py-0.5 rounded-full">
                {venue.typeLabel}
              </span>
              {venue.isVerified && (
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Venue
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900">
              {venue.name}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
              <div className="flex items-center gap-1 font-bold text-navy-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{venue.rating}</span>
                <span className="text-gray-500 font-normal">({venue.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>{venue.address}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Venue link copied to clipboard!')}
              className="p-2.5 rounded-xl border border-ivory-300 bg-white text-gray-700 hover:text-navy-900 shadow-xs"
              title="Share Venue"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              className="p-2.5 rounded-xl border border-ivory-300 bg-white text-gray-700 hover:text-red-500 shadow-xs"
              title="Save to Wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-3 mb-10">
          <div className="relative h-72 sm:h-96 md:h-[460px] w-full rounded-3xl overflow-hidden bg-gray-100 shadow-lg border border-ivory-300">
            <Image
              src={activeImage}
              alt={venue.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {venue.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === img ? 'border-gold-500 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout: Left Details vs Right Availability Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Venue Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Venue */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow">
              <h2 className="text-xl font-serif font-bold text-navy-900 mb-3">
                About this venue
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {venue.description}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-ivory-200">
                <div className="p-3 rounded-xl bg-ivory-100/60 text-center">
                  <div className="text-[11px] text-gray-500">Guest Capacity</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">
                    {venue.capacityMin} - {venue.capacityMax}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-ivory-100/60 text-center">
                  <div className="text-[11px] text-gray-500">Catering Policy</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">
                    {venue.cateringPolicy}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-ivory-100/60 text-center">
                  <div className="text-[11px] text-gray-500">Guest Rooms</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">
                    {venue.roomsCount || '4'} AC Rooms
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-ivory-100/60 text-center">
                  <div className="text-[11px] text-gray-500">Parking Space</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">
                    {venue.parkingCapacity || '200+'} Cars
                  </div>
                </div>
              </div>
            </div>

            {/* Key Amenities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow">
              <h2 className="text-xl font-serif font-bold text-navy-900 mb-4">
                Key Amenities & Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {venue.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-4">
              <h2 className="text-xl font-serif font-bold text-navy-900">
                Venue Policies & Terms
              </h2>
              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Advance Deposit:</strong> 25% required at booking confirmation. Balance due 7 days prior to event.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cancellation & Refund:</strong> Free cancellation up to 45 days before the event date with 100% deposit refund.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Noise & DJ Timings:</strong> Outdoor music permitted until 10:30 PM as per local administrative guidelines.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Check Availability & Custom Package Box */}
          <div className="space-y-6">
            {/* Check Availability Card (Screen 3 of prototype) */}
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow sticky top-28">
              <div className="pb-4 mb-4 border-b border-ivory-200">
                <div className="text-xs text-gray-500">Rental Rate</div>
                <div className="text-2xl font-bold font-serif text-navy-900">
                  ₹{venue.pricePerDay.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-sans font-normal text-gray-500">/ day + taxes</span>
                </div>
                {venue.pricePerPlateVeg && (
                  <div className="text-xs text-emerald-700 mt-1 font-medium">
                    Food starting from ₹{venue.pricePerPlateVeg} / plate
                  </div>
                )}
              </div>

              <form onSubmit={handleCheckAvailability} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" /> Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                      setAvailabilityStatus('idle');
                    }}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-600" /> Expected Guests
                  </label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                    min="50"
                    max={venue.capacityMax}
                  />
                </div>

                <button
                  type="submit"
                  disabled={availabilityStatus === 'checking'}
                  className="w-full py-3 rounded-xl emerald-gradient text-white font-semibold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {availabilityStatus === 'checking'
                      ? 'Checking Slot...'
                      : 'Check Availability'}
                  </span>
                </button>
              </form>

              {/* Instant Status Feedback */}
              {availabilityStatus === 'available' && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Date is Available!</span>
                  </div>
                  <p className="text-[11px] text-gray-700">
                    Venue is open on <strong>{eventDate}</strong> for up to {guestCount} guests.
                  </p>
                  <button
                    onClick={() =>
                      router.push(
                        `/checkout?venueId=${venue.id}&date=${eventDate}&guests=${guestCount}`
                      )
                    }
                    className="w-full py-2 bg-navy-900 text-white rounded-lg text-xs font-semibold hover:bg-gold-600 transition-colors"
                  >
                    Proceed to Booking
                  </button>
                </div>
              )}

              {/* Custom Package CTA (Screen 3 of prototype) */}
              <div className="mt-6 pt-6 border-t border-ivory-200 bg-ivory-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900 mb-1">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>Want a Custom Package?</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Get a complete itemized quote for this venue bundled with master chefs, luxury decor, sound, and lighting.
                </p>
                <Link
                  href={`/package-builder?venueId=${venue.id}`}
                  className="w-full py-2.5 block text-center rounded-xl bg-navy-900 hover:bg-gold-600 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Request Package Quote
                </Link>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-2xl p-5 border border-ivory-300 card-shadow text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Location Map
              </h4>
              <div className="h-32 bg-ivory-100 rounded-xl flex flex-col items-center justify-center text-xs text-gray-600 border border-ivory-300">
                <MapPin className="w-6 h-6 text-gold-600 mb-1 animate-bounce" />
                <span className="font-semibold text-navy-900">{venue.name}</span>
                <span className="text-[11px] text-gray-500">{venue.city}, Rajasthan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
