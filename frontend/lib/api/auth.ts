import { apiFetch } from "./client";

export async function signup(email: string, password: string) {
	const data = await apiFetch("/api/auth/signup", {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
	});

	// save JWT
	localStorage.setItem("token", data.token);

	return data.token;
}

export async function login(email: string, password: string) {
	const data = await apiFetch("/api/auth/login", {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
	});

	// save JWT
	localStorage.setItem("token", data.token);

	return data.token;
}

export function logout() {
	localStorage.removeItem("token");
}

export function isLoggedIn() {
	if (typeof window === "undefined") return false;

	return !!localStorage.getItem("token");
}