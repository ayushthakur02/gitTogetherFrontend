import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { logoutUser } from "../api/auth"
import toaster from "../components/ui/toaster"

export const useLogout = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: logoutUser,

		onSuccess: () => {
			localStorage.removeItem("isLoggedIn")
			toaster.create({
				title: "Logged out successfully",
				type: "success",
				duration: 2000,
			})
			navigate({ to: "/login" })
		},

		onError: () => {
			toaster.create({
				title: "Logout failed",
				description: "Something went wrong. Please try again.",
				type: "error",
			})
		},
	})
}
