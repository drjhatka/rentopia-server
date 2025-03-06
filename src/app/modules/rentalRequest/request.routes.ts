import express from 'express';
import { RequestController } from './request.controller';

const router = express.Router();

// Define routes
router.post('/', RequestController.createRequest); // Create a new request
router.get('/', RequestController.getRequests); // Get all requests
router.get('/:id', RequestController.getRequestById); // Get a specific request by ID
router.patch('/:id/approve', RequestController.approveRequest); // Approve a request
router.patch('/:id/complete', RequestController.completeRequest); // Mark request as completed (checkout)
router.delete('/:id', RequestController.deleteRequest); // Delete a request

export const RequestRoutes = router;
