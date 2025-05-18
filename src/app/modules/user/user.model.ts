import mongoose, { Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { IUserRole } from './user.constant';

// Create the User schema based on the interface
const userSchema = new Schema<IUser, UserModel>(
   {
      name: {type:String, required:true},
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: [IUserRole.ADMIN, IUserRole.TENANT, IUserRole.LANDLORD],
         default: IUserRole.TENANT,
      },
      image:{
         type:String,
      },
      address: {
         street: { type: String },
         city: { type: String },
         zipCode: { type: String },
         country:{type:String}
       },
       phone:{
         type:String,   
       },
      lastLogin: {
         type: Date,
         default: Date.now,
      },
      isActive: {
         type: Boolean,
         default: true,
      },
      isDeleted:{
         type:Boolean,
         default:false
      },
      needsPasswordChange:{
         type:Boolean,
         default:true
      }

   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', async function (next) {
   const user = this;
   user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
   );
})


userSchema.post('save', function (doc, next) {
   doc.password = '';
   next();
});

userSchema.set('toJSON', {
   transform: (_doc, ret) => {
      delete ret.password;
      return ret;
   },
});

userSchema.statics.isPasswordMatched = async function (
   plainTextPassword,
   hashedPassword
) {

   const result=  await bcrypt.compare(plainTextPassword, hashedPassword);
   console.log('match', result)
   return result
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
   return await User.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExist = async function (userId: string) {
   const existingUser = await this.findById(userId);

   if (!existingUser) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
   }

   if (!existingUser.isActive) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User is not active!');
   }

   return existingUser;
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;
