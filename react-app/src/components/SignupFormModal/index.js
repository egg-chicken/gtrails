import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email.includes('@') || !email.includes('.com')) {
			setErrors(["Email is invalid. Please enter a valid email address."]);
			return;
		}

		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-container">
			<div className="login-title">
				<p className="log-text">Sign Up</p>
			</div>
			<form className='login-body' onSubmit={handleSubmit}>
				<div>
					{errors.map((error, idx) => (
						<p className='errors'key={idx}>{error}</p>
					))}
				</div>
				<div className="move">
				<div className="form-container">
					<p className="sub-text-signup">First Name</p>
					<input
						type="texts"
						className="input-text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className="form-container">
					<p className="sub-text-signup">Last Name</p>
					<input
						type="texts"
						className="input-text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className="form-container">
					<p className="sub-text-signup">Email</p>
					<input
						type="text"
						className="input-text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-container">
					<p className="sub-text-signup">Username</p>
					<input
						type="text"
						className="input-text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="form-container">
					<p className="sub-text-signup">Password</p>
					<input
						type="password"
						className="input-text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="form-container">
					<p className="sub-text-signup">Confirm Password</p>
					<input
						type="password"
						className="input-text"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className="sign-button-container">
          			<div className='login-button'>
						<button className="login-submit-button" type="submit"><p className="login-text">Sign Up</p></button>
					</div>
				</div>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
