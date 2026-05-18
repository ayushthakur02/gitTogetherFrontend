import { SIDEBAR_ITEMS } from "@/constants/sidebarConstants"
import {
	Badge,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Icon,
	List,
	Switch,
	Text,
} from "@chakra-ui/react"

import { Link, useRouterState } from "@tanstack/react-router"
import { FaMoon, FaSun } from "react-icons/fa"
import { useLogout } from "@/hooks/useAuth"
import { useColorMode } from "./ui/color-mode"
import { useCurrentUser } from "@/hooks/useAuth"

const SideBar = () => {
	const logoutMutation = useLogout()
	const activePath = useRouterState({
		select: (state) => state.location.pathname,
	})
	const { data: currentUser } = useCurrentUser()

	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Box shadow="md" width="100%" height="100%" backgroundColor="bg.primary">
			<Flex
				direction="column"
				height="100%"
				justifyContent="space-between"
				p={6}>
				<Box>
					<Heading size="lg" mb={8} color="brand.primary">
						<Flex
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between">
							<Link to="/">gitTogether</Link>
							<Switch.Root
								colorPalette="blue"
								size="md"
								marginLeft={4}
								onCheckedChange={toggleColorMode}
								defaultChecked={colorMode === "light"}
								checked={colorMode === "light"}>
								<Switch.HiddenInput />
								<Switch.Control>
									<Switch.Thumb />
									<Switch.Indicator
										fallback={<Icon as={FaMoon} color="gray.400" />}>
										<Icon as={FaSun} color="yellow.400" />
									</Switch.Indicator>
								</Switch.Control>
								<Switch.Label></Switch.Label>
							</Switch.Root>
						</Flex>
						<Text mt={10}>
							Hi, {currentUser?.firstName} {currentUser?.lastName}
						</Text>
					</Heading>

					<List.Root
						as="ul"
						listStyle="none"
						display="flex"
						flexDirection="column"
						gap={3}>
						{SIDEBAR_ITEMS.map((item) => {
							if (item.disabled) {
								return (
									<List.Item
										key={item.id}
										cursor="not-allowed"
										backgroundColor="transparent"
										color="text.disabled"
										padding={2}
										borderRadius={4}
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										opacity={0.5}>
										<Flex align="center">
											<Icon size="sm" alignSelf="center" marginRight={3}>
												{item.icon}
											</Icon>
											<Center>{item.name}</Center>
										</Flex>
										<Badge
											colorPalette="blue"
											variant="subtle"
											fontSize="2xs"
											px={1.5}
											py={0.5}>
											Soon
										</Badge>
									</List.Item>
								)
							}

							return (
								<Link to={item.path as never} key={item.id}>
									<List.Item
										cursor="pointer"
										backgroundColor={
											item.path === activePath
												? "brand.secondary"
												: "transparent"
										}
										color="text.primary"
										padding={2}
										borderRadius={4}
										display="flex">
										<Icon size="sm" alignSelf="center" marginRight={3}>
											{item.icon}
										</Icon>

										<Center>{item.name}</Center>
									</List.Item>
								</Link>
							)
						})}
					</List.Root>
				</Box>

				<Button
					onClick={() => logoutMutation.mutate()}
					loading={logoutMutation.isPending}
					disabled={logoutMutation.isPending}>
					Logout
				</Button>
			</Flex>
		</Box>
	)
}

export default SideBar
