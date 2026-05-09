import SideBar from "@/components/SideBar"
import { Container } from "@chakra-ui/react"
import React from "react"

const AuthenticatedLayout = () => {
	return (
		<Container padding={0} maxWidth={"100%"} display={"flex"}>
			<SideBar />
		</Container>
	)
}

export default AuthenticatedLayout
