import type { ProfileCardAction, ProfileCardUser } from "@/interfaces/feed.interfaces"
import { Badge, Box, Button, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import { IoPerson } from "react-icons/io5"

interface ProfileCardProps {
	user: ProfileCardUser
	actions: ProfileCardAction[]
}

const ProfileCard = ({ user, actions }: ProfileCardProps) => {
	const location = [user.city, user.state, user.country].filter(Boolean).join(", ")

	return (
		<Box
			bg="bg.secondary"
			border="1px solid"
			borderColor="border.default"
			borderRadius="xl"
			display="flex"
			flexDirection="column"
			gap={3}
			p={4}>
			<Box
				border="2px solid"
				borderColor="brand.secondary"
				borderRadius="xl"
				overflow="hidden"
				width="100%"
				aspectRatio="1">
				{user.profilePic ? (
					<Image
						src={user.profilePic}
						alt={user.firstName}
						width="100%"
						height="100%"
						objectFit="cover"
					/>
				) : (
					<Box
						width="100%"
						height="100%"
						display="flex"
						alignItems="center"
						justifyContent="center"
						bg="bg.tertiary">
						<Icon as={IoPerson} boxSize={16} color="text.disabled" />
					</Box>
				)}
			</Box>

			<VStack align="start" gap={1} flex={1}>
				<Text fontWeight="semibold" fontSize="md" color="text.primary" lineClamp={1}>
					{user.firstName} {user.lastName}
					{user.age ? `, ${user.age}` : ""}
				</Text>
				{user.userName && (
					<Text fontSize="xs" color="text.secondary">
						@{user.userName}
					</Text>
				)}
				{location && (
					<Text fontSize="xs" color="text.secondary" lineClamp={1}>
						{location}
					</Text>
				)}
			</VStack>

			{user.skills && user.skills.length > 0 && (
				<HStack flexWrap="wrap" gap={1}>
					{user.skills.slice(0, 3).map((skill) => (
						<Badge key={skill} variant="outline" fontSize="2xs" colorPalette="blue">
							{skill}
						</Badge>
					))}
					{user.skills.length > 3 && (
						<Badge variant="outline" fontSize="2xs" colorPalette="gray">
							+{user.skills.length - 3}
						</Badge>
					)}
				</HStack>
			)}

			<HStack justify="center" gap={6} pt={1}>
				{actions.map((action) => (
					<Button
						key={action.label}
						variant={action.variant ?? "outline"}
						colorPalette={action.colorPalette}
						borderRadius="full"
						size="lg"
						w="48px"
						h="48px"
						p={0}
						minW="unset"
						aria-label={action.label}
						onClick={action.onClick}>
						{action.icon}
					</Button>
				))}
			</HStack>
		</Box>
	)
}

export default ProfileCard
