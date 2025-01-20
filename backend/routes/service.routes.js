const express = require('express');
const router = express.Router();

// This route fetches all active services, which can be displayed on the order creation page.
router.get('/services', services);  // Define or import 'services' function

// This route retrieves the details of a specific service based on its service_id.
router.get('/service/:id', service_id);  // Define or import 'service_id' function

// This route allows the creation of a new service. The active flag is included to determine whether the service is active.
router.post('/service', service);  // Define or import 'service' function

// This route allows updating a specific service. The active flag is also editable to change the service's status.
router.put('/service/:id', service_id);  // Fix the route to include service ID

// Instead of completely deleting the service, this route deactivates it by setting the active flag to false.
router.patch('/service/:id', service_id);  // Fix the route to include service ID

module.exports = router;
