import axiosInstance from "@/lib/axios"

interface UserFeedPayload {
	page: number
	limit: number
}

export const userFeed = async (params: UserFeedPayload) => {
	const response = await axiosInstance.get("/user/feed", {
		params: { page: params.page, limit: params.limit },
	})
	return response.data
}

export const userDetail = async (id: string) => {
	const response = await axiosInstance.get(`/user/${id}`, {})
	return response.data
}
