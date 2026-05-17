import type { ChangePasswordPayload, EditProfilePayload } from "@/interfaces/profile.interfaces"
import axiosInstance from "@/lib/axios"

export const editProfile = async (data: EditProfilePayload) => {
	const response = await axiosInstance.patch("/profile/edit", data)
	return response.data
}

export const changePassword = async (data: ChangePasswordPayload) => {
	const response = await axiosInstance.patch("/profile/change-password", data)
	return response.data
}

export const deleteProfile = async (id: string) => {
	const response = await axiosInstance.delete(`/profile/delete/${id}`)
	return response.data
}
