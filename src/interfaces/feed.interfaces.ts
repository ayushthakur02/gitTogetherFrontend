import type { MotionValue } from "framer-motion"
import type { UserFeed } from "./user.interfaces"

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
