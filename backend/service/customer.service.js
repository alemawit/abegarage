// Import the query function from the db.config.js file 
import conn from "../config/dbConfig.js";
// Import the crypto module 
import crypto from 'crypto';
// A function to check if customer exists in the database
const checkIfCustomerExists = async (email) => {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ? ";
  const rows = await conn.query(query, [email]);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// A function to create a new customer
const createCustomer = async (customer) => {
  console.log("Creating customer");
  let createdCustomer = {};
  try {
    const currentDate = new Date()
  //Create a hash for the customer
  const customer_hash = crypto.createHash('sha256').update(customer.customer_email).digest("hex");
  //create a customer identifier
  const query="INSERT INTO customer_identifier (customer_email,  customer_phone_number, customer_hash) VALUES (?,?,?)";
  const rows = await conn.query(query, [customer.customer_email, customer.customer_phone_number, customer_hash]);
  console.log(rows)
  const customer_id = rows.insertId;
  //create a customer info
  const active_customer_status = 1;
  const query2 = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name,active_customer_status) VALUES (?,?,?,?)";
  const rows2 = await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, active_customer_status]);
  console.log(rows2);
  createdCustomer = {
    customer_id: customer_id,
    customer_first_name: customer.customer_first_name,
    customer_last_name: customer.customer_last_name,
    customer_email: customer.customer_email,
    customer_phone_number: customer.customer_phone_number,
    active_customer_status: active_customer_status,
    customer_hash: customer_hash,
  }
} catch (error) {
  console.log(error);
}
  // Return the customer object 
  return createdCustomer;

}
// A function to get customer by email
const getCustomerByEmail = async (customer_email) => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_email = ?";
  const rows = await conn.query(query, [customer_email]);
  return rows;
}
// A function to get all customers
const getAllCustomers = async () => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;
}
//A function to get customer by first_name or last_name or email or phone_number
const getCustomerBySearch = async (search) => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_info.customer_first_name LIKE ? OR customer_info.customer_last_name LIKE ? OR customer_identifier.customer_email LIKE ? OR customer_identifier.customer_phone_number LIKE ?";
  const rows = await conn.query(query, [search, search, search, search]);
  return rows;
}
// A function to get customer by ID
const getCustomerById = async (customer_id) => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
  const rows = await conn.query(query, [customer_id]);
  return rows;
}
// A function to get customer by ID or email
const getCustomerByIdOrEmail = async (identifier) => {
  let query;
  let queryParams;

  // Check if the identifier is an email (assumed to be a string) or an ID (assumed to be a number)
  if (typeof identifier === 'string') {
    // If the identifier is a string, assume it's an email
    query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_email = ?";
    queryParams = [identifier];
  } else if (typeof identifier === 'number') {
    // If the identifier is a number, assume it's a customer_id
    query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
    queryParams = [identifier];
  } else {
    throw new Error("Invalid identifier type. Must be either a customer_id (number) or customer_email (string).");
  }

  // Run the query
  const rows = await conn.query(query, queryParams);
  return rows;
}
// A function to update customer details by customer_id
const updateCustomer = async (customer_id, updatedDetails) => {
  try {
    // Construct the update query for customer_identifier (email, phone number)
    const updateIdentifierQuery = `
      UPDATE customer_identifier 
      SET customer_email = ?, customer_phone_number = ? 
      WHERE customer_id = ?
    `;
    const identifierParams = [
      updatedDetails.customer_email,
      updatedDetails.customer_phone_number,
      customer_id
    ];

    // Execute the query to update customer identifier details
    await conn.query(updateIdentifierQuery, identifierParams);

    // Construct the update query for customer_info (first name, last name, active status)
    const updateInfoQuery = `
      UPDATE customer_info 
      SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ?
      WHERE customer_id = ?
    `;
    const infoParams = [
      updatedDetails.customer_first_name,
      updatedDetails.customer_last_name,
      updatedDetails.active_customer_status,
      customer_id
    ];

    // Execute the query to update customer info details
    await conn.query(updateInfoQuery, infoParams);

    // Return the updated customer details
    return {
      customer_id,
      customer_first_name: updatedDetails.customer_first_name,
      customer_last_name: updatedDetails.customer_last_name,
      customer_email: updatedDetails.customer_email,
      customer_phone_number: updatedDetails.customer_phone_number,
      active_customer_status: updatedDetails.active_customer_status
    };
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer");
  }
}
// A function to delete a customer by customer_id
const deleteCustomer = async (customer_id) => {
  try {
    // Begin a transaction to ensure both deletions are successful
    await conn.beginTransaction();

    // First, delete the customer from customer_info
    const deleteInfoQuery = "DELETE FROM customer_info WHERE customer_id = ?";
    await conn.query(deleteInfoQuery, [customer_id]);

    // Then, delete the customer from customer_identifier
    const deleteIdentifierQuery = "DELETE FROM customer_identifier WHERE customer_id = ?";
    await conn.query(deleteIdentifierQuery, [customer_id]);

    // Commit the transaction if both deletions are successful
    await conn.commit();

    // Return a success message
    return { message: `Customer with ID ${customer_id} deleted successfully.` };
  } catch (error) {
    // If an error occurs, rollback the transaction
    await conn.rollback();
    console.error("Error deleting customer:", error);
    throw new Error("Failed to delete customer");
  }
}
// Export the functions
const customerService = {
  checkIfCustomerExists,
  createCustomer,
  getCustomerByEmail,
  getAllCustomers,
  getCustomerBySearch,
  getCustomerById,
  getCustomerByIdOrEmail,
  updateCustomer,
  deleteCustomer
}
export default customerService;


