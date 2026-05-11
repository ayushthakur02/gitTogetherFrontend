import { useMutation } from "@tanstack/react-query"

import { loginUser } from "../api/auth"
import toaster from "../components/ui/toaster"

export const useLogin = () => {
	return useMutation({
		mutationFn: loginUser,

		onSuccess: (data) => {
			toaster.create({
				title: "Login successful",
				description: "Welcome back!",
				type: "success",
				duration: 4000,
			})
			console.log("Data", data)
		},

		onError: (error) => {
			toaster.create({
				title: "Login Failed",
				description: "Invalid credentials",
				type: "error",
			})
			console.log("Error", error)
		},
	})
}
