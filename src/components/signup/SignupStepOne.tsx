import type { SignupStepProps } from "@/interfaces/signup.interfaces"

import { Field, HStack, Input, VStack } from "@chakra-ui/react"

const SignupStepOne = ({ register, errors }: SignupStepProps) => {
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
				<Field.Root required invalid={!!errors.username}>
					<Field.Label>
						Username
						<Field.RequiredIndicator />
					</Field.Label>

					<Input placeholder="johndoe" {...register("username")} />

					<Field.ErrorText>
						<Field.ErrorIcon />

						{errors.username?.message}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root required invalid={!!errors.email}>
					<Field.Label>
						Email
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="email"
						placeholder="Enter your email"
						{...register("email")}
					/>

					<Field.ErrorText>
						<Field.ErrorIcon />

						{errors.email?.message}
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

					<Input type="password" {...register("confirmPassword")} />

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
