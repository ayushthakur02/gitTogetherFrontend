import FeedCard from "@/components/ui/FeedCard"
import { useUserFeed } from "@/hooks/useUserFeed"
import { Flex, Spinner, Text } from "@chakra-ui/react"

const Feed = () => {
	const { data, isLoading, isError } = useUserFeed()

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
				<Text color="text.secondary">Failed to load feed. Please try again.</Text>
			</Flex>
		)
	}

	return (
		<Flex justifyContent="center" alignItems="center" height="100%">
			{data?.data[0] && <FeedCard user={data.data[0]} />}
		</Flex>
	)
}

export default Feed
