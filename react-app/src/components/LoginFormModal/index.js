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
        <div className="form-container">
          <p className="sub-text">Email</p>
          <input
            type="text"
            className="input-text"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-container">
          <p className="sub-text">Password</p>
          <input
            type="password"
            className="input-text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="log-button-container">
          <div className='login-button'>
            <button  className="login-submit-button"><p className="login-text">Log In</p></button>
          </div>
          <div className="demo-center">
            <button className='demo-button' onClick={(e) => {
              setEmail('demo@aa.io');
              setPassword('password');
            }}>Demo User</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
