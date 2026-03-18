"use client"

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState, ChangeEvent, SubmitEvent } from "react"

import { signup } from "@/lib/api/auth";

interface FormData {
	email: string;
	password: string;
	confirmPassword: string;
}

export default function Signup() {

	const [formData, setFormData] = useState<FormData>({ email: '', password: '', confirmPassword: '' });

	// 3. Handle input changes
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// 4. Handle form submission
	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault(); // Prevents page reload

		if (formData.password !== formData.confirmPassword) {
			alert("The passwords don't match!")
			return
		}

		try {
			const fetchedToken = await signup(formData.email, formData.password);
			console.log(fetchedToken)
			alert("Login successful");
			redirect("/")
		} catch (err) {
			if (isRedirectError(err)) {
				throw err; // Re-throw the redirect error
			}
			console.log(err)
			alert("Login failed");
		}

	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				email:
				<input
					type="text"
					name="email"
					value={formData.email}
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