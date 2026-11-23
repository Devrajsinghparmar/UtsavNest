'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  BadgeIndianRupee,
  CheckCircle,
  XCircle,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { mockVenues, mockServices } from '@/data/mockData';

export default function AdminDashboardPage() {
  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 'v-101',
      name: 'Udaipur Mewar Banquet & Lawns',
      city: 'Udaipur',
      type: 'Banquet & Lawn',
      fssaiDoc: 'FSSAI-12224010000492.pdf',
      capacity: '800 Guests',
      status: 'pending',
    },
    {
      id: 'v-102',
      name: 'Shehnai Master Catering & Tandoor',
      city: 'Jaipur',
      type: 'Catering',
      fssaiDoc: 'FSSAI-12223010000811.pdf',
      capacity: 'Buffet up to 1500',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v))
    );
  };

  const handleReject = (id: string) => {
    setPendingVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v))
    );
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-navy-900 bg-ivory-200 px-3 py-1 rounded-full border border-ivory-300">
            Administrative Control Center
          </span>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-2">
            UtsavNest Admin Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Vendor compliance, FSSAI verification, booking transactions, and platform governance.
          </p>
        </div>

        {/* 4 Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Active Venues</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-navy-900 mt-2">
              {mockVenues.length + 18}
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">+4 added this week</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Service Providers</span>
              <Users className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-navy-900 mt-2">
              {mockServices.length + 32}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">Caterers, Decor & Sound</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Total Booking Volume</span>
              <BadgeIndianRupee className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-navy-900 mt-2">
              ₹48,50,000
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">Escrow secured</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-ivory-300 card-shadow">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Platform Take / Fee</span>
              <ShieldCheck className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-navy-900 mt-2">
              ₹4,85,000
            </div>
            <div className="text-[11px] text-gray-500 mt-1">10% Average Margin</div>
          </div>
        </div>

        {/* Verification Queue (Blueprint Section 9 requirement) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-300 card-shadow space-y-4">
          <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-navy-900">
                Vendor Compliance & Verification Queue
              </h3>
              <p className="text-xs text-gray-500">
                Verify FSSAI certificates, premises fire NOC, and bank settlement details before listing publicly.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
              {pendingVendors.filter((v) => v.status === 'pending').length} Pending Audits
            </span>
          </div>

          <div className="divide-y divide-ivory-200">
            {pendingVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-navy-900 text-sm">{vendor.name}</h4>
                    <span className="text-[10px] bg-ivory-200 text-gray-700 px-2 py-0.5 rounded">
                      {vendor.city}
                    </span>
                    <span className="text-[10px] bg-navy-100 text-navy-800 px-2 py-0.5 rounded">
                      {vendor.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-gold-700 font-mono">
                      <FileText className="w-3.5 h-3.5" />
                      {vendor.fssaiDoc}
                    </span>
                    <span>•</span>
                    <span>Capacity: {vendor.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {vendor.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(vendor.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => handleReject(vendor.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                        vendor.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {vendor.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
