export interface SignupFormData {
	// STEP 1
	firstName: string
	lastName: string
	username: string
	email: string
	password: string
	confirmPassword: string

	// STEP 2
	profilePic: File | null
	morePhotos: File[]

	bio: string
	age: number | ""
	gender: string

	// STEP 3
	country: string
	state: string
	city: string

	skills: string[]

	phoneNumber: string
}

export interface SignupStepProps {
	formData: SignupFormData

	setFormData: React.Dispatch<React.SetStateAction<SignupFormData>>
}
