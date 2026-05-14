import FeedCard from "@/components/ui/FeedCard"
import { useSendRequest } from "@/hooks/useRequest"
import { useUserFeed } from "@/hooks/useUser"
import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { FaCodePullRequest } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"

const Feed = () => {
	const { data, isLoading, isError, isFetching, refetch } = useUserFeed()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [pendingDirection, setPendingDirection] = useState<
		"left" | "right" | null
	>(null)
	const requestMutation = useSendRequest()

	const x = useMotionValue(0)
	const rejectOpacity = useTransform(x, [-150, -30, 0], [1, 0.8, 0])
	const connectOpacity = useTransform(x, [0, 30, 150], [0, 0.8, 1])
	const nextCardScale = useTransform(x, [-300, 0, 300], [1, 0.92, 1])
	const nextCardOpacity = useTransform(x, [-150, 0, 150], [1, 0.6, 1])

	const triggerSwipe = async (status: "dismissed" | "starred") => {
		const target =
			status === "dismissed"
				? -window.innerWidth * 1.5
				: window.innerWidth * 1.5
		await animate(x, target, { type: "tween", duration: 0.35, ease: "easeIn" })

		const currentUser = data?.data[currentIndex]
		if (currentUser) {
			requestMutation.mutate(
				{ status, recipientID: currentUser._id },
				{
					onSettled: () => {
						flushSync(() => setCurrentIndex((prev) => prev + 1))
						x.set(0)
					},
				},
			)
		}
	}

	// Nudge card when keyboard arms a direction so overlays become visible
	useEffect(() => {
		if (pendingDirection === "left")
			animate(x, -40, { type: "spring", stiffness: 300, damping: 25 })
		else if (pendingDirection === "right")
			animate(x, 40, { type: "spring", stiffness: 300, damping: 25 })
		else animate(x, 0, { type: "spring", stiffness: 500, damping: 30 })
	}, [pendingDirection, x])

	// Keyboard: first press arms, second press fires
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				if (pendingDirection === "left") {
					setPendingDirection(null)
					triggerSwipe("dismissed")
				} else {
					setPendingDirection("left")
				}
			} else if (e.key === "ArrowRight") {
				if (pendingDirection === "right") {
					setPendingDirection(null)
					triggerSwipe("starred")
				} else {
					setPendingDirection("right")
				}
			} else if (e.key === "Escape") {
				setPendingDirection(null)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [pendingDirection])

	const isRefetching = useRef(false)
	const feedLength = data?.data.length ?? 0

	// When cards are exhausted, refetch and reset index
	useEffect(() => {
		if (feedLength > 0 && currentIndex >= feedLength && !isRefetching.current) {
			isRefetching.current = true
			refetch().then((result) => {
				isRefetching.current = false
				if (result.data?.data.length) setCurrentIndex(0)
			})
		}
	}, [currentIndex, feedLength, refetch])

	if (isLoading) {
		return (
			<Flex height="100%" justifyContent="center" alignItems="center">
				<Spinner size="xl" />
			</Flex>
		)
	}

	if (isError) {
		return (
			<Flex height="100%" justifyContent="center" alignItems="center">
				<Text color="text.secondary">
					Failed to load feed. Please try again.
				</Text>
			</Flex>
		)
	}

	const currentUser = data?.data[currentIndex]
	const nextUser = data?.data[currentIndex + 1]

	if (!currentUser) {
		return isFetching ? (
			<Flex
				height="100%"
				justifyContent="center"
				alignItems="center"
				direction="column"
				gap={3}>
				<Spinner size="xl" />
				<Text color="text.secondary">
					Finding more developers to connect with!
				</Text>
			</Flex>
		) : (
			<Flex
				height="100%"
				justifyContent="center"
				alignItems="center"
				direction="column"
				gap={3}>
				<Text fontSize="xl" color="text.primary" fontWeight="semibold">
					You're all caught up!
				</Text>
				<Text color="text.secondary">
					No more developers to review right now.
				</Text>
			</Flex>
		)
	}

	return (
		<Flex justifyContent="center" alignItems="center" height="100%">
			<div style={{ position: "relative", width: "fit-content" }}>
				{/* Reject overlay — floats outside left edge */}
				<motion.div
					style={{
						opacity: rejectOpacity,
						position: "absolute",
						top: "50%",
						left: -80,
						transform: "translateY(-50%)",
						zIndex: 20,
						pointerEvents: "none",
					}}>
					<Box
						border="3px solid"
						borderColor="red.500"
						borderRadius="md"
						p={3}
						style={{ transform: "rotate(-15deg)" }}>
						<Icon as={IoClose} color="red.500" boxSize={10} />
					</Box>
				</motion.div>

				{/* Connect overlay — floats outside right edge */}
				<motion.div
					style={{
						opacity: connectOpacity,
						position: "absolute",
						top: "50%",
						right: -80,
						transform: "translateY(-50%)",
						zIndex: 20,
						pointerEvents: "none",
					}}>
					<Box
						border="3px solid"
						borderColor="green.500"
						borderRadius="md"
						p={3}
						style={{ transform: "rotate(15deg)" }}>
						<Icon as={FaCodePullRequest} color="green.500" boxSize={10} />
					</Box>
				</motion.div>

				{/* Next card peeking behind */}
				{nextUser && (
					<motion.div
						style={{
							scale: nextCardScale,
							opacity: nextCardOpacity,
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							pointerEvents: "none",
						}}>
						<FeedCard
							key={`next-${nextUser._id}`}
							user={nextUser}
							onSwipe={() => {}}
						/>
					</motion.div>
				)}

				{/* Current card */}
				<FeedCard
					key={currentUser._id}
					user={currentUser}
					onSwipe={triggerSwipe}
					motionX={x}
				/>
			</div>
		</Flex>
	)
}

export default Feed
