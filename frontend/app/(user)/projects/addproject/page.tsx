"use client"

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState, ChangeEvent, SubmitEvent } from "react"

import { addproject } from "@/lib/api/db";

interface FormData {
    title: string;
}

export default function AddProject() {

    const [formData, setFormData] = useState<FormData>({ title: '' });

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

        try {
            const email = localStorage.getItem("email")
            if (!email) {
                alert("There is no email")
            }
            else {
                await addproject(email, formData.title);
                alert("Project add successful");
                redirect("/projects")
            }
        } catch (err) {
            if (isRedirectError(err)) {
                throw err; // Re-throw the redirect error
            }
            alert("Login failed");
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Add Project</button>
        </form>
    )
}