'use client'

import { getprojects } from "@/lib/api/db";
import { useEffect, useState } from "react"
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function AllProjects() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = localStorage.getItem("email")
                if (!email) {
                    alert("There is no email")
                }
                else {
                    const titles = await getprojects(email);
                    setProjects(titles)
                }
            } catch (err) {
                if (isRedirectError(err)) {
                    throw err; // Re-throw the redirect error
                }
                alert("Fetching projects failed");
            }
        }

        fetchData();
    }, []);

    return (<div>
        {projects.join(", ")}
    </div>)
}