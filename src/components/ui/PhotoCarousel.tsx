import type { PhotoCarouselProps } from "@/interfaces/feed.interfaces"
import { Box, HStack, Icon, Image } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IoPerson } from "react-icons/io5"

const AvatarFallback = ({ height }: { height: string }) => (
	<Box
		height={height}
		display="flex"
		alignItems="center"
		justifyContent="center"
		bg="bg.tertiary">
		<Icon as={IoPerson} boxSize={20} color="text.disabled" />
	</Box>
)

const slideVariants = {
	enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
	center: { x: 0 },
	exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
}

const PhotoCarousel = ({ photos, name, height, objectFit = "cover" }: PhotoCarouselProps) => {
	const [current, setCurrent] = useState(0)
	const [direction, setDirection] = useState(0)
	const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

	const handleImgError = (index: number) =>
		setFailedImages((prev) => new Set([...prev, index]))

	if (photos.length === 0 || failedImages.size === photos.length) {
		return <AvatarFallback height={height} />
	}

	const navigate = (newIndex: number) => {
		setDirection(newIndex > current ? 1 : -1)
		setCurrent(newIndex)
	}

	const prev = () => navigate(current === 0 ? photos.length - 1 : current - 1)
	const next = () => navigate(current === photos.length - 1 ? 0 : current + 1)

	return (
		<Box height={height} position="relative" overflow="hidden">
			{photos.length > 1 && (
				<HStack
					position="absolute"
					top={2}
					left={2}
					right={2}
					zIndex={10}
					gap={1}
					pointerEvents="none">
					{photos.map((_, i) => (
						<Box
							key={i}
							flex={1}
							height="2.5px"
							borderRadius="full"
							bg={i === current ? "white" : "whiteAlpha.500"}
							transition="background 0.2s"
						/>
					))}
				</HStack>
			)}

			<AnimatePresence initial={false} custom={direction} mode="sync">
				<motion.div
					key={current}
					custom={direction}
					variants={slideVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
					style={{ position: "absolute", width: "100%", height: "100%" }}>
					{failedImages.has(current) ? (
						<AvatarFallback height={height} />
					) : (
						<Image
							src={photos[current]}
							alt={`${name} photo ${current + 1}`}
							width="100%"
							height={height}
							objectFit={objectFit}
							draggable={false}
							onError={() => handleImgError(current)}
						/>
					)}
				</motion.div>
			</AnimatePresence>

			{photos.length > 1 && (
				<>
					<Box
						position="absolute"
						left={0}
						top={0}
						bottom={0}
						width="35%"
						zIndex={5}
						cursor="pointer"
						onClick={(e) => { e.stopPropagation(); prev() }}
					/>
					<Box
						position="absolute"
						right={0}
						top={0}
						bottom={0}
						width="35%"
						zIndex={5}
						cursor="pointer"
						onClick={(e) => { e.stopPropagation(); next() }}
					/>
				</>
			)}

			<Box
				position="absolute"
				bottom={0}
				left={0}
				right={0}
				height="50%"
				background="linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
				pointerEvents="none"
				zIndex={8}
			/>
		</Box>
	)
}

export default PhotoCarousel
