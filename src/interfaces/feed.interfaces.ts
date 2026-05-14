import type { MotionValue } from "framer-motion"
import type { UserFeed } from "./user.interfaces"

export interface FeedCardProps {
	user: UserFeed
	onSwipe: (status: "dismissed" | "starred") => void
	motionX?: MotionValue<number>
}

export interface PhotoCarouselProps {
	photos: string[]
	name: string
}
