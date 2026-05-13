import type { SignupStepProps } from "@/interfaces/signup.interfaces"

import { Field, HStack, Input, TagsInput, VStack } from "@chakra-ui/react"
import { Controller } from "react-hook-form"

const SignupStepThree = ({ register, errors, control }: SignupStepProps) => {
	return (
		<VStack align="stretch" gap={4} width="100%">
			{/* COUNTRY + STATE */}
			<HStack width="100%">
				<Field.Root invalid={!!errors.country}>
					<Field.Label>Country</Field.Label>

					<Input placeholder="India" {...register("country")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{String(errors.country?.message || "")}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root invalid={!!errors.state}>
					<Field.Label>State</Field.Label>

					<Input placeholder="Punjab" {...register("state")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{String(errors.state?.message || "")}
					</Field.ErrorText>
				</Field.Root>
			</HStack>

			{/* CITY + PHONE */}
			<HStack width="100%">
				<Field.Root invalid={!!errors.city}>
					<Field.Label>City</Field.Label>

					<Input placeholder="Chandigarh" {...register("city")} />

					<Field.ErrorText>
						<Field.ErrorIcon />
						{String(errors.city?.message || "")}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root invalid={!!errors.phoneNumber}>
					<Field.Label>Phone Number</Field.Label>

					<Input
						type="tel"
						placeholder="9876543210"
						{...register("phoneNumber")}
					/>

					<Field.ErrorText>
						<Field.ErrorIcon />
						{String(errors.phoneNumber?.message || "")}
					</Field.ErrorText>
				</Field.Root>
			</HStack>

			{/* SKILLS */}
			<Field.Root invalid={!!errors.skills}>
				<Field.Label>Skills</Field.Label>

				<Controller
					control={control}
					name="skills"
					render={({ field }) => (
						<TagsInput.Root
							value={field.value ?? []}
							onValueChange={(details) => field.onChange(details.value)}>
							<TagsInput.Control>
								<TagsInput.Items />
								<TagsInput.Input placeholder="Type a skill and press Enter..." />
							</TagsInput.Control>
							<TagsInput.HiddenInput />
						</TagsInput.Root>
					)}
				/>

				<Field.ErrorText>
					<Field.ErrorIcon />
					{String(errors.skills?.message || "")}
				</Field.ErrorText>
			</Field.Root>
		</VStack>
	)
}

export default SignupStepThree
