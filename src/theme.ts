import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
	theme: {
		semanticTokens: {
			colors: {
				bg: {
					primary: { value: { _light: "#fcf8f9", _dark: "#131314" } },
					secondary: { value: { _light: "#f6f3f3", _dark: "#1c1b1c" } },
					tertiary: { value: { _light: "#f0eded", _dark: "#201f20" } },
				},
				text: {
					primary: { value: { _light: "#1c1b1c", _dark: "#e5e2e2" } },
					secondary: { value: { _light: "#44474b", _dark: "#c4c7ca" } },
					disabled: { value: { _light: "#75777b", _dark: "#8e9194" } },
				},
				border: {
					default: { value: { _light: "#d0d7de", _dark: "#30363d" } },
					light: { value: { _light: "#e5e2e2", _dark: "#44474a" } },
				},
				neutral: {
					50: { value: { _light: "#ffffff", _dark: "#0e0e0e" } },
					100: { value: { _light: "#f6f3f3", _dark: "#1c1b1c" } },
					200: { value: { _light: "#e5e2e2", _dark: "#2a2a2a" } },
					300: { value: { _light: "#d0d7de", _dark: "#30363d" } },
					400: { value: { _light: "#c5c6cb", _dark: "#44474a" } },
					500: { value: { _light: "#75777b", _dark: "#8e9194" } },
				},
				brand: {
					primary: { value: { _light: "#10151a", _dark: "#ffffff" } },
					secondary: { value: { _light: "#0058bb", _dark: "#a2c9ff" } },
				},
				status: {
					success: { value: "#3fb950" }, // Same for both
					error: { value: { _light: "#ba1a1a", _dark: "#ffb4ab" } },
				},
			},
			shadows: {
				md: {
					value: {
						_light: "0px 4px 12px rgba(0, 0, 0, 0.05)",
						_dark: "0px 4px 12px rgba(0, 0, 0, 0.4)",
					},
				},
			},
		},
		// Migrate your font-family here too
		breakpoints: {
			// your breakpoints if needed
		},
	},
})

export const system = createSystem(defaultConfig, customConfig)
