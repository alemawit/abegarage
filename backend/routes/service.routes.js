import express from 'express';
import { createService, fetchAllServices, fetchSingleService, modifyService, removeService } from '../controllers/service.controller';

const router = express.Router();
// Create service
router.post('/api/services', createService); 
// Get all services
router.get('/api/services', fetchAllServices); 
// Get single service
router.get('/api/services/:id', fetchSingleService); 
// Update service
router.put('/api/services', modifyService);
// Delete service 
router.delete('/api/services/:id', removeService); 
// connection details
// DB_HOST=127.0.0.1
// DB_DATABASE=abegarage
// DB_USERNAME=abegarage
// DB_PASSWORD=OvNMpaxpLZpoU3kg