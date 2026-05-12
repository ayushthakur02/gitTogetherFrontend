import { useQuery } from "@tanstack/react-query"

import { fetchCurrentUser } from "../api/auth"
import type { User } from "../interfaces/user.interfaces"

export const useCurrentUser = () => {
	return useQuery<User>({
		queryKey: ["currentUser"],
		queryFn: fetchCurrentUser,
		enabled: !!localStorage.getItem("isLoggedIn"),
		staleTime: Infinity,
	})
}
