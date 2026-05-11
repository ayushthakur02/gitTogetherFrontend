import { z } from "zod"

export const signupSchema = z
	.object({
		// STEP 1
		firstName: z.string().min(2, "First name is required"),

		lastName: z.string().min(2, "Last name is required"),

		username: z.string().min(3, "Username is required"),

		email: z.email({
			message: "Invalid email",
		}),

		password: z
			.string()
			.min(8, {
				message: "Password must be at least 8 characters",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least 1 uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least 1 lowercase letter",
			})
			.regex(/[0-9]/, {
				message: "Password must contain at least 1 number",
			})
			.regex(/[!@#$%^&*]/, {
				message: "Password must contain at least 1 special character",
			}),

		confirmPassword: z.string({}),

		// STEP 2
		profilePic: z.any(),

		morePhotos: z.array(z.any()),

		bio: z.string().min(10, "Bio is required"),

		age: z.number().min(18, "Must be at least 18"),

		gender: z.string().min(1, "Gender is required"),

		// STEP 3
		country: z.string().min(1, "Country is required"),

		state: z.string(),

		city: z.string(),

		skills: z.array(z.string()).min(1, "At least one skill is required"),

		phoneNumber: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],

		message: "Passwords do not match",
	})

export type SignupFormData = z.infer<typeof signupSchema>
