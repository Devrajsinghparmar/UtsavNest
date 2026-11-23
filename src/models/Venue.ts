import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVenue extends Document {
  name: string;
  slug: string;
  type: string;
  typeLabel: string;
  city: string;
  location: string;
  address: string;
  rating: number;
  reviewsCount: number;
  capacityMin: number;
  capacityMax: number;
  pricePerDay: number;
  pricePerPlateVeg?: number;
  pricePerPlateNonVeg?: number;
  images: string[];
  coverImage: string;
  amenities: string[];
  cateringPolicy: string;
  decorPolicy: string;
  roomsCount?: number;
  parkingCapacity?: number;
  description: string;
  isVerified: boolean;
  featured: boolean;
  createdAt: Date;
}

const VenueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    typeLabel: { type: String, required: true },
    city: { type: String, required: true, index: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    capacityMin: { type: Number, required: true },
    capacityMax: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    pricePerPlateVeg: { type: Number },
    pricePerPlateNonVeg: { type: Number },
    images: [{ type: String }],
    coverImage: { type: String, required: true },
    amenities: [{ type: String }],
    cateringPolicy: { type: String, default: 'Allowed' },
    decorPolicy: { type: String, default: 'Outside vendors allowed' },
    roomsCount: { type: Number, default: 0 },
    parkingCapacity: { type: Number, default: 0 },
    description: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const VenueModel: Model<IVenue> =
  mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema);

export default VenueModel;
