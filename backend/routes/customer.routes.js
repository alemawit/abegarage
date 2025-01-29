const express = require("express");

const router = express.Router();
//import the customer controller
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} = require("../controllers/customer.controller");

// CREATE a new customer
router.post("/api/customer", createCustomer);

// READ all customers
router.get("/api/customers", getAllCustomers);

// READ a single customer by ID
router.get("/api/customer/:id", getCustomerById);

// UPDATE a customer by ID
router.put("/api/customer/:id", updateCustomer);

module.exports = router;
