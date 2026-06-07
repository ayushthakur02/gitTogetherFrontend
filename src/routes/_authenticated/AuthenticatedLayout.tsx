import SideBar from "@/components/SideBar"
import { SIDEBAR_ITEMS } from "@/constants/sidebarConstants"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { Link, Outlet, useRouterState } from "@tanstack/react-router"
import { useCurrentUser } from "@/hooks/useAuth"

const AuthenticatedLayout = () => {
	useCurrentUser()
	const activePath = useRouterState({
		select: (state) => state.location.pathname,
	})

	return (
		<Flex height="100vh" overflow="hidden">
			<Box width="280px" height="100%" flexShrink={0} display={{ base: "none", md: "block" }}>
				<SideBar />
			</Box>

			<Box flex={1} height="100%" overflowY="auto" pb={{ base: "64px", md: 0 }}>
				<Outlet />
			</Box>

			<Box
				display={{ base: "flex", md: "none" }}
				position="fixed"
				bottom={0}
				left={0}
				right={0}
				height="64px"
				bg="bg.primary"
				borderTop="1px solid"
				borderColor="border.default"
				zIndex={100}
				alignItems="center"
				justifyContent="space-around"
				px={2}>
				{SIDEBAR_ITEMS.filter((item) => !item.disabled).map((item) => (
					<Link to={item.path as never} key={item.id}>
						<Flex
							direction="column"
							align="center"
							gap={0.5}
							p={2}
							borderRadius="md"
							color={item.path === activePath ? "brand.secondary" : "text.secondary"}>
							<Icon boxSize={5}>{item.icon}</Icon>
							<Text
								fontSize="2xs"
								fontWeight={item.path === activePath ? "semibold" : "normal"}>
								{item.name}
							</Text>
						</Flex>
					</Link>
				))}
			</Box>
		</Flex>
	)
}

export default AuthenticatedLayout
