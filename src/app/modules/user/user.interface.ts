import { Document, Model } from 'mongoose';
import { Address, FullName, IUserRole } from './user.constant';

export interface IUser extends Document {
   name: FullName;
   email: string;
   password: string;
   role: IUserRole;
   image?: string;
   address?: Address;
   isActive: boolean;
   isDeleted: boolean;
   needsPasswordChange: boolean;
   phone?: string;
   profilePicture?: string;
   isVerified?: boolean;
   resetPasswordToken?: string;
   resetPasswordExpires?: Date;
   lastLogin?: Date;
   createdAt?: Date;
   updatedAt?: Date;
   metadata?: Record<string, unknown>; // For any additional unstructured data
}

export interface UserModel extends Model<IUser> {
   //instance methods for checking if passwords are matched
   isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
   ): Promise<boolean>;
   isUserExistsByEmail(id: string): Promise<IUser>;
   checkUserExist(userId: string): Promise<IUser>;
}
