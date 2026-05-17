import { z } from "zod"

export const editProfileSchema = z.object({
	age: z
		.number({ invalid_type_error: "Age is required" })
		.min(18, "Must be at least 18")
		.max(100, "Must be at most 100"),
	bio: z
		.string()
		.optional()
		.refine((val) => !val || val.length >= 10, {
			message: "Bio must be at least 10 characters",
		}),
	skills: z.array(z.string()).optional(),
})

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, "Old password is required"),
		newPassword: z
			.string()
			.min(8, "At least 8 characters")
			.regex(/[A-Z]/, "At least 1 uppercase letter")
			.regex(/[a-z]/, "At least 1 lowercase letter")
			.regex(/[0-9]/, "At least 1 number")
			.regex(/[!@#$%^&*]/, "At least 1 special character"),
		confirmNewPassword: z.string().min(1, "Please confirm your new password"),
	})
	.refine((data) => data.oldPassword !== data.newPassword, {
		message: "New password must be different from old password",
		path: ["newPassword"],
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords do not match",
		path: ["confirmNewPassword"],
	})

export type EditProfileFormData = z.infer<typeof editProfileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
