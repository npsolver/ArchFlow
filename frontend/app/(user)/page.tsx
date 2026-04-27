"use client"

import { redirect } from "next/navigation"

export default function User() {

    const logout = () => {
        localStorage.removeItem("token")
        redirect("/landing")
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}