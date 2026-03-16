"use client"

import { useState, ChangeEvent, SubmitEvent } from "react"

interface FormData {
	username: string;
	password: string;
}

export default function Login() {

	const [formData, setFormData] = useState<FormData>({ username: '', password: '' });

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
			<button type="submit">Submit</button>
		</form>
	)
}