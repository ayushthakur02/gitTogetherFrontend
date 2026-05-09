import { createFileRoute } from "@tanstack/react-router"
import AuthenticatedLayout from "./AuthenticatedLayout"
export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
})
