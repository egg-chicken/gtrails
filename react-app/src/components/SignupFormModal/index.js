import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errorMess = [];

		if(!validateEmail(email)) {
			errorMess.push("Email is invalid")
		}

		if(password.length < 5) {
			errorMess.push("Password must be more than 5 characters")
		}

		if(email.length < 5) {
			errorMess.push("Email must be more than 5 characters")
		}

		if(username === email) {
			errorMess.push("Email and Username cannot be the same")
		}

		setErrors(errorMess)

		if(errorMess.length === 0) {
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
