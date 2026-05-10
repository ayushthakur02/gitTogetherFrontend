import { Field, TagsInput, Textarea, VStack } from "@chakra-ui/react"

const SignupStepFive = () => {
	return (
		<VStack align="stretch" gap={4}>
			<Field.Root>
				<Field.Label>Bio</Field.Label>

				<Textarea placeholder="Tell us about yourself..." />
			</Field.Root>

			<Field.Root>
				<Field.Label>Skills</Field.Label>

				<TagsInput.Root>
					<TagsInput.HiddenInput />

					<TagsInput.Control>
						<TagsInput.Input placeholder="React, Node, Java..." />
					</TagsInput.Control>
				</TagsInput.Root>
			</Field.Root>
		</VStack>
	)
}

export default SignupStepFive
