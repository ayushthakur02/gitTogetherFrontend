import { Field, HStack, Input, VStack } from "@chakra-ui/react"

const SignupStepFour = () => {
	return (
		<VStack align="stretch" gap={4}>
			<HStack>
				<Field.Root>
					<Field.Label>Country</Field.Label>

					<Input />
				</Field.Root>

				<Field.Root>
					<Field.Label>State</Field.Label>

					<Input />
				</Field.Root>
			</HStack>
			<HStack>
				<Field.Root>
					<Field.Label>City</Field.Label>

					<Input />
				</Field.Root>
				<Field.Root>
					<Field.Label>Phone Number</Field.Label>

					<Input type="tel" />
				</Field.Root>
			</HStack>
		</VStack>
	)
}

export default SignupStepFour
