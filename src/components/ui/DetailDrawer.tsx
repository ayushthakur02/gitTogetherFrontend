import { useUserDetail } from "@/hooks/useUser"
import type { DetailDrawerProps } from "@/interfaces/feed.interfaces"
import {
	Badge,
	Box,
	Button,
	CloseButton,
	Drawer,
	HStack,
	Icon,
	Portal,
	Skeleton,
	SkeletonText,
	Text,
	VStack,
} from "@chakra-ui/react"
import { FaCodePullRequest } from "react-icons/fa6"
import { IoClose, IoLocationSharp, IoPerson } from "react-icons/io5"
import PhotoCarousel from "./PhotoCarousel"

const DetailDrawer = ({
	id,
	setIsDrawerOpen,
	isDrawerOpen,
	onSwipe,
	hideActions = false,
}: DetailDrawerProps) => {
	const { data, isLoading } = useUserDetail(isDrawerOpen ? id : "")
	const photos = [data?.profilePic, ...(data?.morePhotos ?? [])].filter(
		(p): p is string => !!p,
	)

	const location = [data?.city, data?.state, data?.country]
		.filter(Boolean)
		.join(", ")

	return (
		<Drawer.Root
			size="md"
			open={isDrawerOpen}
			preventScroll={false}
			onEscapeKeyDown={() => setIsDrawerOpen(false)}
			onInteractOutside={() => setIsDrawerOpen(false)}>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" onClick={() => setIsDrawerOpen(false)} />
						</Drawer.CloseTrigger>

						<Drawer.Body p={0}>
							<Box height="380px" bg="black">
								{isLoading ? (
									<Skeleton height="380px" />
								) : (
									<PhotoCarousel
										photos={photos}
										name={data?.firstName ?? ""}
										height="380px"
										objectFit="contain"
									/>
								)}
							</Box>

							<VStack align="stretch" gap={5} px={5} py={5}>
								{/* Name, age, gender */}
								{isLoading ? (
									<SkeletonText noOfLines={2} />
								) : (
									<Box>
										<Text fontWeight="bold" fontSize="2xl" color="text.primary">
											{data?.firstName} {data?.lastName}
											{data?.age ? `, ${data.age}` : ""}
										</Text>
										{data?.userName && (
											<Text fontSize="sm" color="text.secondary">
												@{data.userName}
											</Text>
										)}
										{data?.gender && (
											<HStack gap={1} mt={0.5}>
												<Icon
													as={IoPerson}
													color="text.secondary"
													boxSize={3.5}
												/>
												<Text fontSize="sm" color="text.secondary">
													{data.gender}
												</Text>
											</HStack>
										)}
									</Box>
								)}

								{/* Location */}
								{isLoading ? (
									<SkeletonText noOfLines={1} />
								) : (
									location && (
										<HStack gap={1.5}>
											<Icon
												as={IoLocationSharp}
												color="text.secondary"
												boxSize={4}
											/>
											<Text fontSize="sm" color="text.secondary">
												{location}
											</Text>
										</HStack>
									)
								)}

								{/* Bio */}
								{isLoading ? (
									<SkeletonText noOfLines={3} />
								) : (
									data?.bio && (
										<Box>
											<Text
												fontSize="xs"
												fontWeight="semibold"
												color="text.secondary"
												textTransform="uppercase"
												letterSpacing="wide"
												mb={1.5}>
												About
											</Text>
											<Text fontSize="sm" color="text.primary">
												{data.bio}
											</Text>
										</Box>
									)
								)}

								{/* Skills */}
								{isLoading ? (
									<SkeletonText noOfLines={2} />
								) : (
									data?.skills &&
									data.skills.length > 0 && (
										<Box>
											<Text
												fontSize="xs"
												fontWeight="semibold"
												color="text.secondary"
												textTransform="uppercase"
												letterSpacing="wide"
												mb={2}>
												Skills
											</Text>
											<HStack flexWrap="wrap" gap={2}>
												{data.skills.map((skill) => (
													<Badge
														key={skill}
														colorPalette="blue"
														variant="subtle"
														fontSize="sm"
														px={3}
														py={1}>
														{skill}
													</Badge>
												))}
											</HStack>
										</Box>
									)
								)}

							</VStack>
						</Drawer.Body>
						{!hideActions && (
							<Drawer.Footer justifyContent="center" gap={6}>
								<Button
									variant="outline"
									colorPalette="red"
									borderRadius="full"
									size="lg"
									onClick={() => {
										setIsDrawerOpen(false)
										onSwipe("dismissed")
									}}>
									<Icon as={IoClose} />
								</Button>
								<Button
									colorPalette="green"
									borderRadius="full"
									size="lg"
									onClick={() => {
										setIsDrawerOpen(false)
										onSwipe("starred")
									}}>
									<Icon as={FaCodePullRequest} />
								</Button>
							</Drawer.Footer>
						)}
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	)
}

export default DetailDrawer
