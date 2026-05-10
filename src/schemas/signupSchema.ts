import { z } from "zod"

export const signupSchema = z
	.object({
		// STEP 1
		firstName: z.string().min(2, "First name is required"),

		lastName: z.string().min(2, "Last name is required"),

		username: z.string().min(3, "Username is required"),

		email: z.string().email("Invalid email"),

		password: z.string().min(8, "Password must be at least 8 characters"),

		confirmPassword: z.string(),

		// STEP 2
		profilePic: z.any(),

		morePhotos: z.array(z.any()),

		bio: z.string().min(10, "Bio is required"),

		age: z.coerce.number().min(18, "Must be at least 18"),

		gender: z.string().min(1, "Gender is required"),

		// STEP 3
		country: z.string().min(1, "Country is required"),

		state: z.string(),

		city: z.string(),

		skills: z.array(z.string()).min(1, "At least one skill is required"),

		phoneNumber: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmPassword"],
				message: "Passwords do not match",
			})
		}
	})

export type SignupFormData = z.infer<typeof signupSchema>
