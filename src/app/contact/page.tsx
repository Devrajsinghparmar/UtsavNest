'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      {/* Hero Banner (Screen 10 of prototype) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/image_1.jpg')` }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-2">
              Contact UtsavNest
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Need assistance finding a venue or customized event package? Our wedding coordinators are ready to help.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-ivory-300 card-shadow space-y-6">
              <h3 className="font-serif font-bold text-lg text-navy-900 border-b border-ivory-200 pb-3">
                Our Head Office
              </h3>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-900 block">Jaipur Office</strong>
                    <span>124 Celebration Street, C-Scheme, Jaipur, Rajasthan - 302001</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-navy-900 block">Phone Support</strong>
                    <span>+91 98765 43210 / 0141-2859400</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <strong className="text-navy-900 block">Email Inquiries</strong>
                    <span>support@utsavnest.in</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <div>
                    <strong className="text-navy-900 block">Working Hours</strong>
                    <span>Mon - Sun: 9:00 AM - 9:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Map Card (Screen 10 of prototype) */}
            <div className="bg-white rounded-2xl p-5 border border-ivory-300 card-shadow text-center">
              <div className="h-36 bg-ivory-100 rounded-xl flex flex-col items-center justify-center text-xs text-gray-600 border border-ivory-300">
                <MapPin className="w-6 h-6 text-gold-600 mb-1 animate-bounce" />
                <span className="font-semibold text-navy-900">UtsavNest Headquarters</span>
                <span className="text-[11px] text-gray-500">C-Scheme, Jaipur, Rajasthan</span>
              </div>
            </div>
          </div>

          {/* Send Message Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow">
              {sent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-navy-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Thank you for reaching out. An event coordinator from our Jaipur office will call or message you shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-5 py-2 text-xs font-semibold rounded-xl bg-navy-900 text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-navy-900">
                      Send Us a Message
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Tell us about your event date, expected guest count, or inquiry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Message / Event Requirements *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your event date, venue preference, catering choices, and any questions..."
                        className="w-full text-xs p-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-navy-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl gold-gradient text-white font-semibold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Coordinator</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
