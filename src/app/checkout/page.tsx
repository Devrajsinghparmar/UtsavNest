'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
  Sparkles,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const venueName = searchParams.get('venueName') || 'Green Valley Lawn';
  const totalParam = searchParams.get('total') || '350000';
  const depositParam = searchParams.get('deposit') || '87500';
  const dateParam =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const guestsParam = searchParams.get('guests') || '300';

  const [customerName, setCustomerName] = useState('Devraj Singh');
  const [customerEmail, setCustomerEmail] = useState('devraj@example.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [specialNotes, setSpecialNotes] = useState(
    'Please arrange valet parking assistance and early bridal room check-in.'
  );
  const [paymentMethod, setPaymentMethod] = useState<
    'UPI' | 'Card' | 'NetBanking' | 'Pay at Venue'
  >('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRef = `UN-2025-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1000);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Secure Booking Checkout
          </span>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-2">
            Confirm Your Celebration
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Review order details, enter contact credentials, and choose payment mode.
          </p>
        </div>

        {bookingSuccess ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 card-shadow text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                Booking Reference: {bookingRef}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900 mt-3">
                Booking Request Placed!
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                Your reservation request for <strong>{venueName}</strong> has been transmitted. The venue coordinator will verify the slot and send an SMS/WhatsApp confirmation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100 max-w-md mx-auto text-left text-xs space-y-1.5 text-gray-700">
              <div className="flex justify-between">
                <span>Customer:</span>
                <strong className="text-navy-900">{customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Event Date:</span>
                <strong className="text-navy-900">{dateParam}</strong>
              </div>
              <div className="flex justify-between">
                <span>Guest Count:</span>
                <strong className="text-navy-900">{guestsParam} Guests</strong>
              </div>
              <div className="flex justify-between">
                <span>Advance Payable:</span>
                <strong className="text-emerald-700">
                  ₹{Number(depositParam).toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <strong className="text-navy-900">{paymentMethod}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-gold-600 transition-colors"
              >
                Go to My Bookings Dashboard
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ivory-200 text-navy-900 text-xs font-semibold hover:bg-ivory-300 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Summary */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-4">
                <h3 className="font-serif font-bold text-base text-navy-900 border-b border-ivory-200 pb-2">
                  Booking Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-gray-500 text-[11px]">Selected Venue</div>
                    <div className="font-bold text-navy-900 text-sm mt-0.5">{venueName}</div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>{dateParam}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{guestsParam} Expected Guests</span>
                  </div>

                  <div className="pt-3 border-t border-ivory-200 space-y-1.5">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Estimated Cost</span>
                      <span className="font-semibold text-navy-900">
                        ₹{Number(totalParam).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>25% Advance Deposit</span>
                      <span>₹{Number(depositParam).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-2 border-t border-ivory-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Escrow Safe: 100% Refundable if provider cancels.</span>
                </div>
              </div>
            </div>

            {/* Right: Checkout Form */}
            <div className="md:col-span-2">
              <form
                onSubmit={handleConfirmBooking}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-6"
              >
                <div>
                  <h3 className="font-serif font-bold text-lg text-navy-900 mb-4">
                    Host Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Special Notes or Inclusions
                      </label>
                      <textarea
                        rows={2}
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-navy-900 mb-4">
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        id: 'UPI',
                        label: 'UPI (GPay / PhonePe / Paytm)',
                        icon: Smartphone,
                        sub: 'Instant 0% fee',
                      },
                      {
                        id: 'Card',
                        label: 'Credit / Debit Card',
                        icon: CreditCard,
                        sub: 'Visa, Mastercard, RuPay',
                      },
                      {
                        id: 'NetBanking',
                        label: 'Net Banking',
                        icon: Building,
                        sub: 'All major Indian banks',
                      },
                      {
                        id: 'Pay at Venue',
                        label: 'Pay Deposit at Venue',
                        icon: Banknote,
                        sub: 'Pay directly on site visit',
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = paymentMethod === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'border-gold-500 bg-gold-50/40 text-navy-900 font-semibold shadow-xs'
                              : 'border-ivory-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isSelected ? 'text-gold-600' : 'text-gray-500'
                            }`}
                          />
                          <div>
                            <div className="text-xs">{m.label}</div>
                            <div className="text-[10px] text-gray-500">{m.sub}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl gold-gradient text-white font-semibold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>
                    {isSubmitting
                      ? 'Processing Reservation...'
                      : `Confirm Booking (Deposit: ₹${Number(depositParam).toLocaleString(
                          'en-IN'
                        )})`}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
