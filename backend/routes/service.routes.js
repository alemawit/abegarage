import express from 'express';
import { createService, fetchAllServices, fetchSingleService, modifyService, removeService } from '../controllers/service.controller';

const router = express.Router();

router.post('/services', createService); // Create service
router.get('/services', fetchAllServices); // Get all services
router.get('/services/:id', fetchSingleService); // Get single service
router.put('/services', modifyService); // Update service
router.delete('/services/:id', removeService); // Delete service
