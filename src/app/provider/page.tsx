'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Store,
  CalendarCheck,
  UploadCloud,
  PlusCircle,
  ShieldCheck,
  Check,
  X,
  TrendingUp,
  BadgeIndianRupee,
  Building2,
  Users,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  FileCheck,
  HelpCircle,
} from 'lucide-react';
import { mockBookings, mockVenues } from '@/data/mockData';
import { Venue } from '@/types';

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'upload_garden' | 'earnings'>('overview');
  const [bookings, setBookings] = useState(mockBookings);
  const [myVenues, setMyVenues] = useState<Venue[]>(mockVenues.slice(0, 2));

  // --- Form State for Uploading New Marriage Garden / Service ---
  const [gardenName, setGardenName] = useState('');
  const [serviceCategory, setServiceCategory] = useState<'lawn' | 'banquet' | 'catering' | 'decoration' | 'sound_lighting'>('lawn');
  const [city, setCity] = useState('Jaipur');
  const [locationArea, setLocationArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [capacityMin, setCapacityMin] = useState(200);
  const [capacityMax, setCapacityMax] = useState(1200);
  const [pricePerDay, setPricePerDay] = useState(150000);
  const [pricePerPlateVeg, setPricePerPlateVeg] = useState(1100);
  const [pricePerPlateNonVeg, setPricePerPlateNonVeg] = useState(1400);
  const [parkingCapacity, setParkingCapacity] = useState(200);
  const [roomsCount, setRoomsCount] = useState(4);
  const [cateringPolicy, setCateringPolicy] = useState<'Allowed' | 'In-house only' | 'Veg only'>('Allowed');
  const [decorPolicy, setDecorPolicy] = useState<'Outside vendors allowed' | 'In-house only'>('Outside vendors allowed');
  const [description, setDescription] = useState('');

  // Selected Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Parking Space (200+ Cars)',
    'AC Bridal Room',
    'Power Backup (24x7)',
    'In-house Catering Allowed',
  ]);

  // Uploaded Pictures (AWS S3 URLs or local previews)
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    '/images/image_1.jpg',
  ]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [isSubmittingListing, setIsSubmittingListing] = useState(false);
  const [listingSuccess, setListingSuccess] = useState(false);

  // --- Earnings & Revenue Calculator State ---
  const [calcRentalRate, setCalcRentalRate] = useState<number>(150000);
  const [calcBookingsPerMonth, setCalcBookingsPerMonth] = useState<number>(6);
  const [calcSeasonMonths, setCalcSeasonMonths] = useState<number>(6);
  const [calcCateringPerEvent, setCalcCateringPerEvent] = useState<number>(180000);

  // Calculated Incomes
  const monthlyRentalIncome = calcRentalRate * calcBookingsPerMonth;
  const monthlyCateringIncome = calcCateringPerEvent * calcBookingsPerMonth;
  const monthlyGrossIncome = monthlyRentalIncome + monthlyCateringIncome;
  const seasonGrossIncome = monthlyGrossIncome * calcSeasonMonths;
  const platformFee = Math.round(seasonGrossIncome * 0.08); // 8% UtsavNest commission
  const netVendorSeasonIncome = seasonGrossIncome - platformFee;

  // Toggle Amenity helper
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Image Upload handler (AWS S3 integration)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });
      const data = await res.json();
      const newUrl = data.fileUrl || URL.createObjectURL(file);
      setUploadedImages((prev) => [...prev, newUrl]);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 2500);
    } catch {
      const fallbackUrl = URL.createObjectURL(file);
      setUploadedImages((prev) => [...prev, fallbackUrl]);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 2500);
    }
  };

  // Submit New Listing
  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingListing(true);

    const newVenue: Venue = {
      id: `venue-${Date.now()}`,
      name: gardenName,
      slug: gardenName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: serviceCategory as any,
      typeLabel:
        serviceCategory === 'lawn'
          ? 'Wedding Garden & Lawn'
          : serviceCategory === 'banquet'
          ? 'Luxury Banquet Hall'
          : 'Event Space',
      city,
      location: `${locationArea}, ${city}`,
      address: fullAddress,
      rating: 5.0,
      reviewsCount: 1,
      capacityMin,
      capacityMax,
      pricePerDay,
      pricePerPlateVeg,
      pricePerPlateNonVeg,
      coverImage: uploadedImages[0] || '/images/image_1.jpg',
      images: uploadedImages.length > 0 ? uploadedImages : ['/images/image_1.jpg', '/images/image_2.jpg'],
      amenities: selectedAmenities,
      cateringPolicy,
      decorPolicy,
      roomsCount,
      parkingCapacity,
      description:
        description ||
        `${gardenName} is a premier wedding garden and celebration space located in ${city}, offering lavish event spaces, catering facilities, and complete wedding arrangements.`,
      isVerified: true,
      featured: true,
    };

    try {
      await fetch('/api/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVenue),
      });
    } catch (err) {
      console.warn('Listing saved in local store');
    }

    setMyVenues((prev) => [newVenue, ...prev]);
    setIsSubmittingListing(false);
    setListingSuccess(true);
  };

  const resetForm = () => {
    setGardenName('');
    setLocationArea('');
    setFullAddress('');
    setDescription('');
    setListingSuccess(false);
    setActiveTab('listings');
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-ivory-300 card-shadow space-y-6 sticky top-28">
              {/* Vendor Profile Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-ivory-200">
                <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center text-white font-bold font-serif shadow-md">
                  VG
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy-900 text-sm">
                    Vendor Partner Hub
                  </h3>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Provider
                  </p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                    activeTab === 'overview'
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-ivory-100'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4 text-gold-400" />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    activeTab === 'listings'
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-ivory-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Store className="w-4 h-4 text-emerald-500" />
                    <span>My Listings</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-ivory-200 text-navy-900 text-[10px]">
                    {myVenues.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('upload_garden');
                    setListingSuccess(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                    activeTab === 'upload_garden'
                      ? 'bg-gold-600 text-white shadow-sm'
                      : 'text-gold-800 bg-gold-50/70 hover:bg-gold-100 border border-gold-200'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-gold-500" />
                  <span>+ List Marriage Garden / Service</span>
                </button>

                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
                    activeTab === 'earnings'
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-ivory-100'
                  }`}
                >
                  <BadgeIndianRupee className="w-4 h-4 text-emerald-600" />
                  <span>Income & Revenue Generator</span>
                </button>
              </nav>

              {/* Quick Vendor Support Callout */}
              <div className="pt-4 border-t border-ivory-200 text-[11px] text-gray-500 space-y-1">
                <div className="font-semibold text-navy-900">Vendor Support Line:</div>
                <div className="text-gold-700 font-mono">+91 98765 43210</div>
                <div>help@utsavnest.in</div>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="lg:col-span-3 space-y-8">
            {/* ---------------- 1. DASHBOARD OVERVIEW ---------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metric Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-6 rounded-3xl bg-white border border-ivory-300 card-shadow text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Total Inquiries & Bookings
                    </div>
                    <div className="text-3xl font-serif font-bold text-navy-900 mt-1">
                      {bookings.length + 9}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      +3 new this week
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-ivory-300 card-shadow text-center">
                    <div className="text-xs text-amber-700 uppercase tracking-wider font-semibold">
                      Pending Date Holds
                    </div>
                    <div className="text-3xl font-serif font-bold text-amber-700 mt-1">
                      {bookings.filter((b) => b.status === 'pending').length + 2}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">Awaiting your approval</div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-ivory-300 card-shadow text-center">
                    <div className="text-xs text-emerald-700 uppercase tracking-wider font-semibold">
                      Gross In-Hand Revenue
                    </div>
                    <div className="text-3xl font-serif font-bold text-emerald-700 mt-1">
                      ₹9,15,000
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">Direct Bank Payouts</div>
                  </div>
                </div>

                {/* Quick Action Banner to Upload */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 card-shadow">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-lg text-gold-300">
                      Have another Marriage Garden, Banquet or Catering service?
                    </h3>
                    <p className="text-xs text-gray-300 max-w-lg">
                      Upload your venue with pictures, guest capacity, per-day rates, and start receiving verified booking leads.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('upload_garden');
                      setListingSuccess(false);
                    }}
                    className="px-5 py-2.5 rounded-xl gold-gradient text-white text-xs font-semibold shadow hover:brightness-105 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Upload New Service</span>
                  </button>
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-navy-900">
                      Recent Event Inquiries & Bookings
                    </h3>
                    <span className="text-xs text-gray-500">Auto-synced with Escrow</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="text-[11px] uppercase tracking-wider text-gray-500 bg-ivory-100 border-b border-ivory-200">
                        <tr>
                          <th className="p-3">Customer / Event</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Guests</th>
                          <th className="p-3">Total Value</th>
                          <th className="p-3">Deposit</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ivory-200">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-ivory-50/60">
                            <td className="p-3 font-semibold text-navy-900">
                              {b.customerName}
                              <div className="text-[11px] text-gray-500 font-normal">
                                {b.eventType}
                              </div>
                            </td>
                            <td className="p-3">{b.eventDate}</td>
                            <td className="p-3">{b.guestCount}</td>
                            <td className="p-3 font-semibold">₹{b.totalPrice.toLocaleString('en-IN')}</td>
                            <td className="p-3 text-emerald-700 font-medium">₹{b.advanceDeposit.toLocaleString('en-IN')}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                                  b.status === 'confirmed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {b.status === 'pending' ? (
                                <button
                                  onClick={() =>
                                    setBookings((prev) =>
                                      prev.map((item) =>
                                        item.id === b.id ? { ...item, status: 'confirmed' } : item
                                      )
                                    )
                                  }
                                  className="px-2.5 py-1 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800"
                                >
                                  Confirm
                                </button>
                              ) : (
                                <span className="text-gray-400 font-mono text-[11px]">{b.bookingNumber}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- 2. MY LISTINGS TAB ---------------- */}
            {activeTab === 'listings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-navy-900">
                      Your Registered Venues & Services
                    </h3>
                    <p className="text-xs text-gray-500">
                      Manage your live profiles, update photos, pricing per day, and capacity.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('upload_garden');
                      setListingSuccess(false);
                    }}
                    className="px-4 py-2 rounded-xl gold-gradient text-white text-xs font-semibold shadow hover:brightness-105 flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Add Another Garden</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myVenues.map((venue) => (
                    <div
                      key={venue.id}
                      className="rounded-2xl border border-ivory-300 overflow-hidden card-shadow-hover flex flex-col justify-between bg-white"
                    >
                      <div>
                        <div className="relative h-44 w-full bg-gray-100">
                          <Image
                            src={venue.coverImage || '/images/image_1.jpg'}
                            alt={venue.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> Live on Marketplace
                          </div>
                          <div className="absolute bottom-3 left-3 bg-navy-900/80 text-white text-xs px-2.5 py-0.5 rounded-md">
                            {venue.typeLabel}
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif font-bold text-navy-900 text-base">
                              {venue.name}
                            </h4>
                            <span className="text-xs font-bold text-gold-700 font-serif">
                              ₹{venue.pricePerDay.toLocaleString('en-IN')} / day
                            </span>
                          </div>

                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-gold-600" />
                            <span>{venue.location}</span>
                          </div>

                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Capacity: {venue.capacityMin} - {venue.capacityMax} Guests</span>
                          </div>

                          <div className="flex flex-wrap gap-1 pt-2">
                            {venue.amenities.slice(0, 3).map((a, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-ivory-100 text-gray-600 px-2 py-0.5 rounded"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-ivory-50 border-t border-ivory-200 flex items-center justify-between text-xs">
                        <Link
                          href={`/venues/${venue.id}`}
                          className="font-semibold text-gold-700 hover:underline"
                        >
                          View Public Page &rarr;
                        </Link>
                        <span className="text-gray-400 font-mono text-[10px]">
                          ID: {venue.id.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- 3. UPLOAD MARRIAGE GARDEN / SERVICE FORM ---------------- */}
            {activeTab === 'upload_garden' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-300 card-shadow space-y-8">
                {listingSuccess ? (
                  <div className="text-center py-12 space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-navy-900">
                      Your Marriage Garden Has Been Uploaded!
                    </h3>
                    <p className="text-xs text-gray-600 max-w-md mx-auto">
                      <strong>{gardenName}</strong> is now saved and active in the UtsavNest system. Customers can now discover your venue and send quote requests.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <button
                        onClick={resetForm}
                        className="px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-gold-600 transition-colors"
                      >
                        View in My Listings
                      </button>
                      <button
                        onClick={() => {
                          setListingSuccess(false);
                          setActiveTab('earnings');
                        }}
                        className="px-6 py-2.5 rounded-xl bg-ivory-200 text-navy-900 text-xs font-semibold hover:bg-ivory-300 transition-colors"
                      >
                        Calculate Projected Incomes &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCreateListing} className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-ivory-200 pb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Vendor Self-Service Upload Form
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 mt-2">
                        Upload Your Marriage Garden or Celebration Service
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Fill in all property details, guest capacities, rental fees, and upload pictures to start receiving bookings.
                      </p>
                    </div>

                    {/* Section 1: Business Identity & Category */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-bold text-base text-navy-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gold-600" />
                        <span>1. Property & Service Details</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Marriage Garden / Venue Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={gardenName}
                            onChange={(e) => setGardenName(e.target.value)}
                            placeholder="e.g. Royal Rajwada Marriage Garden & Lawn"
                            className="w-full text-xs font-semibold p-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Service Category *
                          </label>
                          <select
                            value={serviceCategory}
                            onChange={(e) => setServiceCategory(e.target.value as any)}
                            className="w-full text-xs font-semibold p-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          >
                            <option value="lawn">Marriage Garden & Wedding Lawn</option>
                            <option value="banquet">Air-Conditioned Banquet Hall</option>
                            <option value="catering">Chefs & Catering Service</option>
                            <option value="decoration">Floral & Mandap Decoration</option>
                            <option value="sound_lighting">DJ, Sound & Truss Lighting</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            City / Region *
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full text-xs font-semibold p-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          >
                            <option value="Jaipur">Jaipur, Rajasthan</option>
                            <option value="Udaipur">Udaipur, Rajasthan</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Mumbai">Mumbai, MH</option>
                            <option value="Bengaluru">Bengaluru, KA</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Location Area / Neighbourhood *
                          </label>
                          <input
                            type="text"
                            required
                            value={locationArea}
                            onChange={(e) => setLocationArea(e.target.value)}
                            placeholder="e.g. Sirsi Road / Ajmer Road / Malviya Nagar"
                            className="w-full text-xs font-semibold p-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Full Address & Pin Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullAddress}
                            onChange={(e) => setFullAddress(e.target.value)}
                            placeholder="Plot 105, Near Toll Plaza, Jaipur - 302012"
                            className="w-full text-xs font-semibold p-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Capacity & Pricing */}
                    <div className="space-y-4 pt-4 border-t border-ivory-200">
                      <h3 className="font-serif font-bold text-base text-navy-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>2. Guest Capacity & Pricing Structure</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Min Guest Count
                          </label>
                          <input
                            type="number"
                            value={capacityMin}
                            onChange={(e) => setCapacityMin(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Max Capacity (Guests)
                          </label>
                          <input
                            type="number"
                            value={capacityMax}
                            onChange={(e) => setCapacityMax(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Garden Rental (₹ / Day) *
                          </label>
                          <input
                            type="number"
                            required
                            value={pricePerDay}
                            onChange={(e) => setPricePerDay(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Parking Space (Cars)
                          </label>
                          <input
                            type="number"
                            value={parkingCapacity}
                            onChange={(e) => setParkingCapacity(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Veg Plate Price (₹)
                          </label>
                          <input
                            type="number"
                            value={pricePerPlateVeg}
                            onChange={(e) => setPricePerPlateVeg(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Non-Veg Plate Price (₹)
                          </label>
                          <input
                            type="number"
                            value={pricePerPlateNonVeg}
                            onChange={(e) => setPricePerPlateNonVeg(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            AC Rooms Included
                          </label>
                          <input
                            type="number"
                            value={roomsCount}
                            onChange={(e) => setRoomsCount(Number(e.target.value))}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                            Catering Policy
                          </label>
                          <select
                            value={cateringPolicy}
                            onChange={(e) => setCateringPolicy(e.target.value as any)}
                            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                          >
                            <option value="Allowed">Outside Caterer Allowed</option>
                            <option value="In-house only">In-house Catering Only</option>
                            <option value="Veg only">Pure Veg Events Only</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Facilities Checkboxes */}
                    <div className="space-y-4 pt-4 border-t border-ivory-200">
                      <h3 className="font-serif font-bold text-base text-navy-900 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-gold-600" />
                        <span>3. Amenities & Facilities Offered</span>
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-700">
                        {[
                          'Parking Space (200+ Cars)',
                          'AC Bridal Room',
                          'Power Backup (24x7)',
                          'In-house Catering Allowed',
                          'Outside Decorator Allowed',
                          'Guest Accommodation Rooms',
                          'DJ & Sound Setup Permit',
                          'Covered Dining Pavilion',
                          'Elevator Access / Ramp',
                          'Fireworks & Baarat Zone',
                          'Wi-Fi Access',
                          'Dedicated Kitchen Prep Area',
                        ].map((amenity) => (
                          <label
                            key={amenity}
                            onClick={() => toggleAmenity(amenity)}
                            className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                              selectedAmenities.includes(amenity)
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                                : 'border-ivory-300 hover:bg-ivory-50 text-gray-600'
                            }`}
                          >
                            <input
                              type="checkbox"
                              readOnly
                              checked={selectedAmenities.includes(amenity)}
                              className="rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Upload Pictures (AWS S3 Cloud Store) */}
                    <div className="space-y-4 pt-4 border-t border-ivory-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-base text-navy-900 flex items-center gap-2">
                          <Camera className="w-4 h-4 text-blue-600" />
                          <span>4. Upload Garden Pictures (AWS Cloud Storage)</span>
                        </h3>
                        <span className="text-[11px] text-gray-500">
                          {uploadedImages.length} images uploaded
                        </span>
                      </div>

                      {/* Dropzone */}
                      <div className="border-2 border-dashed border-ivory-300 rounded-2xl p-6 text-center hover:bg-ivory-50 transition-colors">
                        <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <label className="cursor-pointer">
                          <span className="px-4 py-2 rounded-xl gold-gradient text-white text-xs font-semibold shadow inline-block hover:brightness-105">
                            Select Photo to Upload
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-gray-400 mt-2">
                          Upload high-resolution lawn, mandap, dining setup photos (JPG/PNG). Saved to AWS S3.
                        </p>
                        {uploadStatus === 'uploading' && (
                          <div className="text-xs text-gold-600 font-semibold mt-2 animate-pulse">
                            Uploading image to AWS Cloud Storage...
                          </div>
                        )}
                        {uploadStatus === 'success' && (
                          <div className="text-xs text-emerald-600 font-semibold mt-2">
                            ✓ Image uploaded and attached!
                          </div>
                        )}
                      </div>

                      {/* Uploaded Gallery Grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {uploadedImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 rounded-xl overflow-hidden border border-ivory-300 group"
                          >
                            <Image src={img} alt={`Uploaded ${idx}`} fill className="object-cover" />
                            {idx === 0 && (
                              <span className="absolute bottom-1 left-1 bg-navy-900/90 text-white text-[9px] px-1.5 py-0.5 rounded">
                                Cover Photo
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                setUploadedImages((prev) => prev.filter((_, i) => i !== idx))
                              }
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 5: Description */}
                    <div className="space-y-4 pt-4 border-t border-ivory-200">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                        Venue Description & Special Highlights
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Highlight your landscaped lawn, royal entry gate, lighting, cleanliness, and years of experience hosting royal Indian weddings..."
                        className="w-full text-xs p-3 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmittingListing || !gardenName}
                        className="w-full py-4 rounded-xl gold-gradient text-white font-semibold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {isSubmittingListing
                            ? 'Saving & Publishing Venue...'
                            : 'Publish Marriage Garden to UtsavNest'}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ---------------- 4. INCOME & REVENUE GENERATOR ---------------- */}
            {activeTab === 'earnings' && (
              <div className="space-y-8">
                {/* Header Banner */}
                <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden card-shadow">
                  <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/image_3.jpg')` }}
                  />
                  <div className="relative z-10 max-w-2xl">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                      Vendor Financial Intelligence
                    </span>
                    <h2 className="text-3xl font-serif font-bold mt-2">
                      Income & Revenue Estimator
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                      Calculate your projected earnings, track completed booking payouts, and see transparent net profits per wedding season.
                    </p>
                  </div>
                </div>

                {/* Live Interactive Income Generator */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-6">
                  <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-serif font-bold text-lg text-navy-900">
                        Interactive Wedding Season Revenue Simulator
                      </h3>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                      8% Flat Commission
                    </span>
                  </div>

                  {/* Sliders & Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        Rental Rate per Event (₹)
                      </label>
                      <input
                        type="number"
                        step="10000"
                        value={calcRentalRate}
                        onChange={(e) => setCalcRentalRate(Number(e.target.value))}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        Bookings per Month
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="25"
                        value={calcBookingsPerMonth}
                        onChange={(e) => setCalcBookingsPerMonth(Number(e.target.value))}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        Average Food/Extras per Event (₹)
                      </label>
                      <input
                        type="number"
                        step="10000"
                        value={calcCateringPerEvent}
                        onChange={(e) => setCalcCateringPerEvent(Number(e.target.value))}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">
                        Active Season Months
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={calcSeasonMonths}
                        onChange={(e) => setCalcSeasonMonths(Number(e.target.value))}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900"
                      />
                    </div>
                  </div>

                  {/* Output Generated Incomes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-ivory-200">
                    <div className="p-4 rounded-2xl bg-ivory-100 text-center">
                      <div className="text-[11px] text-gray-500 uppercase font-semibold">
                        Monthly Gross Revenue
                      </div>
                      <div className="text-xl font-bold font-serif text-navy-900 mt-1">
                        ₹{monthlyGrossIncome.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {calcBookingsPerMonth} weddings/month
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-ivory-100 text-center">
                      <div className="text-[11px] text-gray-500 uppercase font-semibold">
                        Season Gross Turnover ({calcSeasonMonths} Mo.)
                      </div>
                      <div className="text-xl font-bold font-serif text-gold-700 mt-1">
                        ₹{seasonGrossIncome.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        Platform Fee (8%): -₹{platformFee.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <div className="text-[11px] text-emerald-800 uppercase font-bold">
                        Net In-Hand Vendor Payout
                      </div>
                      <div className="text-2xl font-bold font-serif text-emerald-800 mt-1">
                        ₹{netVendorSeasonIncome.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">
                        Direct Bank Settlement
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settlement & Payouts Ledger */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-navy-900">
                        Recent Bank Payouts & Settlement Ledger
                      </h3>
                      <p className="text-xs text-gray-500">
                        Funds deposited to HDFC Bank A/c ending in **4821
                      </p>
                    </div>
                    <button
                      onClick={() => alert('GST Payout Statement downloaded!')}
                      className="text-xs font-semibold text-gold-700 hover:underline"
                    >
                      Download Annual GST Statement
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="text-[11px] uppercase tracking-wider text-gray-500 bg-ivory-100 border-b border-ivory-200">
                        <tr>
                          <th className="p-3">Payout Date</th>
                          <th className="p-3">Booking Ref</th>
                          <th className="p-3">Gross Amount</th>
                          <th className="p-3">Fee (8%)</th>
                          <th className="p-3">Net Payout Transferred</th>
                          <th className="p-3">UTR / Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ivory-200">
                        <tr className="hover:bg-ivory-50/60">
                          <td className="p-3">02 Apr 2025</td>
                          <td className="p-3 font-mono">UN-2025-0842</td>
                          <td className="p-3 font-semibold">₹2,85,000</td>
                          <td className="p-3 text-red-600">-₹22,800</td>
                          <td className="p-3 font-bold text-emerald-800">₹2,62,200</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              SETTLED (UTR#9482)
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-ivory-50/60">
                          <td className="p-3">15 Mar 2025</td>
                          <td className="p-3 font-mono">UN-2025-0719</td>
                          <td className="p-3 font-semibold">₹1,75,000</td>
                          <td className="p-3 text-red-600">-₹14,000</td>
                          <td className="p-3 font-bold text-emerald-800">₹1,61,000</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              SETTLED (UTR#8310)
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
