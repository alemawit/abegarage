import React, { useState } from "react";
import "./LoginForm.css"; // Make sure to import your CSS file

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <h2>
        Login to your account <span style={{ color: "#EE0D0A" }}>__</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`input-container ${emailFocus || email ? "focus" : ""}`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div
          className={`input-container ${
            passwordFocus || password ? "focus" : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
