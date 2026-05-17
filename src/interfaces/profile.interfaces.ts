export interface EditProfilePayload {
	age?: number
	skills?: string[]
	bio?: string
	profilePic?: string
	morePhotos?: string[]
}

export interface ChangePasswordPayload {
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
}
