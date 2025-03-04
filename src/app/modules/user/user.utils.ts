import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { IUser } from "./user.interface";

export const validateUserAttributes = (user:IUser|null)=>{
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
     }
     if (!user.isActive) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
     }
     if (user.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted!");
     }
  
}