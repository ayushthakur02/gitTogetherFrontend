import { createFileRoute } from "@tanstack/react-router"
import Chats from "../../pages/Chats"
export const Route = createFileRoute("/_authenticated/chats")({
	component: Chats,
})
