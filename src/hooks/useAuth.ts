import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { loginUser } from "../api/auth"
import { signupUser } from "../api/auth"
import type { User } from "../interfaces/user.interfaces"
import toaster from "../components/ui/toaster"
import { useNavigate } from "@tanstack/react-router"

import { logoutUser } from "../api/auth"
import { useQuery } from "@tanstack/react-query"

import { fetchCurrentUser } from "../api/auth"

export const useLogin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: loginUser,

		onSuccess: (data) => {
			localStorage.setItem("isLoggedIn", "true")
			queryClient.setQueryData<User>(["currentUser"], data)
		},

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.response?.data?.error || error.message
				: "Something went wrong"

			toaster.create({
				title: "Login Failed",
				description: message,
				type: "error",
			})
		},
	})
}

export const useSignup = () => {
	return useMutation({
		mutationFn: signupUser,

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.response?.data?.error || error.message
				: "Something went wrong"

			toaster.create({
				title: "Signup Failed",
				description: message,
				type: "error",
			})
		},
	})
}

export const useLogout = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: logoutUser,

		onSuccess: async () => {
			localStorage.removeItem("isLoggedIn")
			await navigate({ to: "/login" })
			toaster.create({
				title: "Logged out successfully",
				type: "success",
				duration: 2000,
			})
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

export const useCurrentUser = () => {
	return useQuery<User>({
		queryKey: ["currentUser"],
		queryFn: fetchCurrentUser,
		enabled: !!localStorage.getItem("isLoggedIn"),
		staleTime: Infinity,
	})
}
