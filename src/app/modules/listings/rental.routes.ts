import { Router } from "express";
import { RentalController } from "./rental.controller";

const router = Router()

router.post('/', RentalController.createRental)

export const RentalRoutes = router;