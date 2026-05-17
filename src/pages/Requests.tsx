import ProfileCard from "@/components/ui/ProfileCard"
import DetailDrawer from "@/components/ui/DetailDrawer"
import { useUserRequestsList } from "@/hooks/useUser"
import { useSendRequest } from "@/hooks/useRequest"
import {
	Box,
	Button,
	Flex,
	Grid,
	HStack,
	Spinner,
	Text,
} from "@chakra-ui/react"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const LIMIT = 12

const Requests = () => {
	const [page, setPage] = useState(1)
	const [drawerUserId, setDrawerUserId] = useState<string | null>(null)
	const { data, isLoading, isError } = useUserRequestsList(page, LIMIT)
	const requestMutation = useSendRequest()
	const queryClient = useQueryClient()

	const totalPages = Math.ceil((data?.total ?? 0) / LIMIT) || 1

	const handleAction = (
		status: "starred" | "dismissed",
		initiatorID: string,
	) => {
		requestMutation.mutate(
			{ status, recipientID: initiatorID },
			{
				onSettled: () => {
					queryClient.invalidateQueries({ queryKey: ["requests"] })
				},
			},
		)
	}

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
					Failed to load requests. Please try again.
				</Text>
			</Flex>
		)
	}

	if (!data?.data.length) {
		return (
			<Flex
				height="100%"
				justifyContent="center"
				alignItems="center"
				direction="column"
				gap={3}>
				<Text fontSize="xl" color="text.primary" fontWeight="semibold">
					No pending requests!
				</Text>
				<Text color="text.secondary">
					You're all caught up. Keep swiping on the Feed to find more
					developers.
				</Text>
			</Flex>
		)
	}

	return (
		<Box p={8} height="100%" overflowY="auto">
			{/* Header */}
			<Box mb={6}>
				<HStack gap={3} align="baseline">
					<Text fontSize="3xl" fontWeight="bold" color="text.primary">
						Pending Requests
					</Text>
					<Text fontSize="lg" color="brand.secondary" fontWeight="semibold">
						({data.total})
					</Text>
				</HStack>
				<Text color="text.secondary" mt={1}>
					These developers starred your profile. Accept to start collaborating.
				</Text>
			</Box>

			{/* Grid */}
			<Grid
				templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
				gap={4}
				mb={8}>
				{data.data.map((request) => (
					<ProfileCard
						key={request.requestID}
						user={request}
						actions={[
							{
								label: "Profile",
								variant: "outline",
								onClick: () => setDrawerUserId(request.initiatorID),
							},
							{
								label: "Decline",
								variant: "outline",
								colorPalette: "red",
								icon: <X size={14} />,
								onClick: () => handleAction("dismissed", request.initiatorID),
							},
							{
								label: "Accept",
								colorPalette: "green",
								icon: <Check size={14} />,
								onClick: () => handleAction("starred", request.initiatorID),
							},
						]}
					/>
				))}
			</Grid>

			{/* Pagination */}
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

			{drawerUserId && (
				<DetailDrawer
					id={drawerUserId}
					isDrawerOpen={!!drawerUserId}
					setIsDrawerOpen={(open) => !open && setDrawerUserId(null)}
					onSwipe={(status) => handleAction(status, drawerUserId)}
				/>
			)}
		</Box>
	)
}

export default Requests
