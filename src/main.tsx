import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "./components/ui/color-mode"
import { system } from "./theme"
import "./theme.css"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/queryClient"
import ToasterTag from "./components/ui/ToasterTag"
const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<QueryClientProvider client={queryClient}>
			<StrictMode>
				<ChakraProvider value={system}>
					<ColorModeProvider>
						<RouterProvider router={router} />
						<ToasterTag />
					</ColorModeProvider>
				</ChakraProvider>
			</StrictMode>
		</QueryClientProvider>,
	)
}
