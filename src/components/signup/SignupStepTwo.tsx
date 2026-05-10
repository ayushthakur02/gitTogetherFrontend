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

import { LuFileImage } from "react-icons/lu"

import FileUploadList from "../FileUploadList"

import { useState } from "react"

import { ERROR_MESSAGES, ERRORS } from "@/constants/signupConstants"

import type { SignupStepProps } from "@/pages/signup.interfaces"

const SignupStepTwo = ({ formData, setFormData }: SignupStepProps) => {
	const [multipleImageError, setMultipleImageError] = useState("")

	return (
		<VStack align="stretch" gap={4}>
			{/* PROFILE PIC */}
			<Field.Root required>
				<Field.Label>
					Profile Picture
					<Field.RequiredIndicator />
				</Field.Label>

				<FileUpload.Root
					accept="image/*"
					maxFiles={1}
					onFileAccept={(details) => {
						setFormData({
							...formData,
							profilePic: details.files[0],
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
			</Field.Root>

			{/* MORE PHOTOS */}
			<Field.Root invalid={!!multipleImageError}>
				<Field.Label>More Photos</Field.Label>

				<FileUpload.Root
					accept="image/*"
					maxFiles={5}
					onFileReject={(details: FileUploadFileRejectDetails) =>
						setMultipleImageError(details.files[0].errors[0])
					}
					onFileAccept={(details) => {
						setMultipleImageError("")

						setFormData({
							...formData,
							morePhotos: details.files,
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
						: ERROR_MESSAGES.FILE_EXISTS}
				</Field.ErrorText>
			</Field.Root>

			{/* BIO */}
			<Field.Root>
				<Field.Label>Bio</Field.Label>

				<Textarea
					placeholder="Tell us about yourself..."
					value={formData.bio}
					onChange={(e) =>
						setFormData({
							...formData,
							bio: e.target.value,
						})
					}
				/>
			</Field.Root>

			{/* AGE + GENDER */}
			<HStack>
				<Field.Root required>
					<Field.Label>
						Age
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						min={13}
						type="number"
						value={formData.age}
						onChange={(e) =>
							setFormData({
								...formData,
								age: Number(e.target.value),
							})
						}
					/>
				</Field.Root>

				<Field.Root required>
					<Field.Label>
						Gender
						<Field.RequiredIndicator />
					</Field.Label>

					<NativeSelect.Root>
						<NativeSelect.Field
							value={formData.gender}
							onChange={(e) =>
								setFormData({
									...formData,
									gender: e.target.value,
								})
							}>
							<option value="">Select Gender</option>

							<option value="male">Male</option>

							<option value="female">Female</option>

							<option value="other">Other</option>
						</NativeSelect.Field>
					</NativeSelect.Root>
				</Field.Root>
			</HStack>
		</VStack>
	)
}

export default SignupStepTwo
