import axiosInstance from "@/lib/axios"

interface LoginPayload {
	userId: string
	password: string
}

export const loginUser = async (data: LoginPayload) => {
	const response = await axiosInstance.post(
		"/auth/login",
		{ userId: data.userId, password: data.password },
		{ withCredentials: true },
	)
	return response.data
}

export const fetchCurrentUser = async () => {
	const response = await axiosInstance.get("/auth/me", { withCredentials: true })
	return response.data
}

export const logoutUser = async () => {
	const response = await axiosInstance.post(
		"/auth/logout",
		{},
		{ withCredentials: true },
	)
	return response.data
}
