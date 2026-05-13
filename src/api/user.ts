import axiosInstance from "@/lib/axios"

interface UserFeedPayload {
	page: number
	limit: number
}

export const userFeed = async (params: UserFeedPayload) => {
	const response = await axiosInstance.get("/user/feed", {
		params: { page: params.page, limit: params.limit },
		withCredentials: true,
	})
	return response.data
}
