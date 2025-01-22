const { pool } = require("../db");

class EmployeeService {
  async getAllEmployees(limit = 10) {
    const [rows] = await pool.query("SELECT * FROM employees LIMIT ?", [limit]);
    return rows;
  }

  async getEmployeeById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [id]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error("Employee not found");
    }
  }

  async addEmployee(newEmployee) {
    newEmployee.added_date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const result = await pool.query("INSERT INTO employees SET ?", newEmployee);
    return result[0].insertId;
  }

  async updateEmployee(id, updateData) {
    const result = await pool.query(
      "UPDATE employees SET ? WHERE employee_id = ?",
      [updateData, id]
    );
    if (result[0].affectedRows > 0) {
      return true;
    } else {
      throw new Error("Employee not found");
    }
  }
}

module.exports = new EmployeeService();
