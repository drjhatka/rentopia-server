import { z } from 'zod';
import { IUserRole } from './user.constant';


const userCreateValidationSchema = z.object({
   body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
      name: z.string().min(1, 'Name is required'),
      role: z.enum([IUserRole.ADMIN, IUserRole.LANDLORD,IUserRole.TENANT]).default(IUserRole.TENANT), 
   })
});



export const UserValidation = {
   userCreateValidationSchema,
};
