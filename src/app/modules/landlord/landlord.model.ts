import { Schema, model, Types } from 'mongoose';
import { ILandlord, LandlordBankDetails, LandlordCompany, IVerificationDocument, PropertyManagementSettings } from './landlord.interface';
import { IUser } from '../user/user.interface';

// Sub-schema for Bank Details
const BankDetailsSchema = new Schema<LandlordBankDetails>({
  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  bankName: { type: String, required: true },
  branch: { type: String },
  swiftCode: { type: String },
  iban: { type: String }
}, { _id: false });

// Sub-schema for Company
const CompanySchema = new Schema<LandlordCompany>({
  name: { type: String },
  contactPerson: { type: String },
  website: { type: String },
  phone: { type: String }
}, { _id: false });

// Sub-schema for Verification Documents
const VerificationDocumentSchema = new Schema<IVerificationDocument>({
  documentType: { 
    type: String, 
    required: true,
    enum: ['government-id', 'passport', 'driver-license', 'property-deed', 'business-license', 'tax-certificate', 'other']
  },
  documentUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  fileType: { type: String },
  fileSize: { type: Number },
  imageDimensions: {
    width: { type: Number },
    height: { type: Number }
  },
  originalFilename: { type: String },
  status: { 
    type: String, 
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  expiresAt: { type: Date }
}, { _id: false });

// Sub-schema for Property Management Settings
const PropertyManagementSettingsSchema = new Schema<PropertyManagementSettings>({
  autoGenerateInvoices: { type: Boolean, default: false },
  lateFeePercentage: { type: Number, min: 0, max: 100 },
  paymentReminderDays: { type: [Number] },
  defaultLeaseTerms: {
    durationMonths: { type: Number },
    securityDepositMonths: { type: Number }
  }
}, { _id: false });

// Sub-schema for Rental Policy
const RentalPolicySchema = new Schema({
  securityDepositMonths: { type: Number, default: 1 },
  noticePeriodDays: { type: Number, default: 30 },
  petPolicy: { 
    type: String, 
    enum: ['allowed', 'restricted', 'not-allowed'],
    default: 'restricted'
  },
  smokingPolicy: { 
    type: String, 
    enum: ['allowed', 'outside-only', 'not-allowed'],
    default: 'not-allowed'
  }
}, { _id: false });

// Sub-schema for Notification Preferences
const NotificationPreferencesSchema = new Schema({
  emailAlerts: { type: Boolean, default: true },
  smsAlerts: { type: Boolean, default: false },
  pushNotifications: { type: Boolean, default: true }
}, { _id: false });

// Main Landlord Schema
const LandlordSchema = new Schema<ILandlord>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true 
  },
  
  // Business Information
  company: { type: CompanySchema },
  taxIdentificationNumber: { type: String },
  portfolioSize: { type: Number, default: 0 },
  
  // Financial Information
  bankDetails: { type: BankDetailsSchema },
  preferredPaymentMethod: { 
    type: String, 
    enum: ['bank-transfer', 'check', 'digital-wallet'] 
  },
  paymentCurrency: { type: String, default: 'USD' },
  
  // Verification System
  verificationStatus: { 
    type: String, 
    enum: ['verified', 'pending', 'unverified'],
    default: 'unverified'
  },
  verificationDocuments: { type: [VerificationDocumentSchema] },
  verificationScore: { type: Number, min: 0, max: 100 },
  
  // Rental Policies
  rentalPolicy: { type: RentalPolicySchema },
  
  // Property Management
  propertiesOwned: { type: Number, default: 0 },
  propertiesManaged: { type: Number, default: 0 },
  managementSettings: { type: PropertyManagementSettingsSchema },
  
  // Communication Preferences
  notificationPreferences: { type: NotificationPreferencesSchema },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date },
  metadata: { type: Schema.Types.Mixed }
});

// Update timestamps on save
LandlordSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to find by user ID
LandlordSchema.statics.findByUserId = function(userId: Types.ObjectId) {
  return this.findOne({ userId }).populate('userId');
};

// Static method to update verification status
LandlordSchema.statics.updateVerificationStatus = function(
  landlordId: Types.ObjectId, 
  status: 'verified' | 'pending' | 'unverified'
) {
  return this.findByIdAndUpdate(
    landlordId,
    { verificationStatus: status },
    { new: true }
  );
};

// Indexes
LandlordSchema.index({ userId: 1 }, { unique: true });
LandlordSchema.index({ verificationStatus: 1 });
LandlordSchema.index({ 'company.name': 'text' });

// Create and export the model
const LandlordModel = model<ILandlord>('Landlord', LandlordSchema);
export default LandlordModel;