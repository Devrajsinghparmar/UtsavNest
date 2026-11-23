import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
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
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    venueId: { type: String },
    venueName: { type: String },
    serviceId: { type: String },
    serviceName: { type: String },
    eventDate: { type: String, required: true },
    eventType: { type: String, required: true },
    guestCount: { type: Number, required: true },
    budgetRange: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['new', 'in_review', 'quoted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const EnquiryModel: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export default EnquiryModel;
