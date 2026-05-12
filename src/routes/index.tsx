import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const isLoggedIn = localStorage.getItem("isLoggedIn")

		if (isLoggedIn) {
			throw redirect({
				to: "/feed",
			})
		}

		throw redirect({
			to: "/login",
		})
	},
})
