import type { UserFeed } from "@/interfaces/user.interfaces"
import { Badge, Button, Card, Flex, HStack, Image, Text } from "@chakra-ui/react"

interface FeedCardProps {
	user: UserFeed
}

const FeedCard = ({ user }: FeedCardProps) => {
	return (
		<Card.Root maxW="sm" overflow="hidden">
			<Image src={user.profilePic} alt={user.firstName} />

			<Card.Body gap="3">
				<Flex justify="space-between" align="center">
					<Card.Title>
						{user.firstName} {user.lastName}, {user.age}
					</Card.Title>
					<Text fontSize="sm" color="text.secondary">
						{user.city}, {user.country}
					</Text>
				</Flex>

				<Text fontSize="sm" color="text.secondary">
					{user.bio}
				</Text>

				<HStack flexWrap="wrap" gap={2}>
					{user.skills.map((skill) => (
						<Badge key={skill} colorPalette="blue" variant="subtle">
							{skill}
						</Badge>
					))}
				</HStack>
			</Card.Body>

			<Card.Footer gap="2">
				<Button flex={1} variant="outline" colorPalette="red">
					Pass
				</Button>
				<Button flex={1} colorPalette="green">
					Connect
				</Button>
			</Card.Footer>
		</Card.Root>
	)
}

export default FeedCard
