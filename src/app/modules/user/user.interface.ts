import { Document, Model } from 'mongoose';
import { Address, FullName, IUserRole } from './user.constant';

export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   role: IUserRole;
   image?:string;
   address?:Address;
   phone?:string;
   lastLogin?: Date;
   isActive: boolean;
   isDeleted: boolean;
   needsPasswordChange:boolean;
   createdAt?: Date;
   updatedAt?: Date;
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
