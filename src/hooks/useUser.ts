import { useQuery } from "@tanstack/react-query"

import { userDetail, userFeed } from "@/api/user"
import type {
	FeedResponse,
	UserDetailResponse,
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
