import SignupStepOne from "@/components/signup/SignupStepOne"
import SignupStepThree from "@/components/signup/SignupStepThree"
import SignupStepTwo from "@/components/signup/SignupStepTwo"

import { useForm, useWatch } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { signupSchema, type SignupFormData } from "@/schemas/signupSchema"

import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	Separator,
	Steps,
	Text,
	VStack,
} from "@chakra-ui/react"

import { useState } from "react"

import { FaCode, FaGithub } from "react-icons/fa"
import toaster from "@/components/ui/toaster"
import { Link, useNavigate } from "@tanstack/react-router"
import { useSignup } from "@/hooks/useAuth"

const Signup = () => {
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		control,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),

		mode: "onTouched",

		reValidateMode: "onChange",

		defaultValues: {
			skills: [],
			morePhotos: [],
		},
	})
	const password = useWatch({
		control,
		name: "password",
	})
	const navigate = useNavigate()
	const signupMutation = useSignup()

	const [step, setStep] = useState(0)

	const onSubmit = async (data: SignupFormData) => {
		const fileToBase64 = (file: File): Promise<string> =>
			new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => resolve(reader.result as string)
				reader.onerror = reject
			})

		let profilePic: string | undefined
		if (data.profilePic instanceof File) {
			profilePic = await fileToBase64(data.profilePic)
		}

		let morePhotos: string[] | undefined
		if (Array.isArray(data.morePhotos) && data.morePhotos.length > 0) {
			morePhotos = await Promise.all(
				(data.morePhotos as File[]).map(fileToBase64),
			)
		}

		signupMutation.mutate(
			{
				firstName: data.firstName,
				lastName: data.lastName,
				emailId: data.emailId,
				userName: data.userName,
				password: data.password,
				age: data.age,
				gender: data.gender,
				country: data.country,
				state: data.state,
				city: data.city,
				bio: data.bio,
				skills: data.skills,
				...(profilePic ? { profilePic } : {}),
				...(morePhotos ? { morePhotos } : {}),
				...(data.phoneNumber ? { phoneNumber: data.phoneNumber } : {}),
			},
			{
				onSuccess: async () => {
					await navigate({ to: "/login" })
					toaster.create({ title: "Account created! Please log in.", type: "success", duration: 3000 })
				},
			},
		)
	}

	const handleNext = async () => {
		let fields: Array<keyof SignupFormData> = []

		if (step === 0) {
			fields = [
				"firstName",
				"lastName",
				"userName",
				"emailId",
				"password",
				"confirmPassword",
			]
		}

		if (step === 1) {
			fields = ["age", "gender"]
		}

		if (step === 2) {
			fields = ["country"]
		}

		const valid = await trigger(fields)

		if (!valid) return

		if (step < 2) {
			setStep(step + 1)
		} else {
			handleSubmit(onSubmit)()
		}
	}

	const steps = [
		{
			title: "Account",

			component: (
				<SignupStepOne
					register={register}
					errors={errors}
					password={password}
				/>
			),
		},

		{
			title: "Profile",

			component: (
				<SignupStepTwo
					register={register}
					errors={errors}
					setValue={setValue}
					control={control}
				/>
			),
		},

		{
			title: "Developer Info",

			component: (
				<SignupStepThree
					register={register}
					errors={errors}
					control={control}
				/>
			),
		},
	]

	return (
		<Flex
			width="100%"
			minH="100vh"
			justify="center"
			align="center"
			bg="bg.primary"
			position="relative"
			overflow="hidden"
			p={6}>
<Box
				position="absolute"
				inset={0}
				backgroundImage="
					radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)
				"
				backgroundSize="24px 24px"
				opacity={0.12}
			/>

<Flex
				position="relative"
				zIndex={1}
				width="100%"
				maxWidth="1200px"
				height="calc(100vh - 48px)"
				maxH="760px"
				border="1px solid"
				borderColor="border.default"
				borderRadius="2xl"
				bg="bg.secondary"
				backdropFilter="blur(14px)"
				overflow="hidden">
<Flex
					width="340px"
					direction="column"
					justify="space-between"
					p={10}
					borderRight="1px solid"
					borderColor="border.default"
					bg="bg.secondary"
					flexShrink={0}>
					<VStack align="stretch" gap={8}>
						<HStack gap={3}>
							<Icon as={FaCode} color="brand.secondary" />

							<Heading size="lg" color="text.primary">
								gitTogether
							</Heading>
						</HStack>
						<Button
							alignSelf={"center"}
							size="lg"
							bg="button.githubBg"
							color="button.githubText"
							border="1px solid"
							borderColor="border.default"
							_hover={{
								bg: "bg.tertiary",
							}}>
							<FaGithub />
							Continue with GitHub
						</Button>
					</VStack>
				</Flex>

<Flex
					flex={1}
					direction="column"
					justify="start"
					paddingTop={2}
					paddingLeft={0}
					overflowY="auto">
					<VStack align="stretch" gap={7} maxW="650px" width="100%" mx="auto">
<Box>
							<Heading size="2xl" color="text.primary" lineHeight="1.4">
								Create Account
							</Heading>

							<Text color="text.secondary" mt={3}>
								Join thousands of developers building their future together.
							</Text>
						</Box>

<Steps.Root step={step} count={3} colorPalette="blue">
							<VStack align="stretch" gap={6}>
								<Steps.List>
									{steps.map((item, index) => (
										<Steps.Item key={index} index={index} flex={1}>
											<Steps.Trigger flexDirection="column" gap={2}>
												<Steps.Indicator />

												<Text
													fontSize="xs"
													color="text.secondary"
													textAlign="center">
													{item.title}
												</Text>
											</Steps.Trigger>

											<Steps.Separator />
										</Steps.Item>
									))}
								</Steps.List>

<Box>{steps[step].component}</Box>

<HStack justify="space-between">
									<Button
										variant="outline"
										borderColor="border.default"
										color="text.primary"
										disabled={step === 0}
										onClick={() => setStep((prev) => Math.max(prev - 1, 0))}>
										Back
									</Button>

									<Button
										bg="button.primaryBg"
										color="button.primaryText"
										_hover={{
											bg: "button.primaryHover",
										}}
										onClick={handleNext}>
										{step === 2 ? "Create Account" : "Next"}
									</Button>
								</HStack>

								<Separator borderColor="border.default" />

<VStack gap={3}>
									<Text color="text.secondary">Already have an account?</Text>
									<Link to={"/login"}>
										<Button
											variant="outline"
											borderColor="border.default"
											color="text.primary"
											_hover={{
												bg: "bg.tertiary",
											}}>
											Log In
										</Button>
									</Link>
								</VStack>
							</VStack>
						</Steps.Root>
					</VStack>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Signup
