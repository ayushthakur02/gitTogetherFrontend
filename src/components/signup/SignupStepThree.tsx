import type { SignupStepProps } from "@/pages/signup.interfaces"

import { Field, HStack, Input, TagsInput, VStack } from "@chakra-ui/react"

const SignupStepThree = ({ formData, setFormData }: SignupStepProps) => {
	return (
		<VStack align="stretch" gap={4}>
			<HStack>
				<Field.Root>
					<Field.Label>Country</Field.Label>

					<Input
						value={formData.country}
						onChange={(e) =>
							setFormData({
								...formData,
								country: e.target.value,
							})
						}
					/>
				</Field.Root>

				<Field.Root>
					<Field.Label>State</Field.Label>

					<Input
						value={formData.state}
						onChange={(e) =>
							setFormData({
								...formData,
								state: e.target.value,
							})
						}
					/>
				</Field.Root>
			</HStack>

			<HStack>
				<Field.Root>
					<Field.Label>City</Field.Label>

					<Input
						value={formData.city}
						onChange={(e) =>
							setFormData({
								...formData,
								city: e.target.value,
							})
						}
					/>
				</Field.Root>

				<Field.Root>
					<Field.Label>Phone Number</Field.Label>

					<Input
						type="tel"
						value={formData.phoneNumber}
						onChange={(e) =>
							setFormData({
								...formData,
								phoneNumber: e.target.value,
							})
						}
					/>
				</Field.Root>
			</HStack>

			<Field.Root>
				<Field.Label>Skills</Field.Label>

				<TagsInput.Root
					value={formData.skills}
					onValueChange={(e) =>
						setFormData({
							...formData,
							skills: e.value,
						})
					}>
					<TagsInput.HiddenInput />

					<TagsInput.Control>
						<TagsInput.Input placeholder="React, Node, Java..." />
					</TagsInput.Control>
				</TagsInput.Root>
			</Field.Root>
		</VStack>
	)
}

export default SignupStepThree
