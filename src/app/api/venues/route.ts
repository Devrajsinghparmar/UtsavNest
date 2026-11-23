import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import VenueModel from '@/models/Venue';
import { mockVenues } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const capacity = searchParams.get('capacity');
  const q = searchParams.get('q')?.toLowerCase();

  try {
    const db = await connectToDatabase();
    if (db) {
      const query: Record<string, unknown> = {};
      if (city && city !== 'All') query.city = new RegExp(city, 'i');
      if (type && type !== 'All') query.type = type;
      if (q) {
        query.$or = [
          { name: new RegExp(q, 'i') },
          { location: new RegExp(q, 'i') },
          { description: new RegExp(q, 'i') },
        ];
      }

      const dbVenues = await VenueModel.find(query).sort({ featured: -1, rating: -1 }).lean();
      if (dbVenues && dbVenues.length > 0) {
        return NextResponse.json({ success: true, count: dbVenues.length, data: dbVenues });
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    console.warn('[API Venues] Database lookup failed, using local mock store:', message);
  }

  // Graceful fallback to mock data
  const filtered = filterMockVenues(city, type, capacity, q);
  return NextResponse.json({ success: true, count: filtered.length, data: filtered, source: 'local_fallback' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();
    if (db) {
      const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newVenue = await VenueModel.create({ ...body, slug });
      return NextResponse.json({ success: true, data: newVenue }, { status: 201 });
    }
    return NextResponse.json({
      success: true,
      message: 'Venue recorded in local prototype mode',
      data: { ...body, id: `venue-${Date.now()}` },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create venue';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

function filterMockVenues(city?: string | null, type?: string | null, capacity?: string | null, q?: string | null) {
  let list = [...mockVenues];
  if (city && city !== 'All') {
    list = list.filter((v) => v.city.toLowerCase() === city.toLowerCase());
  }
  if (type && type !== 'All') {
    list = list.filter((v) => v.type.toLowerCase() === type.toLowerCase());
  }
  if (capacity) {
    if (capacity === 'up_to_300') list = list.filter((v) => v.capacityMin <= 300);
    if (capacity === '300_to_1000') list = list.filter((v) => v.capacityMax >= 300 && v.capacityMin <= 1000);
    if (capacity === '1000_plus') list = list.filter((v) => v.capacityMax >= 1000);
  }
  if (q) {
    list = list.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }
  return list;
}
