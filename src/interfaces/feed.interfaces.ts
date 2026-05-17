import type { MotionValue } from "framer-motion"
import type { UserFeed } from "./user.interfaces"

export interface ProfileCardUser {
	firstName: string
	lastName: string
	userName?: string
	profilePic?: string
	skills?: string[]
	age?: number
	city?: string
	state?: string
	country?: string
}

export interface ProfileCardAction {
	label: string
	onClick: () => void
	variant?: "outline" | "solid" | "subtle"
	colorPalette?: string
	icon?: React.ReactNode
}

export interface ProfileCardProps {
	user: ProfileCardUser
	actions: ProfileCardAction[]
}

export interface FeedCardProps {
	user: UserFeed
	onSwipe: (status: "dismissed" | "starred") => void
	motionX?: MotionValue<number>
	setIsDrawerOpen: (open: boolean) => void
}

export interface PhotoCarouselProps {
	photos: string[]
	name?: string
	height: string
	objectFit?: "cover" | "contain"
}

export interface DetailDrawerProps {
	id: string
	setIsDrawerOpen: (open: boolean) => void
	isDrawerOpen: boolean
	onSwipe: (status: "dismissed" | "starred") => void
}
