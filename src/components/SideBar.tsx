import { Box, Flex, Heading } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import React from "react"

const SideBar = () => {
	return (
		<Box
			shadow={"md"}
			width={"20%"}
			height={"100vh"}
			backgroundColor={"bg.primary"}
			padding={0}>
			<Heading size={"lg"} padding={4} color={"brand.primary"}>
				gitTogether
			</Heading>
			<Flex flexDirection={"column"} height={"100vh"}>
				<Link to="/feed">Feed</Link>
				<Link to="/matches">Matches</Link>
				<Link to="/chats">Chats</Link>
				<Link to="/profile">Profile</Link>
			</Flex>
		</Box>
	)
}

export default SideBar
