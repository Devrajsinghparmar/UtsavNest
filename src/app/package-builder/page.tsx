'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Check,
  ChevronRight,
  Sparkles,
  Building2,
  UtensilsCrossed,
  Flower2,
  PlusCircle,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { mockVenues, mockServices } from '@/data/mockData';
import { Venue, ServiceProvider } from '@/types';

export default function PackageBuilderPage() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [selectedVenue, setSelectedVenue] = useState<Venue>(mockVenues[0]);
  const [selectedCatering, setSelectedCatering] = useState<ServiceProvider>(
    mockServices.find((s) => s.category === 'catering') || mockServices[0]
  );
  const [selectedDecor, setSelectedDecor] = useState<ServiceProvider>(
    mockServices.find((s) => s.category === 'decoration') || mockServices[2]
  );
  const [plateCount, setPlateCount] = useState<number>(250);
  const [includeSound, setIncludeSound] = useState<boolean>(true);
  const [includeFurniture, setIncludeFurniture] = useState<boolean>(false);
  const [includePhoto, setIncludePhoto] = useState<boolean>(true);

  // Price calculations
  const venuePrice = selectedVenue ? selectedVenue.pricePerDay : 0;
  const cateringPrice = (selectedCatering?.startingPrice || 1100) * plateCount;
  const decorPrice = selectedDecor ? selectedDecor.startingPrice : 45000;
  const soundPrice = includeSound ? 35000 : 0;
  const furniturePrice = includeFurniture ? 25000 : 0;
  const photoPrice = includePhoto ? 40000 : 0;

  const subTotal =
    venuePrice + cateringPrice + decorPrice + soundPrice + furniturePrice + photoPrice;
  const gst = Math.round(subTotal * 0.18);
  const grandTotal = subTotal + gst;
  const advanceDeposit = Math.round(grandTotal * 0.25);

  const steps = [
    { num: 1, label: 'Venue', icon: Building2 },
    { num: 2, label: 'Catering', icon: UtensilsCrossed },
    { num: 3, label: 'Decoration', icon: Flower2 },
    { num: 4, label: 'Extras', icon: PlusCircle },
    { num: 5, label: 'Review', icon: Calculator },
  ];

  const handleProceedToCheckout = () => {
    const query = new URLSearchParams({
      venueId: selectedVenue.id,
      venueName: selectedVenue.name,
      total: grandTotal.toString(),
      deposit: advanceDeposit.toString(),
      guests: plateCount.toString(),
    }).toString();
    router.push(`/checkout?${query}`);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Curated All-In-One Bundles
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 mt-2">
          Build Your Event Package
        </h1>
        <p className="text-sm text-gray-600 mt-1 max-w-xl mx-auto">
          Choose the services you need, see live itemized pricing, and eliminate double-booking worries.
        </p>

        {/* 5-Step Visual Stepper (Screen 5 of prototype) */}
        <div className="mt-8 max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-2xl border border-ivory-300 card-shadow flex items-center justify-between">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => setStep(s.num)}
                  className="flex items-center gap-1.5 focus:outline-none"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-700 text-white'
                        : isCurrent
                        ? 'bg-gold-500 text-white ring-4 ring-gold-200'
                        : 'bg-ivory-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${
                      isCurrent ? 'text-navy-900' : 'text-gray-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      step > s.num ? 'bg-emerald-600' : 'bg-ivory-300'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Step Selector (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select Venue */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-4">
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  Step 1: Select Your Venue
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockVenues.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVenue(v)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedVenue.id === v.id
                          ? 'border-gold-500 bg-gold-50/30 shadow-md'
                          : 'border-ivory-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="relative h-32 w-full rounded-lg overflow-hidden mb-2">
                        <Image src={v.coverImage} alt={v.name} fill className="object-cover" />
                      </div>
                      <h4 className="font-serif font-bold text-sm text-navy-900">{v.name}</h4>
                      <p className="text-xs text-gray-500">{v.location}</p>
                      <div className="text-xs font-bold text-gold-700 mt-2">
                        ₹{v.pricePerDay.toLocaleString('en-IN')} / day
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Catering */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-navy-900">
                      Step 2: Master Chefs & Catering
                    </h3>
                    <p className="text-xs text-gray-500">
                      Choose master banquet chefs for your guest feast.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-gray-700">Guest Count:</span>
                    <input
                      type="number"
                      value={plateCount}
                      onChange={(e) => setPlateCount(Number(e.target.value))}
                      className="w-24 p-1.5 rounded-lg border border-ivory-300 text-center font-bold text-navy-900"
                      min="50"
                      max="2000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockServices
                    .filter((s) => s.category === 'catering')
                    .map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCatering(cat)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedCatering.id === cat.id
                            ? 'border-gold-500 bg-gold-50/30 shadow-md'
                            : 'border-ivory-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="relative h-32 w-full rounded-lg overflow-hidden mb-2">
                          <Image src={cat.coverImage || '/images/image_2.jpg'} alt={cat.name} fill className="object-cover" />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-navy-900">{cat.name}</h4>
                        <p className="text-xs text-gray-500">{cat.description.slice(0, 70)}...</p>
                        <div className="text-xs font-bold text-gold-700 mt-2">
                          ₹{cat.startingPrice} / plate ({plateCount} plates = ₹
                          {(cat.startingPrice * plateCount).toLocaleString('en-IN')})
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Step 3: Decoration */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-4">
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  Step 3: Floral & Theme Decoration
                </h3>
                <p className="text-xs text-gray-500">
                  Select your mandap setup, floral entry arches, and stage backdrop.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockServices
                    .filter((s) => s.category === 'decoration')
                    .concat([
                      {
                        id: 'dec-royal',
                        name: 'Royal Heritage Gold & Red Theme',
                        category: 'decoration',
                        categoryLabel: 'Decor & Theme',
                        city: 'Jaipur',
                        rating: 4.9,
                        reviewsCount: 77,
                        startingPrice: 65000,
                        priceUnit: 'per event',
                        coverImage: '/images/image_3.jpg',
                        images: ['/images/image_3.jpg'],
                        description: 'Majestic gold-carved pillars, red rose cascading garlands, and velvet seating.',
                        isVerified: true,
                      },
                    ])
                    .map((dec) => (
                      <div
                        key={dec.id}
                        onClick={() => setSelectedDecor(dec)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedDecor.id === dec.id
                            ? 'border-gold-500 bg-gold-50/30 shadow-md'
                            : 'border-ivory-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="relative h-32 w-full rounded-lg overflow-hidden mb-2">
                          <Image src={dec.coverImage || '/images/image_3.jpg'} alt={dec.name} fill className="object-cover" />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-navy-900">{dec.name}</h4>
                        <div className="text-xs font-bold text-gold-700 mt-2">
                          ₹{dec.startingPrice.toLocaleString('en-IN')} package
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Step 4: Extras */}
            {step === 4 && (
              <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-4">
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  Step 4: Additional Celebration Add-ons
                </h3>
                <p className="text-xs text-gray-500">
                  Add audiovisual equipment, luxury lounge seating, and wedding photography.
                </p>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 rounded-xl border border-ivory-300 hover:bg-ivory-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeSound}
                        onChange={(e) => setIncludeSound(e.target.checked)}
                        className="rounded text-gold-600 focus:ring-gold-500 w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-navy-900">
                          JBL Line Array Sound & Truss Intelligent Lighting
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Full DJ sound system, wireless mics, moving head lights, smoke machine
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-gold-700">₹35,000</div>
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-xl border border-ivory-300 hover:bg-ivory-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeFurniture}
                        onChange={(e) => setIncludeFurniture(e.target.checked)}
                        className="rounded text-gold-600 focus:ring-gold-500 w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-navy-900">
                          Royal Furniture & Velvet Maharaja Sofas
                        </div>
                        <div className="text-[11px] text-gray-500">
                          100 Chiavari gold chairs, 4 velvet diwans, cocktail tables
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-gold-700">₹25,000</div>
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-xl border border-ivory-300 hover:bg-ivory-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includePhoto}
                        onChange={(e) => setIncludePhoto(e.target.checked)}
                        className="rounded text-gold-600 focus:ring-gold-500 w-4 h-4"
                      />
                      <div>
                        <div className="text-xs font-bold text-navy-900">
                          Cinematic 4K Photography & Drone Coverage
                        </div>
                        <div className="text-[11px] text-gray-500">
                          2 traditional photographers + 1 candid + 1 4K drone videographer
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-gold-700">₹40,000</div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-navy-900">
                      Step 5: Review Your Custom Package
                    </h3>
                    <p className="text-xs text-gray-500">
                      Complete transparency. All items confirmed with vetted suppliers.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-ivory-100">
                    <span className="font-semibold text-navy-900">Venue: {selectedVenue.name}</span>
                    <span className="font-bold">₹{venuePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-ivory-100">
                    <span className="font-semibold text-navy-900">
                      Catering: {selectedCatering.name} ({plateCount} plates)
                    </span>
                    <span className="font-bold">₹{cateringPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-ivory-100">
                    <span className="font-semibold text-navy-900">Decor: {selectedDecor.name}</span>
                    <span className="font-bold">₹{decorPrice.toLocaleString('en-IN')}</span>
                  </div>
                  {includeSound && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-ivory-100">
                      <span className="font-semibold text-navy-900">JBL Sound & Dynamic Lights</span>
                      <span className="font-bold">₹{soundPrice.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {includeFurniture && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-ivory-100">
                      <span className="font-semibold text-navy-900">Royal Furniture Set</span>
                      <span className="font-bold">₹{furniturePrice.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {includePhoto && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-ivory-100">
                      <span className="font-semibold text-navy-900">Cinematic 4K Photography</span>
                      <span className="font-bold">₹{photoPrice.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-xl gold-gradient text-white font-semibold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Lock Package & Proceed to Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="px-5 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900 disabled:opacity-40 hover:bg-ivory-100"
              >
                Back
              </button>
              {step < 5 && (
                <button
                  onClick={() => setStep((prev) => Math.min(5, prev + 1))}
                  className="px-6 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-gold-600 transition-colors"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Live Itemized Price Tally */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow sticky top-28 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-ivory-200">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <h4 className="font-serif font-bold text-navy-900 text-base">
                  Package Estimate Tally
                </h4>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Venue Rental</span>
                  <span className="font-semibold">₹{venuePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Food ({plateCount} plates)</span>
                  <span className="font-semibold">₹{cateringPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Theme Decor</span>
                  <span className="font-semibold">₹{decorPrice.toLocaleString('en-IN')}</span>
                </div>
                {includeSound && (
                  <div className="flex justify-between">
                    <span>Audiovisual / DJ</span>
                    <span className="font-semibold">₹{soundPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {includeFurniture && (
                  <div className="flex justify-between">
                    <span>Furniture Rentals</span>
                    <span className="font-semibold">₹{furniturePrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {includePhoto && (
                  <div className="flex justify-between">
                    <span>Photography</span>
                    <span className="font-semibold">₹{photoPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-ivory-200 flex justify-between text-gray-500">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 border-t border-navy-900/10 flex justify-between text-sm font-bold text-navy-900 font-serif">
                  <span>Estimated Total</span>
                  <span className="text-gold-700">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px]">
                  <strong>25% Advance to Reserve:</strong> ₹{advanceDeposit.toLocaleString('en-IN')}
                </div>
              </div>

              {step < 5 ? (
                <button
                  onClick={() => setStep(5)}
                  className="w-full py-2.5 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-gold-600 transition-colors"
                >
                  Review Summary
                </button>
              ) : (
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 gold-gradient text-white rounded-xl text-xs font-semibold shadow hover:brightness-105 transition-all"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
