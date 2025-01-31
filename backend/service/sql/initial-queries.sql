CREATE TABLE IF NOT EXISTS employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_email VARCHAR(255) UNIQUE NOT NULL,
    employee_active_status INT NOT NULL,
    employee_added_date DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_info (
    employee_info_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    employee_first_name VARCHAR(255) NOT NULL,
    employee_last_name VARCHAR(255) NOT NULL,
    employee_phone VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee_pass (
    employee_pass_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    employee_password VARCHAR(255) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_roles (
    company_role_id INT AUTO_INCREMENT PRIMARY KEY,
    company_role_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_role (
    employee_role_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    company_role_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS customer_identifier (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    customer_phone_number VARCHAR(255) UNIQUE NOT NULL,
    customer_added_date DATETIME NOT NULL,
    customer_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_info (
    customer_info_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    customer_first_name VARCHAR(255) NOT NULL,
    customer_last_name VARCHAR(255) NOT NULL,
    customer_active_status INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS customer_vehicle_info (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    vehicle_year INT NOT NULL,
    vehicle_make VARCHAR(255) NOT NULL,
    vehicle_model VARCHAR(255) NOT NULL,
    vehicle_type VARCHAR(255),
    vehicle_mileage INT,
    vehicle_tag VARCHAR(255),
    vehicle_serial_number VARCHAR(255) NOT NULL,
    vehicle_color VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS common_services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  employee_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  order_date DATETIME NOT NULL,
  active_order INT(11) NOT NULL,
  order_hash VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS order_info (
    order_info_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    order_total_price INT NOT NULL,
    order_estimated_completion_date DATETIME,
    order_completion_date DATETIME,
    order_additional_requests VARCHAR(255),
    order_additional_requests_completed INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_services (
    order_service_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    service_id INT NOT NULL,
    service_completed INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES common_services(service_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_status (
    order_status_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    order_status INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);
