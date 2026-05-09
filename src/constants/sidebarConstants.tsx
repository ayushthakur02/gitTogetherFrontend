import { Code, Heart, MessageSquareHeart, User } from "lucide-react"

export const SIDEBAR_ITEMS = [
	{
		id: 1,
		name: "Feed",
		path: "/feed",
		icon: <Code />,
	},
	{
		id: 2,
		name: "Matches",
		path: "/matches",
		icon: <Heart />,
	},
	{
		id: 3,
		name: "Chats",
		path: "/chats",
		icon: <MessageSquareHeart />,
	},
	{
		id: 4,
		name: "Profile",
		path: "/profile",
		icon: <User />,
	},
]
