import type { SignupStepProps } from "@/interfaces/signup.interfaces"

import { Field, HStack, Input, VStack } from "@chakra-ui/react"

const SignupStepOne = ({ register, errors, password }: SignupStepProps) => {
	return (
		<VStack align="stretch" gap={4}>
			<HStack>
				<Field.Root required invalid={!!errors.firstName}>
					<Field.Label>
						First Name
						<Field.RequiredIndicator />
					</Field.Label>

					<Input placeholder="John" {...register("firstName")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{errors.firstName?.message}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root required invalid={!!errors.lastName}>
					<Field.Label>
						Last Name
						<Field.RequiredIndicator />
					</Field.Label>

					<Input placeholder="Doe" {...register("lastName")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{errors.lastName?.message}
					</Field.ErrorText>
				</Field.Root>
			</HStack>

			<HStack>
				<Field.Root required invalid={!!errors.userName}>
					<Field.Label>
						Username
						<Field.RequiredIndicator />
					</Field.Label>

					<Input placeholder="johndoe" {...register("userName")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{errors.userName?.message}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root required invalid={!!errors.emailId}>
					<Field.Label>
						Email
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="email"
						placeholder="Enter your email"
						{...register("emailId")}
					/>

					<Field.ErrorText>
						<Field.ErrorIcon />
						{errors.emailId?.message}
					</Field.ErrorText>
				</Field.Root>
			</HStack>

			<HStack>
				<Field.Root required invalid={!!errors.password}>
					<Field.Label>
						Password
						<Field.RequiredIndicator />
					</Field.Label>

					<Input type="password" {...register("password")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{errors.password?.message}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root required invalid={!!errors.confirmPassword}>
					<Field.Label>
						Confirm Password
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="password"
						{...register("confirmPassword", {
							validate: (val) =>
								val === password || "Passwords do not match",
						})}
					/>

					<Field.ErrorText>
						<Field.ErrorIcon />
						{errors.confirmPassword?.message}
					</Field.ErrorText>
				</Field.Root>
			</HStack>
		</VStack>
	)
}

export default SignupStepOne
