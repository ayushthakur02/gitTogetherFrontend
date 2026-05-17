import { useQuery } from "@tanstack/react-query"

import { userDetail, userFeed, userMatches, userRequestsList } from "@/api/user"
import {
	type UserRequestsListResponse,
	type FeedResponse,
	type UserDetailResponse,
	type UserMatchesResponse,
} from "@/interfaces/user.interfaces"

export const useUserFeed = (page: number = 1, limit: number = 10) => {
	return useQuery<FeedResponse>({
		queryKey: ["feed", page, limit],
		queryFn: () => userFeed({ page, limit }),
		staleTime: 1000 * 60 * 5,
	})
}

export const useUserDetail = (id: string) => {
	return useQuery<UserDetailResponse>({
		queryKey: ["userDetail", id],
		queryFn: () => userDetail(id),
		staleTime: 1000 * 60 * 5,
		enabled: !!id,
	})
}

export const useUserRequestsList = (page: number = 1, limit: number = 10) => {
	return useQuery<UserRequestsListResponse>({
		queryKey: ["requests", page, limit],
		queryFn: () => userRequestsList({ page, limit }),
		staleTime: 0,
	})
}

export const useUserMatches = (page: number = 1, limit: number = 12) => {
	return useQuery<UserMatchesResponse>({
		queryKey: ["matches", page, limit],
		queryFn: () => userMatches({ page, limit }),
		staleTime: 0,
	})
}
