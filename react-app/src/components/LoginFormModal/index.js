import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <p className="log-text">Welcome Back.</p>
        <p className="log-text">Log in and start exploring.</p>
      </div>
      <form className='login-body' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="email">
          Email
          <input
            type="text"
            className="text4"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="password">
          Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button  className="login-submit-button"><p className="login-text">Log In</p></button>
        <div className="demo-center">
        <button className='demo-button' onClick={(e) => {
          setEmail('demo@aa.io');
          setPassword('password');
        }}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
