import "./App.css"
import { Container } from "@chakra-ui/react"
import SideBar from "./components/SideBar"

function App() {
	return (
		<Container padding={0} maxWidth={"100%"} display={"flex"}>
			<SideBar />
		</Container>
	)
}

export default App
