import { apiFetch } from "./client";

export async function getprojects(email: string) {
    const data = await apiFetch(`/api/projects?email=${email}`, {
        method: "GET",
    });

    return data.projects;
}

export async function addproject(email: string, title: string) {
    const data = await apiFetch("/api/projects/addproject", {
        method: "POST",
        body: JSON.stringify({
            email,
            title,
        }),
    });

    return  // Todo: handle errors properly
}