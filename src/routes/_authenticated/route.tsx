import { createFileRoute, redirect } from "@tanstack/react-router"
import AuthenticatedLayout from "./AuthenticatedLayout"
export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => {
		const isLoggedIn = localStorage.getItem("isLoggedIn")

		if (!isLoggedIn) {
			throw redirect({
				to: "/login",
			})
		}
	},
	component: AuthenticatedLayout,
})
