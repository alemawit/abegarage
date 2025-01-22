import express from 'express';
import { createService, fetchAllServices, fetchSingleService, modifyService, removeService } from '../controllers/service.controller';

const router = express.Router();
// Create service
router.post('/services', createService); 
// Get all services
router.get('/services', fetchAllServices); 
// Get single service
router.get('/services/:id', fetchSingleService); 
// Update service
router.put('/services', modifyService);
// Delete service 
router.delete('/services/:id', removeService); 
