import { Box, Flex } from "@chakra-ui/react"
import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export function RootComponent() {
	return (
		<>
			<Flex height="100vh" overflow="hidden" justify="center">
				<Box width="90%" height="70%">
					<Outlet />
				</Box>
			</Flex>

			<TanStackRouterDevtools position="bottom-right" />
		</>
	)
}
