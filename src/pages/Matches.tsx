import ProfileCard from "@/components/ui/ProfileCard"
import DetailDrawer from "@/components/ui/DetailDrawer"
import { useUserMatches } from "@/hooks/useUser"
import {
	Box,
	Button,
	Flex,
	Grid,
	HStack,
	Spinner,
	Text,
} from "@chakra-ui/react"
import { MessageSquare } from "lucide-react"
import { FaExpandArrowsAlt } from "react-icons/fa"
import { useState } from "react"

const LIMIT = 12

const Matches = () => {
	const [page, setPage] = useState(1)
	const [drawerUserId, setDrawerUserId] = useState<string | null>(null)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const { data, isLoading, isError } = useUserMatches(page, LIMIT)

	const totalPages = data?.pageTotal ?? 1

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
				<Text color="text.secondary">Failed to load matches. Please try again.</Text>
			</Flex>
		)
	}

	if (!data?.data.length) {
		return (
			<Flex height="100%" justifyContent="center" alignItems="center" direction="column" gap={3}>
				<Text fontSize="xl" color="text.primary" fontWeight="semibold">
					No matches yet!
				</Text>
				<Text color="text.secondary">
					Keep swiping on the Feed to find your perfect technical match.
				</Text>
			</Flex>
		)
	}

	return (
		<Box p={8} height="100%" overflowY="auto">
<Box mb={6}>
				<HStack gap={3} align="baseline">
					<Text fontSize="3xl" fontWeight="bold" color="text.primary">
						Matched Repos
					</Text>
					<Text fontSize="lg" color="brand.secondary" fontWeight="semibold">
						({data.total})
					</Text>
				</HStack>
				<Text color="text.secondary" mt={1}>
					These are the developers who branched into your heart. Start a pull
					request to initiate a conversation.
				</Text>
			</Box>

<Grid
				templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
				gap={4}
				mb={8}>
				{data.data.map((match) => (
					<ProfileCard
						key={match._id}
						user={match}
						actions={[
							{
								label: "Profile",
								variant: "outline",
								icon: <FaExpandArrowsAlt size={16} />,
								onClick: () => { setDrawerUserId(match._id); setIsDrawerOpen(true) },
							},
							{
								label: "Chat",
								colorPalette: "blue",
								icon: <MessageSquare size={16} />,
								onClick: () => {},
							},
						]}
					/>
				))}
			</Grid>

<HStack justify="center" gap={4}>
				<Button
					variant="outline"
					size="sm"
					disabled={page === 1}
					onClick={() => setPage((p) => p - 1)}>
					Previous
				</Button>
				<Text fontSize="sm" color="text.secondary">
					Page {page} of {totalPages}
				</Text>
				<Button
					variant="outline"
					size="sm"
					disabled={page === totalPages}
					onClick={() => setPage((p) => p + 1)}>
					Next
				</Button>
			</HStack>

			<DetailDrawer
				id={drawerUserId ?? ""}
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
				onSwipe={() => {}}
				hideActions
			/>
		</Box>
	)
}

export default Matches
