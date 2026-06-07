import toaster from "@/components/ui/toaster"
import { useLogin } from "@/hooks/useAuth"
import { loginSchema, type LoginFormData } from "@/schemas/loginSchema"
import {
	Badge,
	Box,
	Button,
	Field,
	Flex,
	Heading,
	HStack,
	Icon,
	Input,
	Separator,
	Text,
	VStack,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { FaCode, FaGithub } from "react-icons/fa"

const Login = () => {
	const navigate = useNavigate()
	const loginMutation = useLogin()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data, {
			onSuccess: async () => {
				await navigate({ to: "/feed" })
				toaster.create({ title: "Welcome back!", type: "success", duration: 3000 })
			},
		})
	}

	return (
		<Flex
			width="100%"
			minH="100vh"
			justify="center"
			align={{ base: "flex-start", md: "center" }}
			bg="bg.primary"
			position="relative"
			overflow="hidden"
			p={{ base: 4, md: 6 }}>
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
				height={{ base: "auto", md: "calc(100vh - 48px)" }}
				maxH={{ base: "none", md: "760px" }}
				border="1px solid"
				borderColor="border.default"
				borderRadius="2xl"
				bg="bg.secondary"
				backdropFilter="blur(14px)"
				overflow="hidden"
				direction={{ base: "column", md: "row" }}>
				<Flex
					flex={1}
					direction="column"
					justify="space-between"
					gap={16}
					p={12}
					borderRight="1px solid"
					borderColor="border.default"
					display={{ base: "none", md: "flex" }}>
					<VStack align="start" gap={8}>
						<HStack gap={3}>
							<Icon as={FaCode} color="brand.secondary" />

							<Heading size="md" color="text.primary">
								gitTogether
							</Heading>
						</HStack>

						<VStack align="start" gap={6}>
							<Heading color="text.primary" size="5xl">
								Build your developer network.
							</Heading>
							<Heading color="brand.secondary" fontWeight="semibold" size="5xl">
								Fork your future.
							</Heading>

							<HStack align="start">
								<Text color="text.secondary">
									The social engineering platform where clean code meets
									meaningful connection. Connect with developers who share your
									stack and your vision.
								</Text>
							</HStack>
						</VStack>
					</VStack>

					<Box
						maxW="420px"
						bg="neutral.50"
						border="1px solid"
						borderColor="border.default"
						borderRadius="lg"
						p={5}
						mb={5}
						fontFamily="mono"
						fontSize="sm"
						color="status.success"
						boxShadow="0 0 20px rgba(34,197,94,0.12)">
						<Text>1 git status</Text>
						<Text>2 On branch main</Text>
						<Text>3 Your soulmate is ready to merge.</Text>
						<Text>4 git commit -m "found the one"</Text>
					</Box>
				</Flex>

				<Flex flex={1} direction="column" p={{ base: 6, md: 12 }}>
					<VStack align="stretch" gap={7} maxW="420px" width="100%" mx="auto">
						<Box>
							<Text color="text.secondary">Welcome back, dev.</Text>

							<Heading size="md" color="text.primary" mt={2} lineHeight="1.4">
								Log in to continue your collaborative journey.
							</Heading>
						</Box>

						<Box position="relative" display="inline-flex" alignSelf="stretch">
							<Button
								width="100%"
								size="lg"
								bg="button.githubBg"
								color="button.githubText"
								border="1px solid"
								borderColor="border.default"
								_hover={{
									bg: "bg.tertiary",
								}}
								disabled>
								<FaGithub />
								Continue with GitHub
							</Button>
							<Badge
								position="absolute"
								top="-2"
								right="-2"
								colorPalette="orange"
								variant="solid"
								fontSize="2xs"
								borderRadius="full"
								px={2}>
								Soon
							</Badge>
						</Box>

						<HStack width="100%">
							<Separator flex={1} borderColor="border.default" />

							<Text color="text.secondary" fontSize="sm" whiteSpace="nowrap">
								OR EMAIL
							</Text>

							<Separator flex={1} borderColor="border.default" />
						</HStack>

						<VStack align="stretch" gap={4}>
							<Field.Root invalid={!!errors.userId}>
								<Text mb={2} color="text.secondary" fontSize="sm">
									Username or Email address
								</Text>

								<Input
									size="lg"
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.primary"
									_focusVisible={{
										borderColor: "brand.secondary",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
									}}
									{...register("userId")}
								/>

								<Field.ErrorText>
									<Field.ErrorIcon />
									{errors.userId?.message}
								</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.password}>
								<Flex justify="space-between" align="center" width="100%" mb={2}>
									<Text color="text.secondary" fontSize="sm">
										Password
									</Text>

									<Text color="brand.secondary" fontSize="sm" cursor="pointer">
										Forgot Password?
									</Text>
								</Flex>

								<Input
									type="password"
									size="lg"
									bg="bg.tertiary"
									borderColor="border.default"
									color="text.primary"
									_focusVisible={{
										borderColor: "brand.secondary",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
									}}
									{...register("password")}
								/>

								<Field.ErrorText>
									<Field.ErrorIcon />
									{errors.password?.message}
								</Field.ErrorText>
							</Field.Root>
						</VStack>

						<Button
							size="lg"
							bg="button.primaryBg"
							color="button.primaryText"
							_hover={{
								bg: "button.primaryHover",
							}}
							loading={loginMutation.isPending}
							disabled={loginMutation.isPending}
							onClick={handleSubmit(onSubmit)}>
							Sign In
						</Button>

						<Separator borderColor="border.default" />

						<VStack gap={3}>
							<Text color="text.secondary">New to gitTogether?</Text>
							<Link to="/signup">
								<Button
									variant="outline"
									borderColor="border.default"
									color="text.primary"
									_hover={{
										bg: "bg.tertiary",
									}}>
									Create New Account
								</Button>
							</Link>
						</VStack>
					</VStack>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Login
