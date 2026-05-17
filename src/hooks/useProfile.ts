import { changePassword, deleteProfile, editProfile } from "@/api/profile"
import toaster from "@/components/ui/toaster"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditProfile = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: editProfile,

		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["currentUser"] })
			toaster.create({
				title: data?.message || "Profile updated successfully",
				type: "success",
				duration: 3000,
			})
		},

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.message
				: "Something went wrong"
			toaster.create({
				title: "Update Failed",
				description: message,
				type: "error",
			})
		},
	})
}

export const useChangePassword = () => {
	return useMutation({
		mutationFn: changePassword,

		onSuccess: (data) => {
			toaster.create({
				title: data?.message || "Password changed successfully",
				type: "success",
				duration: 3000,
			})
		},

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.message
				: "Something went wrong"
			toaster.create({
				title: "Password Change Failed",
				description: message,
				type: "error",
			})
		},
	})
}

export const useDeleteProfile = () => {
	return useMutation({
		mutationFn: deleteProfile,

		onError: (error) => {
			const message = axios.isAxiosError(error)
				? error.response?.data?.message || error.message
				: "Something went wrong"
			toaster.create({
				title: "Delete Failed",
				description: message,
				type: "error",
			})
		},
	})
}
