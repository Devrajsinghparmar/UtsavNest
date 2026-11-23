import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';
import { mockBookings } from '@/data/mockData';

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const bookings = await BookingModel.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, count: bookings.length, data: bookings });
    }
  } catch (err: unknown) {
    console.warn('[API Bookings] DB lookup error, using mock bookings');
  }

  return NextResponse.json({ success: true, count: mockBookings.length, data: mockBookings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    const bookingNumber = `UN-2025-${Math.floor(1000 + Math.random() * 9000)}`;

    if (db) {
      const newBooking = await BookingModel.create({
        ...body,
        bookingNumber,
        status: 'pending',
      });
      return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
    }

    return NextResponse.json({
      success: true,
      data: { ...body, id: `bk-${Date.now()}`, bookingNumber, status: 'pending' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Booking creation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
