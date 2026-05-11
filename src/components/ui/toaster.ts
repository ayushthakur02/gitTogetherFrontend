"use client"

import { createToaster } from "@chakra-ui/react"

const toaster = createToaster({
	placement: "top-end",
	pauseOnPageIdle: true,
})

export default toaster
