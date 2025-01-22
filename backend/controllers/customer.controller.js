// Import the customer service
import customerService from '../services/customerService.js';
//Customer Controller (for the customer_identifier and customer_info tables)
// Create the add customer controller
const createCustomer = async(req, res, next)=> {
  // Check if customer email already exists in the database 
  const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);
  // If customer exists, send a response to the client
  if (customerExists) {
    res.status(400).json({
      error: "This email address is already associated with another customer!"
    });
  } else {
    try {
      const customerData = req.body;
      // Create the customer
      const customer = await customerService.createCustomer(customerData);
      if (!customer) {
        res.status(400).json({
          error: "Failed to add the customer!"
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!"
      });
    }
  }
}
// Create the getAllCustomers controller
const getAllCustomers=async(req, res, next) => {
  // Call the getAllCustomers method from the customer service 
  const customers = await customerService.getAllCustomers();
  // console.log(customers);
  if (!customers) {
    res.status(400).json({
      error: "Failed to get all customers!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: customers,
    });
  }
}
//create the getCustomerBySearch controller
const getCustomerBySearch=async(req, res, next) => {
  // Call the getCustomerBySearch method from the customer service 
  const customers = await customerService.getCustomerBySearch(req.body.search);
  // console.log(customers);
  if (!customers) {
    res.status(400).json({
      error: "Failed to get customers!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: customers,
    });
  }
}
//create the getCustomerByEmail controller
const getCustomerByEmail=async(req, res, next) => {
  // Call the getCustomerByEmail method from the customer service 
  const customers = await customerService.getCustomerByEmail(req.body.customer_email);
  // console.log(customers);
  if (!customers) {
    res.status(400).json({
      error: "Failed to get customers!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: customers,
    });
  }
}

// Create the updateCustomer controller
const updateCustomer = async (req, res, next) => {
  // Validate input data (e.g., customer_email or customer_id must be provided)
  const { customer_email, customer_id, customer_info } = req.body;
  if (!customer_email && !customer_id) {
    return res.status(400).json({
      error: "Customer email or ID must be provided to update the customer."
    });
  }

  try {
    // Check if the customer exists
    const existingCustomer = await customerService.getCustomerById(customer_id || customer_email);
    if (!existingCustomer) {
      return res.status(404).json({
        error: "Customer not found!"
      });
    }

    // Proceed with updating the customer
    const updatedCustomer = await customerService.updateCustomer(customer_id || customer_email, customer_info);

    if (!updatedCustomer) {
      return res.status(400).json({
        error: "Failed to update the customer!"
      });
    }

    // Successful update response
    res.status(200).json({
      status: "success",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Something went wrong while updating the customer!"
    });
  }
}

// Create the deleteCustomer controller
const deleteCustomer = async (req, res, next) => {
  // Validate that either customer_id or customer_email is provided
  const { customer_email, customer_id } = req.params;
  if (!customer_email && !customer_id) {
    return res.status(400).json({
      error: "Customer email or ID must be provided to delete the customer."
    });
  }

  try {
    // Check if the customer exists before attempting to delete
    const existingCustomer = await customerService.getCustomerById(customer_id || customer_email);
    if (!existingCustomer) {
      return res.status(404).json({
        error: "Customer not found!"
      });
    }

    // Proceed with deleting the customer
    const deleteResult = await customerService.deleteCustomer(customer_id || customer_email);

    if (!deleteResult) {
      return res.status(400).json({
        error: "Failed to delete the customer!"
      });
    }

    // Successful deletion response
    res.status(200).json({
      status: "success",
      message: "Customer deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Something went wrong while deleting the customer!"
    });
  }
}

// Export the controllers
const customerController = {
  createCustomer,
  getAllCustomers,
  getCustomerBySearch,
  getCustomerByEmail,
  updateCustomer,
  deleteCustomer,
};

export default customerController;

