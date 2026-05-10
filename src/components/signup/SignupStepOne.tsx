import type { SignupStepProps } from "@/pages/signup.interfaces"
import { Field, HStack, Input, VStack } from "@chakra-ui/react"

const SignupStepOne = ({ formData, setFormData }: SignupStepProps) => {
	return (
		<VStack align="stretch" gap={4}>
			<HStack>
				<Field.Root required>
					<Field.Label>
						First Name
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						placeholder="John"
						value={formData.firstName}
						onChange={(e) =>
							setFormData({
								...formData,
								firstName: e.target.value,
							})
						}
					/>
				</Field.Root>

				<Field.Root required>
					<Field.Label>
						Last Name
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						placeholder="Doe"
						value={formData.lastName}
						onChange={(e) =>
							setFormData({
								...formData,
								lastName: e.target.value,
							})
						}
					/>
				</Field.Root>
			</HStack>

			<HStack>
				<Field.Root required>
					<Field.Label>
						Username
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						placeholder="johndoe"
						value={formData.username}
						onChange={(e) =>
							setFormData({
								...formData,
								username: e.target.value,
							})
						}
					/>
				</Field.Root>

				<Field.Root required>
					<Field.Label>
						Email
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="email"
						placeholder="Enter your email"
						value={formData.email}
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value,
							})
						}
					/>
				</Field.Root>
			</HStack>

			<HStack>
				<Field.Root required>
					<Field.Label>
						Password
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="password"
						value={formData.password}
						onChange={(e) =>
							setFormData({
								...formData,
								password: e.target.value,
							})
						}
					/>
				</Field.Root>

				<Field.Root required>
					<Field.Label>
						Confirm Password
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="password"
						value={formData.confirmPassword}
						onChange={(e) =>
							setFormData({
								...formData,
								confirmPassword: e.target.value,
							})
						}
					/>
				</Field.Root>
			</HStack>
		</VStack>
	)
}

export default SignupStepOne
