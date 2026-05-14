import axiosInstance from "@/lib/axios"
import type { LoginPayload, SignupPayload } from "@/interfaces/auth.interfaces"

export const signupUser = async (data: SignupPayload) => {
	const response = await axiosInstance.post("/auth/signup", data)
	return response.data
}

export const loginUser = async (data: LoginPayload) => {
	const response = await axiosInstance.post("/auth/login", {
		userId: data.userId,
		password: data.password,
	})
	return response.data
}

export const fetchCurrentUser = async () => {
	const response = await axiosInstance.get("/auth/me")
	return response.data
}

export const logoutUser = async () => {
	const response = await axiosInstance.post("/auth/logout", {})
	return response.data
}
