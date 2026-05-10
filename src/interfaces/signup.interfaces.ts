import type {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form"

import type { SignupFormData } from "@/schemas/signupSchema"

export interface SignupStepProps {
	register: UseFormRegister<SignupFormData>

	errors: FieldErrors<SignupFormData>

	setValue: UseFormSetValue<SignupFormData>

	control: Control<SignupFormData>
}
