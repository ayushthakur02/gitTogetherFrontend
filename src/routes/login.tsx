import { createFileRoute, redirect } from "@tanstack/react-router"
import Login from "../pages/Login"
export const Route = createFileRoute("/login")({
	beforeLoad: () => {
		if (localStorage.getItem("isLoggedIn")) {
			throw redirect({ to: "/feed" })
		}
	},
	component: Login,
})
