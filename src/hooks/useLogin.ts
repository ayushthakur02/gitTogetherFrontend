import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { loginUser } from "../api/auth"
import type { User } from "../interfaces/user.interfaces"
import toaster from "../components/ui/toaster"

export const useLogin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: loginUser,

		onSuccess: (data) => {
			localStorage.setItem("isLoggedIn", "true")
			queryClient.setQueryData<User>(["currentUser"], data)
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
				title: "Login Failed",
				description: message,
				type: "error",
			})
		},
	})
}
