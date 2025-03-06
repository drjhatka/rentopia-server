import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import Rental from './rental.schema';
import AppError from '../../errors/appError';
import catchAsync from '../../utils/catchAsync';

// CREATE a new rental listing
export const createRental = catchAsync(async (req,  res, next) => {
      const rental = await Rental.create(req.body);
      res.status(StatusCodes.CREATED).json({ success: true, data: rental });
});

// GET all rental listings
export const getRentals =  catchAsync(async(req, res, next) => {
     // const rentals = await Rental.find().populate('users', 'name email');
      const rentals = await Rental.find();
      res.status(StatusCodes.OK).json({ success: true, data: rentals });
});

// GET a single rental listing by ID
export const getRentalById = async (req: Request, res: Response) => {
   try {
      const rental = await Rental.findById(req.params.id).populate('landlordId', 'name email');
      if (!rental) {
         throw new AppError(StatusCodes.NOT_FOUND, 'Rental listing not found');
      }
      res.status(StatusCodes.OK).json({ success: true, data: rental });
   } catch (error:any) {
      res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
   }
};

// UPDATE a rental listing by ID
export const updateRental = async (req: Request, res: Response) => {
   try {
      const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
         new: true, // Return updated document
         runValidators: true, // Validate before updating
      });

      if (!rental) {
         throw new AppError(StatusCodes.NOT_FOUND, 'Rental listing not found');
      }

      res.status(StatusCodes.OK).json({ success: true, data: rental });
   } catch (error:any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
};

// DELETE a rental listing by ID
export const deleteRental = async (req: Request, res: Response) => {
   try {
      const rental = await Rental.findByIdAndDelete(req.params.id);
      if (!rental) {
         throw new AppError(StatusCodes.NOT_FOUND, 'Rental listing not found');
      }
      res.status(StatusCodes.OK).json({ success: true, message: 'Rental listing deleted' });
   } catch (error:any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
   }
};

export const RentalController = {
    createRental,
    updateRental,
    deleteRental,
    getRentalById,
    getRentals,
    
}