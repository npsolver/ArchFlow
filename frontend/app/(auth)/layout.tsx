"use client"

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			redirect("/")
		} else {
			setLoading(false)
		}

	}, [])

	return (
		loading ? <div>Loading</div> : <>{children}</>
	)
}
