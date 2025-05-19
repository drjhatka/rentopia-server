import { Document } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface LandlordBankDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  branch?: string;
  swiftCode?: string;
  iban?: string;
}

export interface LandlordCompany {
  name?: string;
  //registrationNumber?: string;
  //taxId?: string;
  contactPerson?: string;
  website?: string;
  phone?:string;
}

export type IDocumentType = 
    | 'government-id' 
    | 'passport' 
    | 'driver-license' 
    | 'property-deed' 
    | 'business-license'
    | 'tax-certificate'
    | 'other';
  


export interface IVerificationDocument {
  documentType: 
    | 'government-id' 
    | 'passport' 
    | 'driver-license' 
    | 'property-deed' 
    | 'business-license'
    | 'tax-certificate'
    | 'other';
  
  // Storage references
  documentUrl: string;
  thumbnailUrl?: string;
  fileType?: string; // 'image/jpeg', 'application/pdf'
  fileSize?: number; // bytes
  
  // Image metadata
  imageDimensions?: {
    width?: number;
    height?: number;
  };
  
  // Original file info
  originalFilename?: string;
  
  // Verification status
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  
  // Timestamps
  uploadedAt: Date;
  reviewedAt?: Date;
  expiresAt?: Date;
}

export interface PropertyManagementSettings {
  autoGenerateInvoices?: boolean;
  lateFeePercentage?: number;
  paymentReminderDays?: number[];
  defaultLeaseTerms?: {
    durationMonths: number;
    securityDepositMonths: number;
  };
}

export interface ILandlord extends Document {
  // Core References
  userId: IUser['_id']; // Required reference to User
  
  // Business Information
  company?: LandlordCompany;
  taxIdentificationNumber?: string;
  //yearsOfExperience?: number;
  portfolioSize?: number; // Total properties managed
  
  // Financial Information
  bankDetails?: LandlordBankDetails;
  preferredPaymentMethod?: 'bank-transfer' | 'check' | 'digital-wallet';
  paymentCurrency?: string;
  
  // Verification System
  verificationStatus?: 'verified' | 'pending' | 'unverified';
  verificationDocuments?: IVerificationDocument[];
  verificationScore?: number; // 0-100 rating
  
  // Rental Policies
  rentalPolicy?: {
    securityDepositMonths: number;
    noticePeriodDays: number;
    petPolicy?: 'allowed' | 'restricted' | 'not-allowed';
    smokingPolicy?: 'allowed' | 'outside-only' | 'not-allowed';

  };
  
  // Property Management
  propertiesOwned?: number;
  propertiesManaged?: number;
  managementSettings?: PropertyManagementSettings;
  
  // Communication Preferences
  notificationPreferences?: {
    emailAlerts?: boolean;
    smsAlerts?: boolean;
    pushNotifications?: boolean;
  };
  
  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  lastActiveAt?: Date;
  metadata?: Record<string, unknown>;
}

// Searchable fields constant
export const LandlordSearchableFields = [
  'company.name',
  'taxIdentificationNumber',
  'verificationStatus'
];

// Populate options for queries
export const LandlordPopulateOptions = [
  {
    path: 'user',
    select: 'name email phone role'
  },
  {
    path: 'verificationDocuments',
    match: { status: 'approved' }
  }
];