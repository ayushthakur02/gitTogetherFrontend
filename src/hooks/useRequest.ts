import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { sendRequest } from "../api/request"
import toaster from "../components/ui/toaster"
import type {
	sendRequestPayload,
	sendRequestResponse,
} from "@/interfaces/request.interfaces"

export const useSendRequest = () => {
	return useMutation({
		mutationFn: (params: sendRequestPayload) =>
			sendRequest(params.status, params.recipientID),

		onSuccess: (data: sendRequestResponse) => {
			const message = data?.message
			toaster.create({
				title: message,
				type: "success",
				duration: 3000,
			})
		},

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.message
				: "Something went wrong"

			toaster.create({
				title: "Action Failed",
				description: message,
				type: "error",
			})
		},
	})
}
