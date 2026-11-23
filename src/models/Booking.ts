import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  bookingNumber: string;
  venueId: string;
  venueName: string;
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
  specialRequests?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingNumber: { type: String, required: true, unique: true },
    venueId: { type: String, required: true },
    venueName: { type: String, required: true },
    venueImage: { type: String, default: '/images/image_1.jpg' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventType: { type: String, required: true },
    guestCount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    advanceDeposit: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Card', 'NetBanking', 'Pay at Venue'],
      default: 'UPI',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'deposit_paid', 'pending'],
      default: 'pending',
    },
    specialRequests: { type: String },
  },
  { timestamps: true }
);

export const BookingModel: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default BookingModel;
