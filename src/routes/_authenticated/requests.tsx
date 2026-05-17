import Requests from "@/pages/Requests"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/requests")({
	component: Requests,
})
