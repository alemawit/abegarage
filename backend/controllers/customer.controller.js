// Import customer service
const customerService = require("../service/customer.service");
const conn = require("../dbconfig/db.config"); // Ensure this is correct

// Create the add customer controller
async function createCustomer(req, res, next) {
  try {
    const { customer_email, customer_phone_number } = req.body;

    // Check if customer already exists (by email or phone number)
    const customerExists = await customerService.checkIfCustomerExists(
      customer_email,
      customer_phone_number
    );

    if (customerExists) {
      return res.status(400).json({
        status: "fail",
        message:
          "This email or phone number is already associated with another customer!",
      });
    }

    // Create the customer
    const customer = await customerService.createCustomer(req.body);

    if (!customer) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to add the customer!",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Customer created successfully!",
      data: customer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}

// Create a getAllCustomers controller
async function getAllCustomers(req, res, next) {
  try {
    // Call the getAllCustomers method from customer service
    const customers = await customerService.getAllCustomers();

    if (!customers || customers.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No customers found!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}
// Function to get a customer by ID
const getCustomerById = async (req, res) => {
  const customerId = req.params.id;
  // Logic to get a customer by ID
  // For example, you could fetch this from a database
  res.send(`Customer with ID: ${customerId}`);
};
// Create the getSingleCustomer controller
async function getSingleCustomer(req, res, next) {
  try {
    const customerId = parseInt(req.params.id); // Get customer ID from request parameters

    // Call the getSingleCustomer method from customer service
    const customer = await customerService.getSingleCustomer(customerId);

    if (!customer) {
      return res.status(404).json({
        status: "fail",
        message: "Customer not found!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: customer,
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}
//Create the searchCustomer controller
async function searchCustomers(req, res, next) {
  try {
    const { query } = req.query; // Get the query from the request
    const searchQuery = `%${query}%`; // Wrap the query with wildcards for partial match

    // Call the searchCustomers method from customer service
    const customers = await customerService.searchCustomers(searchQuery);

    if (!customers || customers.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No customers found for the search query!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: customers,
    });
  } catch (error) {
    console.error("Error searching customers:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong during the search!",
    });
  }
}
// Search customer
async function searchCustomers(req, res, next) {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = await customerService.searchCustomers(searchQuery);
    // console.log(results)
    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Search error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error searching customers",
      error: error.message,
    });
  }
}

// Create the updateCustomer controller
async function updateCustomer(req, res, next) {
  try {
    const customerId = parseInt(req.params.id); // Get customer ID from request parameters
    const updateData = req.body;

    // Check if customer exists
    const existingCustomer = await customerService.getSingleCustomer(
      customerId
    );
    if (!existingCustomer) {
      return res.status(404).json({
        status: "fail",
        message: "Customer not found!",
      });
    }

    // Update the customer
    const updatedCustomer = await customerService.updateCustomer(
      customerId,
      updateData
    );
    if (!updatedCustomer) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to update the customer!",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Customer updated successfully!",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}

// Export the controllers
module.exports = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  searchCustomers,
  updateCustomer,
  getCustomerById,
};
