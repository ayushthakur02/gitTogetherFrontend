import { useQuery } from "@tanstack/react-query"

import { userFeed } from "@/api/user"
import type { FeedResponse } from "@/interfaces/user.interfaces"

export const useUserFeed = (page: number = 1, limit: number = 10) => {
	return useQuery<FeedResponse>({
		queryKey: ["feed", page, limit],
		queryFn: () => userFeed({ page, limit }),
		staleTime: 1000 * 60 * 5,
	})
}
