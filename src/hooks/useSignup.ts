import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { signupUser } from "../api/auth"
import toaster from "../components/ui/toaster"

export const useSignup = () => {
	return useMutation({
		mutationFn: signupUser,

		onSuccess: () => {
			toaster.create({
				title: "Welcome back!",
				type: "success",
				duration: 3000,
			})
		},

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.message
				: "Something went wrong"

			toaster.create({
				title: "Signup Failed",
				description: message,
				type: "error",
			})
		},
	})
}
