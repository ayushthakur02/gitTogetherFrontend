import type { PhotoCarouselProps } from "@/interfaces/feed.interfaces"
import { Box, Carousel, HStack, Icon, Image } from "@chakra-ui/react"
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

const PhotoCarousel = ({ photos, name, height, objectFit = "cover" }: PhotoCarouselProps) => {
	const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

	const handleImgError = (index: number) =>
		setFailedImages((prev) => new Set([...prev, index]))

	if (photos.length === 0 || failedImages.size === photos.length) {
		return <AvatarFallback height={height} />
	}

	return (
		<Box height={height} position="relative">
			<Carousel.Root
				slideCount={photos.length}
				height={height}
				css={{ "--slide-spacing": "0px" }}>
				<Carousel.ItemGroup height={height}>
					{photos.map((photo, i) => (
						<Carousel.Item key={i} index={i} height={height}>
							{failedImages.has(i) ? (
								<AvatarFallback height={height} />
							) : (
								<Image
									src={photo}
									alt={`${name} photo ${i + 1}`}
									width="100%"
									height={height}
									objectFit={objectFit}
									draggable={false}
									onError={() => handleImgError(i)}
								/>
							)}
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>

				{photos.length > 1 && (
					<>
						<Carousel.Context>
							{({ page }) => (
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
											bg={i === page ? "white" : "whiteAlpha.500"}
											transition="background 0.2s"
										/>
									))}
								</HStack>
							)}
						</Carousel.Context>

						<Carousel.Control
							position="absolute"
							inset={0}
							display="flex"
							alignItems="stretch"
							bg="transparent"
							p={0}>
							<Carousel.PrevTrigger
								asChild
								flex="0 0 35%"
								height="100%"
								borderRadius={0}
								bg="transparent"
								_hover={{ bg: "transparent" }}
								onClick={(e) => e.stopPropagation()}>
								<Box cursor="pointer" />
							</Carousel.PrevTrigger>
							<Box flex={1} />
							<Carousel.NextTrigger
								asChild
								flex="0 0 35%"
								height="100%"
								borderRadius={0}
								bg="transparent"
								_hover={{ bg: "transparent" }}
								onClick={(e) => e.stopPropagation()}>
								<Box cursor="pointer" />
							</Carousel.NextTrigger>
						</Carousel.Control>
					</>
				)}
			</Carousel.Root>

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
