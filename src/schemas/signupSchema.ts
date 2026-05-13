import { z } from "zod"

export const signupSchema = z
	.object({
		// STEP 1
		firstName: z.string().min(2, "Min 2 characters").max(20, "Max 20 characters"),

		lastName: z.string().min(2, "Min 2 characters").max(20, "Max 20 characters"),

		userName: z.string().min(3, "Min 3 characters").max(15, "Max 15 characters"),

		emailId: z.email({ message: "Invalid email" }).max(50, "Max 50 characters"),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
			.regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
			.regex(/[0-9]/, "Password must contain at least 1 number")
			.regex(/[!@#$%^&*]/, "Password must contain at least 1 special character"),

		confirmPassword: z.string().min(1, "Please confirm your password"),

		// STEP 2
		profilePic: z.any().optional(),

		morePhotos: z.array(z.any()).optional(),

		bio: z
			.string()
			.optional()
			.refine((val) => !val || val.length >= 10, {
				message: "Bio must be at least 10 characters",
			}),

		age: z.number().min(18, "Must be at least 18"),

		gender: z.enum(["male", "female", "others"], {
			message: "Please select a gender",
		}),

		// STEP 3
		country: z.string().min(1, "Country is required"),

		state: z.string().optional(),

		city: z.string().optional(),

		skills: z.array(z.string()).optional(),

		phoneNumber: z
			.string()
			.optional()
			.refine((val) => !val || /^\d{7,15}$/.test(val), {
				message: "Phone number must be 7–15 digits",
			}),
	})

export type SignupFormData = z.infer<typeof signupSchema>
