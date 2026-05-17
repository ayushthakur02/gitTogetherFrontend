import { Code, Heart, MessageSquareHeart, User } from "lucide-react"
import { FaCodePullRequest } from "react-icons/fa6"

export const SIDEBAR_ITEMS = [
	{
		id: 1,
		name: "Feed",
		path: "/feed",
		icon: <Code />,
	},
	{
		id: 2,
		name: "Requests",
		path: "/requests",
		icon: <FaCodePullRequest />,
	},
	{
		id: 3,
		name: "Matches",
		path: "/matches",
		icon: <Heart />,
	},
	{
		id: 4,
		name: "Chats",
		path: "/chats",
		icon: <MessageSquareHeart />,
	},
	{
		id: 5,
		name: "Profile",
		path: "/profile",
		icon: <User />,
	},
]
