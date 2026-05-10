import SignupStepOne from "@/components/signup/SignupStepOne"
import SignupStepThree from "@/components/signup/SignupStepThree"
import SignupStepTwo from "@/components/signup/SignupStepTwo"

import { useForm } from "react-hook-form"

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

const Signup = () => {
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		control,
		formState: { errors, isValid },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),

		mode: "onChange",

		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",

			profilePic: undefined,
			morePhotos: [],

			bio: "",
			age: undefined,
			gender: "",

			country: "",
			state: "",
			city: "",

			skills: [],

			phoneNumber: "",
		},
	})

	const [step, setStep] = useState(0)

	const onSubmit = (data: SignupFormData) => {
		console.log(data)
	}

	const handleNext = async () => {
		let fields: Array<keyof SignupFormData> = []

		if (step === 0) {
			fields = [
				"firstName",
				"lastName",
				"username",
				"email",
				"password",
				"confirmPassword",
			]
		}

		if (step === 1) {
			fields = ["profilePic", "bio", "age", "gender"]
		}

		if (step === 2) {
			fields = ["country", "skills"]
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

			component: <SignupStepOne register={register} errors={errors} />,
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
			{/* BACKGROUND DOTS */}
			<Box
				position="absolute"
				inset={0}
				backgroundImage="
					radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)
				"
				backgroundSize="24px 24px"
				opacity={0.12}
			/>

			{/* MAIN CARD */}
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
				{/* LEFT PANEL */}
				<Flex
					width="340px"
					direction="column"
					justify="center"
					p={10}
					borderRight="1px solid"
					borderColor="border.default"
					bg="bg.secondary"
					flexShrink={0}>
					<VStack align="stretch" gap={8}>
						{/* LOGO */}
						<HStack gap={3}>
							<Icon as={FaCode} color="brand.secondary" />

							<Heading size="lg" color="text.primary">
								gitTogether
							</Heading>
						</HStack>

						{/* GITHUB BUTTON */}
						<Button
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

						{/* SEPARATOR */}
						<HStack width="100%">
							<Separator flex={1} borderColor="border.default" />

							<Text color="text.secondary" fontSize="sm" whiteSpace="nowrap">
								OR
							</Text>

							<Separator flex={1} borderColor="border.default" />
						</HStack>

						<Text color="text.secondary" fontSize="sm" lineHeight="1.7">
							Build meaningful developer connections based on your stack,
							skills, and ambitions.
						</Text>
					</VStack>
				</Flex>

				{/* RIGHT PANEL */}
				<Flex
					flex={1}
					direction="column"
					justify="start"
					paddingTop={2}
					paddingLeft={0}
					overflowY="auto">
					<VStack align="stretch" gap={7} maxW="650px" width="100%" mx="auto">
						{/* HEADER */}
						<Box>
							<Heading size="2xl" color="text.primary" lineHeight="1.4">
								Create Account
							</Heading>

							<Text color="text.secondary" mt={3}>
								Join thousands of developers building their future together.
							</Text>
						</Box>

						{/* STEPS */}
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

								{/* STEP CONTENT */}
								<Box>{steps[step].component}</Box>

								{/* NAVIGATION */}
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
										disabled={!isValid}
										onClick={handleNext}>
										{step === 2 ? "Create Account" : "Next"}
									</Button>
								</HStack>

								<Separator borderColor="border.default" />

								{/* FOOTER */}
								<VStack gap={3}>
									<Text color="text.secondary">Already have an account?</Text>

									<Button
										variant="outline"
										borderColor="border.default"
										color="text.primary"
										_hover={{
											bg: "bg.tertiary",
										}}>
										Log In
									</Button>
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
