import { IUserRole } from "../modules/user/user.constant";

export type VerifiedUser = {
   email: string;
   role: IUserRole;
   iat: number;
   exp: number;
};
