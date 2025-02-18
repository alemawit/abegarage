import React,{useState} from 'react'
import './AddEmployeeForm.css'

function AddEmployeeForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with the following data:", {
      email,
      firstName,
      lastName,
      phone,
      role,
      password,
    });
  };
  return (
    <div>
      <section className="form-section">
        <h2>
          Add a new employee <span style={{ color: "#EE0D0A" }}>__</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Employee email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">Employee first name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Employee last name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Employee phone (555-555-5555)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Employee role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Employee</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Employee password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            ADD EMPLOYEE
          </button>
        </form>
      </section>
    </div>
  );
}

export default AddEmployeeForm