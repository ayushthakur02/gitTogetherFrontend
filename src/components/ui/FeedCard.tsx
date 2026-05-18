import type { FeedCardProps } from "@/interfaces/feed.interfaces"
import {
	Badge,
	Box,
	Button,
	HStack,
	Icon,
	Text,
	VStack,
} from "@chakra-ui/react"
import {
	animate,
	motion,
	useMotionValue,
	useTransform,
	type PanInfo,
} from "framer-motion"
import { FaCodePullRequest } from "react-icons/fa6"
import { FaExpandArrowsAlt } from "react-icons/fa"
import { IoClose, IoLocationSharp } from "react-icons/io5"
import PhotoCarousel from "./PhotoCarousel"

const CARD_WIDTH = 400
const CARD_HEIGHT = 640

const FeedCard = ({
	user,
	onSwipe,
	motionX,
	setIsDrawerOpen,
}: FeedCardProps) => {
	const xInternal = useMotionValue(0)
	const x = motionX ?? xInternal
	const cardRotate = useTransform(x, [-300, 0, 300], [-12, 0, 12])

	const photos = [user.profilePic, ...(user.morePhotos ?? [])].filter(
		(p): p is string => !!p,
	)

	const handleDragEnd = (
		_e: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) => {
		if (info.offset.x < -100) onSwipe("dismissed")
		else if (info.offset.x > 100) onSwipe("starred")
		else animate(x, 0, { type: "spring", stiffness: 500, damping: 30 })
	}

	return (
		<motion.div
			style={{ x, rotate: cardRotate, cursor: "grab" }}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.8}
			onDragEnd={handleDragEnd}
			whileDrag={{ cursor: "grabbing" }}>
			<Box
				width={`${CARD_WIDTH}px`}
				height={`${CARD_HEIGHT}px`}
				borderRadius="2xl"
				overflow="hidden"
				boxShadow="xl"
				position="relative"
				bg="bg.secondary"
				border="1px solid"
				borderColor="border.default">
				<Box height="60%">
					<PhotoCarousel photos={photos} name={user.firstName} height="384px" />
				</Box>

				<VStack
					align="stretch"
					gap={2}
					px={4}
					pb={3}
					height="40%"
					justify="space-between">
					<Box>
						<Text
							fontWeight="bold"
							fontSize="xl"
							color="text.primary"
							lineClamp={1}>
							{user.firstName} {user.lastName}, {user.age}
						</Text>
						<HStack gap={1} mt={0.5}>
							<Icon as={IoLocationSharp} color="text.secondary" boxSize={3.5} />
							<Text fontSize="xs" color="text.secondary" lineClamp={1}>
								{[user.city, user.state, user.country]
									.filter(Boolean)
									.join(", ")}
							</Text>
						</HStack>
					</Box>

					{user.bio && (
						<Text fontSize="sm" color="text.secondary" lineClamp={2}>
							{user.bio}
						</Text>
					)}

					{user.skills?.length > 0 && (
						<HStack flexWrap="wrap" gap={1.5}>
							{user.skills.slice(0, 4).map((skill) => (
								<Badge
									key={skill}
									colorPalette="blue"
									variant="subtle"
									fontSize="xs">
									{skill}
								</Badge>
							))}
							{user.skills.length > 4 && (
								<Badge colorPalette="gray" variant="subtle" fontSize="xs">
									+{user.skills.length - 4}
								</Badge>
							)}
						</HStack>
					)}

					<HStack justify="center" gap={6}>
						<Button
							variant="outline"
							colorPalette="red"
							borderRadius="full"
							size="lg"
							onClick={() => onSwipe("dismissed")}>
							<Icon as={IoClose} />
						</Button>
						<Button
							borderRadius="full"
							size="lg"
							onClick={() => setIsDrawerOpen(true)}>
							<Icon as={FaExpandArrowsAlt} />
						</Button>
						<Button
							colorPalette="green"
							borderRadius="full"
							size="lg"
							onClick={() => onSwipe("starred")}>
							<Icon as={FaCodePullRequest} />
						</Button>
					</HStack>
				</VStack>
			</Box>
		</motion.div>
	)
}

export default FeedCard
