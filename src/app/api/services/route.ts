import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ServiceModel from '@/models/Service';
import { mockServices } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');

  try {
    const db = await connectToDatabase();
    if (db) {
      const query: Record<string, unknown> = {};
      if (category && category !== 'All') query.category = category;
      if (city && city !== 'All') query.city = new RegExp(city, 'i');

      const dbServices = await ServiceModel.find(query).lean();
      if (dbServices && dbServices.length > 0) {
        return NextResponse.json({ success: true, count: dbServices.length, data: dbServices });
      }
    }
  } catch (err: unknown) {
    console.warn('[API Services] DB error, using fallback');
  }

  const filtered = filterMock(category, city);
  return NextResponse.json({ success: true, count: filtered.length, data: filtered });
}

function filterMock(category?: string | null, city?: string | null) {
  let list = [...mockServices];
  if (category && category !== 'All') {
    list = list.filter((s) => s.category === category);
  }
  if (city && city !== 'All') {
    list = list.filter((s) => s.city.toLowerCase() === city.toLowerCase());
  }
  return list;
}
