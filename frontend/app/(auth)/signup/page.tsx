"use client"

import { useState, ChangeEvent, SubmitEvent } from "react"

interface FormData {
	username: string;
	password: string;
	confirmPassword: string;
}

export default function Signup() {

	const [formData, setFormData] = useState<FormData>({ username: '', password: '', confirmPassword: '' });

	// 3. Handle input changes
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// 4. Handle form submission
	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevents page reload
		console.log('Form Submitted:', formData);
		// Send data to backend or process it further
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Password:
				<input
					type="text"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Confirm Password:
				<input
					type="text"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleInputChange}
				/>
			</label>
			<button type="submit">Signup</button>
		</form>
	)
}