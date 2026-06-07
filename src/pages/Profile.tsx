import toaster from "@/components/ui/toaster"
import { useCurrentUser } from "@/hooks/useAuth"
import {
	useChangePassword,
	useDeleteProfile,
	useEditProfile,
} from "@/hooks/useProfile"
import {
	changePasswordSchema,
	editProfileSchema,
	type ChangePasswordFormData,
	type EditProfileFormData,
} from "@/schemas/profileSchema"
import {
	Box,
	Button,
	CloseButton,
	Dialog,
	Field,
	FileUpload,
	Flex,
	Float,
	HStack,
	Icon,
	Image,
	Input,
	Portal,
	Separator,
	Skeleton,
	SkeletonText,
	TagsInput,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { IoCheckmark, IoClose } from "react-icons/io5"
import { LuFileImage } from "react-icons/lu"
import { uploadToCloudinary } from "@/api/upload"
import FeedCard from "@/components/ui/FeedCard"

const PasswordRule = ({
	passed,
	label,
}: {
	passed: boolean
	label: string
}) => (
	<HStack gap={1.5}>
		<Icon
			as={passed ? IoCheckmark : IoClose}
			color={passed ? "status.success" : "text.disabled"}
			boxSize={3.5}
		/>
		<Text fontSize="xs" color={passed ? "status.success" : "text.disabled"}>
			{label}
		</Text>
	</HStack>
)

const Profile = () => {
	const navigate = useNavigate()
	const { data: user, isLoading } = useCurrentUser()
	const editProfileMutation = useEditProfile()
	const changePasswordMutation = useChangePassword()
	const deleteProfileMutation = useDeleteProfile()

	const [existingProfilePic, setExistingProfilePic] = useState<string | null>(
		null,
	)
	const [newProfilePicFile, setNewProfilePicFile] = useState<File | null>(null)
	const [existingMorePhotos, setExistingMorePhotos] = useState<string[]>([])
	const [newMorePhotoFiles, setNewMorePhotoFiles] = useState<File[]>([])
	const [newMorePhotoUrls, setNewMorePhotoUrls] = useState<string[]>([])

	const [isPasswordEnabled, setIsPasswordEnabled] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<EditProfileFormData>({
		resolver: zodResolver(editProfileSchema),
	})

	const {
		register: pwRegister,
		handleSubmit: pwHandleSubmit,
		control: pwControl,
		reset: pwReset,
		formState: { errors: pwErrors },
	} = useForm<ChangePasswordFormData>({
		resolver: zodResolver(changePasswordSchema),
	})

	const newPassword = useWatch({
		control: pwControl,
		name: "newPassword",
		defaultValue: "",
	})

	const watchedAge = useWatch({ control, name: "age" })
	const watchedBio = useWatch({ control, name: "bio" })
	const watchedSkills = useWatch({ control, name: "skills" })

	const initialized = useRef(false)
	useEffect(() => {
		if (user && !initialized.current) {
			initialized.current = true
			reset({
				age: user.age,
				bio: user.bio || "",
				skills: user.skills || [],
			})
			setExistingProfilePic(user.profilePic || null)
			setExistingMorePhotos(user.morePhotos || [])
		}
	}, [user, reset])

	const totalMorePhotos = existingMorePhotos.length + newMorePhotoFiles.length

	const onProfileSubmit = async (data: EditProfileFormData) => {
		const payload: Parameters<typeof editProfileMutation.mutate>[0] = {}

		if (data.age !== user?.age) payload.age = data.age

		const originalBio = user?.bio || ""
		if ((data.bio || "") !== originalBio) payload.bio = data.bio

		const originalSkills = user?.skills || []
		const skillsChanged =
			data.skills?.length !== originalSkills.length ||
			data.skills?.some((s, i) => s !== originalSkills[i])
		if (skillsChanged) payload.skills = data.skills

		const profilePicChanged =
			newProfilePicFile !== null ||
			existingProfilePic !== (user?.profilePic || null)
		if (profilePicChanged) {
			if (newProfilePicFile) {
				payload.profilePic = (await uploadToCloudinary(
					newProfilePicFile,
				)) as string
			} else {
				payload.profilePic = existingProfilePic ?? undefined
			}
		}

		const originalMorePhotos = user?.morePhotos || []
		const morePhotosChanged =
			newMorePhotoFiles.length > 0 ||
			existingMorePhotos.length !== originalMorePhotos.length ||
			existingMorePhotos.some((p, i) => p !== originalMorePhotos[i])
		if (morePhotosChanged) {
			const newUrls =
				newMorePhotoFiles.length > 0
					? ((await uploadToCloudinary(newMorePhotoFiles)) as string[])
					: []
			payload.morePhotos = [...existingMorePhotos, ...newUrls]
		}

		if (Object.keys(payload).length === 0) {
			toaster.create({
				title: "No changes to save",
				type: "info",
				duration: 2000,
			})
			return
		}

		editProfileMutation.mutate(payload)
	}

	const onPasswordSubmit = (data: ChangePasswordFormData) => {
		changePasswordMutation.mutate(data, {
			onSuccess: () => {
				setIsPasswordEnabled(false)
				pwReset()
			},
		})
	}

	const handleDeleteAccount = () => {
		if (!user?._id) return
		deleteProfileMutation.mutate(user._id, {
			onSuccess: async () => {
				localStorage.removeItem("isLoggedIn")
				await navigate({ to: "/login" })
				toaster.create({
					title: "Account deleted",
					description: "Your account has been permanently deleted.",
					type: "success",
					duration: 3000,
				})
			},
		})
	}

	const passwordRules = [
		{ label: "At least 8 characters", passed: (newPassword?.length ?? 0) >= 8 },
		{
			label: "At least 1 uppercase letter",
			passed: /[A-Z]/.test(newPassword ?? ""),
		},
		{
			label: "At least 1 lowercase letter",
			passed: /[a-z]/.test(newPassword ?? ""),
		},
		{ label: "At least 1 number", passed: /[0-9]/.test(newPassword ?? "") },
		{
			label: "At least 1 special character (!@#$%^&*)",
			passed: /[!@#$%^&*]/.test(newPassword ?? ""),
		},
	]

	if (isLoading) {
		return (
			<Box p={{ base: 4, md: 8 }} height="100%" overflowY="auto">
				<VStack align="stretch" gap={6}>
					<SkeletonText noOfLines={2} />
					<Skeleton height="180px" />
					<SkeletonText noOfLines={8} />
				</VStack>
			</Box>
		)
	}

	return (
		<Box p={{ base: 4, md: 8 }} height="100%" overflowY="auto">
			<VStack align="stretch" gap={8}>
				<Box>
					<Text fontSize="3xl" fontWeight="bold" color="text.primary">
						My Profile
					</Text>
					<Text color="text.secondary" mt={1}>
						Manage your profile information and account settings.
					</Text>
				</Box>

				<Separator borderColor="border.default" />

				<Flex align="start" gap={10} direction={{ base: "column", lg: "row" }}>
					<VStack align="stretch" gap={5} flex={1}>
						<Text fontSize="lg" fontWeight="semibold" color="text.primary">
							Profile Information
						</Text>

						<Field.Root>
							<Field.Label>Profile Picture</Field.Label>
							<VStack align="start" gap={3}>
								{newProfilePicFile ? (
									<Box position="relative" display="inline-block">
										<Image
											src={URL.createObjectURL(newProfilePicFile)}
											alt="New profile picture"
											boxSize="20"
											borderRadius="lg"
											objectFit="cover"
											border="2px solid"
											borderColor="brand.secondary"
										/>
										<Float placement="top-end">
											<CloseButton
												boxSize="5"
												layerStyle="fill.solid"
												borderRadius="full"
												size="xs"
												onClick={(e) => {
													e.stopPropagation()
													setNewProfilePicFile(null)
												}}
											/>
										</Float>
									</Box>
								) : existingProfilePic ? (
									<Box position="relative" display="inline-block">
										<Image
											src={existingProfilePic}
											alt="Profile picture"
											boxSize="20"
											borderRadius="lg"
											objectFit="cover"
											border="2px solid"
											borderColor="border.default"
										/>
										<Float placement="top-end">
											<CloseButton
												boxSize="5"
												layerStyle="fill.solid"
												borderRadius="full"
												size="xs"
												onClick={(e) => {
													e.stopPropagation()
													setExistingProfilePic(null)
												}}
											/>
										</Float>
									</Box>
								) : null}
								<FileUpload.Root
									accept="image/*"
									maxFiles={1}
									onFileAccept={(details) =>
										setNewProfilePicFile(details.files[0])
									}>
									<FileUpload.HiddenInput />
									<FileUpload.Trigger asChild>
										<Button variant="outline" size="sm">
											<LuFileImage />
											{existingProfilePic || newProfilePicFile
												? "Change profile picture"
												: "Upload profile picture"}
										</Button>
									</FileUpload.Trigger>
								</FileUpload.Root>
							</VStack>
						</Field.Root>

						<Field.Root>
							<Field.Label>
								More Photos{" "}
								<Text as="span" fontSize="xs" color="text.secondary">
									({totalMorePhotos}/5)
								</Text>
							</Field.Label>
							<VStack align="start" gap={3}>
								{(existingMorePhotos.length > 0 ||
									newMorePhotoUrls.length > 0) && (
									<HStack gap={3} flexWrap="wrap">
										{existingMorePhotos.map((url, i) => (
											<Box key={`existing-${i}`} position="relative">
												<Image
													src={url}
													alt={`Photo ${i + 1}`}
													boxSize="20"
													borderRadius="lg"
													objectFit="cover"
													border="1px solid"
													borderColor="border.default"
												/>
												<Float placement="top-end">
													<CloseButton
														boxSize="5"
														layerStyle="fill.solid"
														borderRadius="full"
														size="xs"
														onClick={(e) => {
															e.stopPropagation()
															setExistingMorePhotos((prev) =>
																prev.filter((_, idx) => idx !== i),
															)
														}}
													/>
												</Float>
											</Box>
										))}
										{newMorePhotoUrls.map((url, i) => (
											<Box key={`new-${i}`} position="relative">
												<Image
													src={url}
													alt={`New photo ${i + 1}`}
													boxSize="20"
													borderRadius="lg"
													objectFit="cover"
													border="2px solid"
													borderColor="brand.secondary"
												/>
												<Float placement="top-end">
													<CloseButton
														boxSize="5"
														layerStyle="fill.solid"
														borderRadius="full"
														size="xs"
														onClick={(e) => {
															e.stopPropagation()
															URL.revokeObjectURL(url)
															setNewMorePhotoUrls((prev) =>
																prev.filter((_, idx) => idx !== i),
															)
															setNewMorePhotoFiles((prev) =>
																prev.filter((_, idx) => idx !== i),
															)
														}}
													/>
												</Float>
											</Box>
										))}
									</HStack>
								)}
								{totalMorePhotos < 5 ? (
									<FileUpload.Root
										accept="image/*"
										maxFiles={5 - existingMorePhotos.length}
										onFileAccept={(details) => {
											setNewMorePhotoFiles(details.files)
											setNewMorePhotoUrls(
												details.files.map((f) => URL.createObjectURL(f)),
											)
										}}>
										<FileUpload.HiddenInput />
										<FileUpload.Trigger asChild>
											<Button variant="outline" size="sm">
												<LuFileImage />
												Add more photos
											</Button>
										</FileUpload.Trigger>
									</FileUpload.Root>
								) : (
									<Text fontSize="xs" color="text.secondary">
										Maximum of 5 photos reached.
									</Text>
								)}
							</VStack>
						</Field.Root>

						<Flex direction={{ base: "column", md: "row" }} gap={4} width="100%">
							<Field.Root flex={1}>
								<Field.Label>First Name</Field.Label>
								<Input
									value={user?.firstName ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
							<Field.Root flex={1}>
								<Field.Label>Last Name</Field.Label>
								<Input
									value={user?.lastName ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
						</Flex>

						<Flex direction={{ base: "column", md: "row" }} gap={4} width="100%">
							<Field.Root flex={1}>
								<Field.Label>Email</Field.Label>
								<Input
									value={user?.emailId ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
							<Field.Root flex={1}>
								<Field.Label>Username</Field.Label>
								<Input
									value={user?.userName ? `@${user.userName}` : ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
						</Flex>

						<Field.Root>
							<Field.Label>Gender</Field.Label>
							<Input
								value={user?.gender ?? ""}
								readOnly
								disabled
								bg="bg.tertiary"
								borderColor="border.default"
								color="text.disabled"
								textTransform="capitalize"
							/>
						</Field.Root>

						<Field.Root invalid={!!errors.age}>
							<Field.Label>Age</Field.Label>
							<Input
								type="number"
								bg="bg.tertiary"
								borderColor="border.default"
								color="text.primary"
								_focusVisible={{
									borderColor: "brand.secondary",
									boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
								}}
								{...register("age", { valueAsNumber: true })}
							/>
							<Field.ErrorText>
								<Field.ErrorIcon />
								{errors.age?.message}
							</Field.ErrorText>
						</Field.Root>

						<Flex direction={{ base: "column", md: "row" }} gap={4} width="100%">
							<Field.Root flex={1}>
								<Field.Label>Country</Field.Label>
								<Input
									value={user?.country ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
							<Field.Root flex={1}>
								<Field.Label>State</Field.Label>
								<Input
									value={user?.state ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
						</Flex>

						<Flex direction={{ base: "column", md: "row" }} gap={4} width="100%">
							<Field.Root flex={1}>
								<Field.Label>City</Field.Label>
								<Input
									value={user?.city ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
							<Field.Root flex={1}>
								<Field.Label>Phone Number</Field.Label>
								<Input
									value={user?.phoneNumber ?? ""}
									readOnly
									disabled
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.disabled"
								/>
							</Field.Root>
						</Flex>

						<Field.Root invalid={!!errors.bio}>
							<Field.Label>Bio</Field.Label>
							<Textarea
								bg="bg.tertiary"
								borderColor="border.default"
								color="text.primary"
								_focusVisible={{
									borderColor: "brand.secondary",
									boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
								}}
								placeholder="Tell us about yourself..."
								{...register("bio")}
							/>
							<Field.ErrorText>
								<Field.ErrorIcon />
								{errors.bio?.message}
							</Field.ErrorText>
						</Field.Root>

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

						<Button
							alignSelf="flex-end"
							bg="button.primaryBg"
							color="button.primaryText"
							_hover={{ bg: "button.primaryHover" }}
							loading={editProfileMutation.isPending}
							disabled={editProfileMutation.isPending}
							onClick={handleSubmit(onProfileSubmit)}>
							Save Changes
						</Button>
					</VStack>

					<Box position="sticky" top={0} flexShrink={0} display={{ base: "none", lg: "block" }}>
						<Text
							fontSize="sm"
							fontWeight="semibold"
							color="text.secondary"
							mb={3}>
							Preview
						</Text>
						<FeedCard
							preview
							user={{
								_id: user?._id ?? "",
								firstName: user?.firstName ?? "",
								lastName: user?.lastName ?? "",
								userName: user?.userName ?? "",
								age: watchedAge ?? user?.age ?? 0,
								gender: user?.gender ?? "",
								bio: watchedBio ?? "",
								skills: watchedSkills ?? [],
								profilePic: newProfilePicFile
									? URL.createObjectURL(newProfilePicFile)
									: (existingProfilePic ?? ""),
								morePhotos: [...existingMorePhotos, ...newMorePhotoUrls],
								city: user?.city ?? "",
								state: user?.state ?? "",
								country: user?.country ?? "",
							}}
							onSwipe={() => {}}
							setIsDrawerOpen={() => {}}
						/>
					</Box>
				</Flex>

				<Separator borderColor="border.default" />

				<VStack align="stretch" gap={5}>
					<HStack justify="space-between" align="center">
						<Box>
							<Text fontSize="lg" fontWeight="semibold" color="text.primary">
								Security
							</Text>
							<Text fontSize="sm" color="text.secondary" mt={0.5}>
								Manage your account password.
							</Text>
						</Box>
						<Button
							variant="outline"
							borderColor="border.default"
							color="text.primary"
							size="sm"
							_hover={{ bg: "bg.tertiary" }}
							onClick={() => {
								setIsPasswordEnabled((prev) => !prev)
								if (isPasswordEnabled) pwReset()
							}}>
							{isPasswordEnabled ? "Cancel" : "Change Password"}
						</Button>
					</HStack>

					{isPasswordEnabled && (
						<VStack align="stretch" gap={5}>
							<Field.Root invalid={!!pwErrors.oldPassword}>
								<Field.Label>Old Password</Field.Label>
								<Input
									type="password"
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.primary"
									_focusVisible={{
										borderColor: "brand.secondary",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
									}}
									{...pwRegister("oldPassword")}
								/>
								<Field.ErrorText>
									<Field.ErrorIcon />
									{pwErrors.oldPassword?.message}
								</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!pwErrors.newPassword}>
								<Field.Label>New Password</Field.Label>
								<Input
									type="password"
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.primary"
									_focusVisible={{
										borderColor: "brand.secondary",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
									}}
									{...pwRegister("newPassword")}
								/>
								<Field.ErrorText>
									<Field.ErrorIcon />
									{pwErrors.newPassword?.message}
								</Field.ErrorText>
								<Box
									mt={2}
									p={3}
									bg="bg.tertiary"
									borderRadius="md"
									border="1px solid"
									borderColor="border.light">
									<Text
										fontSize="xs"
										fontWeight="semibold"
										color="text.secondary"
										mb={2}>
										Password requirements:
									</Text>
									<VStack align="start" gap={1}>
										{passwordRules.map((rule) => (
											<PasswordRule
												key={rule.label}
												passed={rule.passed}
												label={rule.label}
											/>
										))}
									</VStack>
								</Box>
							</Field.Root>

							<Field.Root invalid={!!pwErrors.confirmNewPassword}>
								<Field.Label>Confirm New Password</Field.Label>
								<Input
									type="password"
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.primary"
									_focusVisible={{
										borderColor: "brand.secondary",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
									}}
									{...pwRegister("confirmNewPassword")}
								/>
								<Field.ErrorText>
									<Field.ErrorIcon />
									{pwErrors.confirmNewPassword?.message}
								</Field.ErrorText>
							</Field.Root>

							<Button
								alignSelf="flex-end"
								bg="button.primaryBg"
								color="button.primaryText"
								_hover={{ bg: "button.primaryHover" }}
								loading={changePasswordMutation.isPending}
								disabled={changePasswordMutation.isPending}
								onClick={pwHandleSubmit(onPasswordSubmit)}>
								Save Password
							</Button>
						</VStack>
					)}
				</VStack>

				<Separator borderColor="border.default" />

				<Box
					border="1px solid"
					borderColor="status.error"
					borderRadius="xl"
					p={5}
					mb={4}>
					<VStack align="stretch" gap={3}>
						<Box>
							<Text fontSize="lg" fontWeight="semibold" color="status.error">
								Danger Zone
							</Text>
							<Text fontSize="sm" color="text.secondary" mt={0.5}>
								Once you delete your account, there is no going back. Please be
								certain.
							</Text>
						</Box>
						<Button
							alignSelf="flex-start"
							variant="outline"
							colorPalette="red"
							size="sm"
							onClick={() => setIsDeleteDialogOpen(true)}>
							Delete Account
						</Button>
					</VStack>
				</Box>
			</VStack>

			<Dialog.Root
				role="alertdialog"
				open={isDeleteDialogOpen}
				onOpenChange={(e) => setIsDeleteDialogOpen(e.open)}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title color="text.primary">Delete Account</Dialog.Title>
								<Dialog.CloseTrigger asChild>
									<CloseButton size="sm" />
								</Dialog.CloseTrigger>
							</Dialog.Header>
							<Dialog.Body>
								<Text color="text.secondary">
									Are you sure you want to permanently delete your account? This
									action cannot be undone. All your data, matches, and
									connections will be permanently removed.
								</Text>
							</Dialog.Body>
							<Dialog.Footer>
								<HStack gap={3}>
									<Button
										variant="outline"
										borderColor="border.default"
										color="text.primary"
										_hover={{ bg: "bg.tertiary" }}
										onClick={() => setIsDeleteDialogOpen(false)}>
										Cancel
									</Button>
									<Button
										colorPalette="red"
										loading={deleteProfileMutation.isPending}
										disabled={deleteProfileMutation.isPending}
										onClick={handleDeleteAccount}>
										Delete Account
									</Button>
								</HStack>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</Box>
	)
}

export default Profile
