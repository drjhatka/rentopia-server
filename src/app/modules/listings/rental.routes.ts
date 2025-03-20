import { Router } from "express";
import { RentalController } from "./rental.controller";

const router = Router()

router.post('/', RentalController.createRental)
router.get('/', RentalController.getRentals)
router.get('/:rentalId', RentalController.getRentalById)
router.put('/:rentalId/status', RentalController.updateRentalStatus)
router.delete('/rentalId', RentalController.deleteRental)

export const RentalRoutes = router;