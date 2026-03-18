export async function apiFetch(url: string, options: RequestInit = {}) {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	const API_BASE = process.env.NEXT_PUBLIC_API_URL;

	const response = await fetch(`${API_BASE}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers,
		},
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(text || "API request failed");
	}

	return response.json();
}