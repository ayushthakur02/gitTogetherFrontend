import {
	Button,
	Field,
	FileUpload,
	HStack,
	Input,
	NativeSelect,
	Textarea,
	VStack,
	type FileUploadFileRejectDetails,
} from "@chakra-ui/react"

import { Controller } from "react-hook-form"

import { LuFileImage } from "react-icons/lu"

import { useState } from "react"

import FileUploadList from "../FileUploadList"

import { ERROR_MESSAGES, ERRORS } from "@/constants/signupConstants"

import type { SignupStepProps } from "@/interfaces/auth.interfaces"

const SignupStepTwo = ({
	register,
	errors,
	setValue,
	control,
}: SignupStepProps) => {
	const [multipleImageError, setMultipleImageError] = useState("")

	return (
		<VStack align="stretch" gap={4} width="100%">
			{/* PROFILE PICTURE */}
			<Field.Root invalid={!!errors.profilePic}>
				<Field.Label>Profile Picture</Field.Label>

				<FileUpload.Root
					accept="image/*"
					maxFiles={1}
					onFileAccept={(details) => {
						setValue!("profilePic", details.files[0], {
							shouldValidate: true,
						})
					}}>
					<FileUpload.HiddenInput />

					<FileUpload.Trigger asChild>
						<Button variant="outline" size="sm">
							<LuFileImage />
							Upload profile picture
						</Button>
					</FileUpload.Trigger>

					<FileUploadList />
				</FileUpload.Root>

				<Field.ErrorText>
					<Field.ErrorIcon />

					{String(errors.profilePic?.message) || ""}
				</Field.ErrorText>
			</Field.Root>

			{/* MORE PHOTOS */}
			<Field.Root invalid={!!multipleImageError}>
				<Field.Label>More Photos</Field.Label>

				<FileUpload.Root
					accept="image/*"
					maxFiles={5}
					onFileReject={(details: FileUploadFileRejectDetails) => {
						setMultipleImageError(details.files[0].errors[0])
					}}
					onFileAccept={(details) => {
						setMultipleImageError("")

						setValue!("morePhotos", details.files, {
							shouldValidate: true,
						})
					}}>
					<FileUpload.HiddenInput />

					<FileUpload.Trigger asChild>
						<Button variant="outline" size="sm">
							<LuFileImage />
							Upload more photos
						</Button>
					</FileUpload.Trigger>

					<FileUploadList />
				</FileUpload.Root>

				<Field.ErrorText>
					<Field.ErrorIcon />

					{multipleImageError === ERRORS.TOO_MANY_FILES
						? ERROR_MESSAGES.TOO_MANY_FILES
						: multipleImageError === ERRORS.FILE_EXISTS
							? ERROR_MESSAGES.FILE_EXISTS
							: multipleImageError}
				</Field.ErrorText>
			</Field.Root>

			{/* BIO */}
			<Field.Root invalid={!!errors.bio}>
				<Field.Label>Bio</Field.Label>

				<Textarea
					placeholder="Tell us about yourself..."
					{...register("bio")}
				/>

				<Field.ErrorText>
					<Field.ErrorIcon />

					{errors.bio?.message}
				</Field.ErrorText>
			</Field.Root>

			{/* AGE + GENDER */}
			<HStack width="100%">
				<Field.Root required invalid={!!errors.age}>
					<Field.Label>
						Age
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						type="number"
						{...register("age", {
							valueAsNumber: true,
						})}
					/>

					<Field.ErrorText>
						<Field.ErrorIcon />

						{errors.age?.message}
					</Field.ErrorText>
				</Field.Root>

				<Field.Root required invalid={!!errors.gender}>
					<Field.Label>
						Gender
						<Field.RequiredIndicator />
					</Field.Label>

					<Controller
						control={control}
						name="gender"
						render={({ field }) => (
							<NativeSelect.Root>
								<NativeSelect.Field
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}>
									<option value="">Select Gender</option>

									<option value="male">Male</option>

									<option value="female">Female</option>

									<option value="others">Others</option>
								</NativeSelect.Field>
							</NativeSelect.Root>
						)}
					/>

					<Field.ErrorText>
						<Field.ErrorIcon />

						{errors.gender?.message}
					</Field.ErrorText>
				</Field.Root>
			</HStack>
		</VStack>
	)
}

export default SignupStepTwo
