import SideBar from "@/components/SideBar"
import { Box, Flex } from "@chakra-ui/react"
import { Outlet } from "@tanstack/react-router"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const AuthenticatedLayout = () => {
	useCurrentUser()

	return (
		<Flex height="100vh" overflow="hidden">
			<Box width="280px" height="100%" flexShrink={0}>
				<SideBar />
			</Box>

			<Box flex={1} height="100%" overflowY="auto">
				<Outlet />
			</Box>
		</Flex>
	)
}

export default AuthenticatedLayout
