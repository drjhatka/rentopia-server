import mongoose, { Schema, Document } from 'mongoose';
import { IRentalListing } from './rental.interface';

// Define the TypeScript interface extending Document


// Mongoose Schema Definition
const RentalListingSchema = new Schema<IRentalListing>(
   {
      title: { type: String, required: true },
      landlordId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the User model
      description: { type: String, required: true },
      location: { type: String, required: true },
      beds: { type: Number, required: true },
      baths: { type: Number, required: true },
      type: { type: String, enum: ['apartment', 'condo', 'house'], required: true },
      category: { type: String, enum: ['long-term', 'short-term'], required: true },
      availability: { type: String, enum: ['available', 'booked'], required: true },

      rating: { type: Number, default: 0 },
      reviews: { type: [String], default: [] },
      rent: { type: Number, required: true },
      amenities: { type: [String], default: [] },
      availableFrom: { type: Date },
      availableUntil: { type: Date },
      images: { type: [String], required: true },
   },
   { timestamps: true }
);

// Create and export the Mongoose model
const Rental = mongoose.model<IRentalListing>('Rental', RentalListingSchema);
export default Rental;
