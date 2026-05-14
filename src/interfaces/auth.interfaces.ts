import type {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form"

import type { SignupFormData } from "@/schemas/signupSchema"

export interface LoginPayload {
	userId: string
	password: string
}

export interface LoginFormData {
	userId: string
	password: string
}

export interface SignupPayload {
	firstName: string
	lastName: string
	emailId: string
	userName: string
	password: string
	age: number
	gender: "male" | "female" | "others"
	country: string
	state?: string
	city?: string
	bio?: string
	profilePic?: string
	morePhotos?: string[]
	skills?: string[]
	phoneNumber?: string
}

export interface SignupStepProps {
	register: UseFormRegister<SignupFormData>
	errors: FieldErrors<SignupFormData>
	setValue?: UseFormSetValue<SignupFormData>
	control?: Control<SignupFormData>
	password?: string
}
