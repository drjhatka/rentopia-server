import { IUser} from './user.interface';
import User from './user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { IJwtPayload } from '../auth/auth.interface';
import { IUserSearchableFields } from './user.constant';
import { validateUserAttributes } from './user.utils';

// Function to register user
const registerUser = async (userData: IUser) => {

   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      
      // Check if the user already exists by email
      const existingUser = await User.findOne({ email: userData.email }).session(session);
      if (existingUser) {
         throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Email is already registered');
      }
      // Create the user
      const user = new User(userData);
      const createdUser = await user.save({ session });
      //save data and commit session transaction
      await createdUser.save({ session });
      await session.commitTransaction();
      return await AuthService.loginUser({ email: createdUser.email, password: userData.password});
   } catch (error) {
      if (session.inTransaction()) {await session.abortTransaction()}
         throw error;
   } finally {
      session.endSession();
   }
};



const getAllUser = async (query: Record<string, unknown>) => {
   const UserQuery = new QueryBuilder(User.find(), query)
      .search(IUserSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

   const result = await UserQuery.modelQuery;
   const meta = await UserQuery.countTotal();
   return {
      result,
      meta,
   };
};

const myProfile = async (authUser: IJwtPayload) => {
   const userOrNull = await User.findById(authUser.userId);
   validateUserAttributes(userOrNull)
   return userOrNull;
}

const updateProfile = async (
   payload: Partial<IUser>,
   authUser: IJwtPayload
) => {
   const userOrNull = await User.findById(authUser.userId);
   validateUserAttributes(userOrNull)

   const result = await User.findOneAndUpdate({ user: authUser.userId }, payload, 
      {new: true}// return the updated document instead of modified count.
   )
   return result;
};

const updateUserStatus = async (userId: string) => {
   const user = await User.findById(userId);
   if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
   }
   user.isActive = !user.isActive;
   const updatedUser = await user.save();
   return updatedUser;
};

export const UserServices = {
   registerUser,
   getAllUser,
   myProfile,
   updateUserStatus,
   updateProfile,
};
