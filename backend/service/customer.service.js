// Import the query function from the db.config.js file 
// import pool from "../config/dbConfig.js";
const exp = require("constants");
const pool= require("../dbconfig/db.config.js");
// Import the crypto module 
// import crypto from 'crypto';
const crypto = require('crypto');
const { Module } = require("module");
// A function to check if customer exists in the database
// const checkIfCustomerExists = async (email) => {
//   const query = "SELECT * FROM customer_identifier WHERE customer_email = ? ";

//   const rows = await pool.query(query, [email]);
//   console.log("Checking if email exists:", email, rows); // Debugging log
//   if (rows.length > 0) {
//     return true;
//   }
//   return false;
// }
const checkIfCustomerExists = async (email) => {
  console.log("Checking if email exists:", email);

  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const [rows] = await pool.query(query, [email]); // Ensure only the first element is used

  console.log("Query result:", rows); // Debugging log

  return rows.length > 0;
};

// A function to create a new customer
const createCustomer = async (customer) => {
   console.log("Creating customer:", customer.customer_email);
  let createdCustomer = {};
  try {
    // const currentDate = new Date()
    const customer_added_date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  //Create a hash for the customer
  const customer_hash = crypto.createHash('sha256').update(customer.customer_email).digest("hex");
  //create a customer identifier
  const query =
    "INSERT INTO customer_identifier (customer_email,  customer_phone_number,customer_added_date, customer_hash) VALUES (?,?,?,?)";
  const [rows] = await pool.query(query, [customer.customer_email, customer.customer_phone_number,customer_added_date, customer_hash]);
  console.log("info rows",rows)
  const customer_id = rows.insertId;
  //create a customer info
  const customer_active_status = 1;
  const query2 =
    "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name,customer_active_status) VALUES (?,?,?,?)";
  const rows2 = await pool.query(query2, [
    customer_id,
    customer.customer_first_name,
    customer.customer_last_name,
    customer_active_status,
  ]);
  console.log("info rows 2:",rows2);
  createdCustomer = {
    customer_id: customer_id,
    customer_first_name: customer.customer_first_name,
    customer_last_name: customer.customer_last_name,
    customer_email: customer.customer_email,
    customer_phone_number: customer.customer_phone_number,
    customer_active_status: customer_active_status,
    customer_hash: customer_hash,
  };
} catch (error) {
  console.log(error);
}
  // Return the customer object 
  return createdCustomer;

}
// A function to get customer by email
const getCustomerByEmail = async (customer_email) => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_email = ?";
  const rows = await pool.query(query, [customer_email]);
  return rows;
}
// A function to get all customers
const getAllCustomers = async () => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_id DESC limit 10";
  const [rows] = await pool.query(query);
  return rows;
}
//A function to get customer by first_name or last_name or email or phone_number
const getCustomerBySearch = async (search) => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_info.customer_first_name LIKE ? OR customer_info.customer_last_name LIKE ? OR customer_identifier.customer_email LIKE ? OR customer_identifier.customer_phone_number LIKE ?";
  const rows = await pool.query(query, [search, search, search, search]);
  return rows;
}
// A function to get customer by ID
const getCustomerById = async (customer_id) => {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
  const [rows] = await pool.query(query, [customer_id]);
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
  const rows = await pool.query(query, queryParams);
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
    await pool.query(updateIdentifierQuery, identifierParams);

    // Construct the update query for customer_info (first name, last name, active status)
    const updateInfoQuery = `
      UPDATE customer_info 
      SET customer_first_name = ?, customer_last_name = ?, customer_active_status = ?
      WHERE customer_id = ?
    `;
    const infoParams = [
      updatedDetails.customer_first_name,
      updatedDetails.customer_last_name,
      updatedDetails.customer_active_status,
      customer_id
    ];

    // Execute the query to update customer info details
    await pool.query(updateInfoQuery, infoParams);

    // Return the updated customer details
    return {
      customer_id,
      customer_first_name: updatedDetails.customer_first_name,
      customer_last_name: updatedDetails.customer_last_name,
      customer_email: updatedDetails.customer_email,
      customer_phone_number: updatedDetails.customer_phone_number,
      customer_active_status: updatedDetails.customer_active_status
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
    await pool.beginTransaction();

    // First, delete the customer from customer_info
    const deleteInfoQuery = "DELETE FROM customer_info WHERE customer_id = ?";
    await pool.query(deleteInfoQuery, [customer_id]);

    // Then, delete the customer from customer_identifier
    const deleteIdentifierQuery = "DELETE FROM customer_identifier WHERE customer_id = ?";
    await pool.query(deleteIdentifierQuery, [customer_id]);

    // Commit the transaction if both deletions are successful
    await pool.commit();

    // Return a success message
    return { message: `Customer with ID ${customer_id} deleted successfully.` };
  } catch (error) {
    // If an error occurs, rollback the transaction
    await pool.rollback();
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
module.exports= customerService;



