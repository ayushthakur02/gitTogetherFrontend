import type {
	UserFeedPayload,
	UserRequestsPayload,
} from "@/interfaces/user.interfaces"
import axiosInstance from "@/lib/axios"

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

export const userRequestsList = async (params: UserRequestsPayload) => {
	const response = await axiosInstance.get("/user/requests", {
		params: { page: params.page, limit: params.limit },
	})
	return response.data
}

export const userMatches = async (params: UserFeedPayload) => {
	const response = await axiosInstance.get("/user/matches", {
		params: { page: params.page, limit: params.limit },
	})
	return response.data
}
