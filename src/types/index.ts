export type UserRole = 'customer' | 'provider' | 'admin';

export interface Venue {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  type: 'lawn' | 'banquet' | 'resort' | 'palace' | 'farmhouse';
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
  cateringPolicy: 'Allowed' | 'In-house only' | 'Veg only';
  decorPolicy: 'In-house only' | 'Outside vendors allowed';
  roomsCount?: number;
  parkingCapacity?: number;
  description: string;
  isVerified: boolean;
  featured?: boolean;
}

export interface ServiceProvider {
  id: string;
  _id?: string;
  name: string;
  category: 'catering' | 'decoration' | 'sound_lighting' | 'rentals' | 'photography';
  categoryLabel: string;
  city: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  priceUnit: string;
  coverImage?: string;
  images: string[];
  cuisines?: string[];
  serviceTypes?: string[];
  dietaryOptions?: string[];
  description: string;
  isVerified: boolean;
  featured?: boolean;
}

export interface PackageSelection {
  venue?: Venue;
  catering?: {
    providerId: string;
    providerName: string;
    cuisine: string;
    plateType: 'veg' | 'non_veg';
    pricePerPlate: number;
    guestCount: number;
  };
  decoration?: {
    providerId: string;
    providerName: string;
    theme: string;
    price: number;
  };
  extras?: {
    soundLighting?: boolean;
    soundPrice?: number;
    photography?: boolean;
    photoPrice?: number;
    furnitureRentals?: boolean;
    furniturePrice?: number;
  };
  eventDate?: string;
  eventType?: string;
  estimatedTotal?: number;
}

export interface Booking {
  id: string;
  _id?: string;
  bookingNumber: string;
  venueName: string;
  venueId: string;
  venueImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  totalPrice: number;
  advanceDeposit: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Pay at Venue';
  paymentStatus: 'paid' | 'deposit_paid' | 'pending';
  createdAt: string;
  packageDetails?: PackageSelection;
  specialRequests?: string;
}

export interface Enquiry {
  id: string;
  _id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  venueId?: string;
  venueName?: string;
  serviceId?: string;
  serviceName?: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  budgetRange: string;
  message?: string;
  status: 'new' | 'in_review' | 'quoted' | 'closed';
  createdAt: string;
}
