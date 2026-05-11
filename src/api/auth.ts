import axiosInstance from "@/lib/axios"

interface LoginPayload {
	userId: string

	password: string
}

export const loginUser = async (data: LoginPayload) => {
	const response = await axiosInstance.post(
		"/auth/login",
		{
			userId: data.userId,
			password: data.password,
		},
		{ withCredentials: true },
	)
	return response.data
}
