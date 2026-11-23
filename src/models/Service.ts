import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  name: string;
  category: string;
  categoryLabel: string;
  city: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  priceUnit: string;
  coverImage: string;
  images: string[];
  cuisines?: string[];
  serviceTypes?: string[];
  dietaryOptions?: string[];
  description: string;
  isVerified: boolean;
  featured: boolean;
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    categoryLabel: { type: String, required: true },
    city: { type: String, required: true, index: true },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    startingPrice: { type: Number, required: true },
    priceUnit: { type: String, default: 'per event' },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    cuisines: [{ type: String }],
    serviceTypes: [{ type: String }],
    dietaryOptions: [{ type: String }],
    description: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default ServiceModel;
