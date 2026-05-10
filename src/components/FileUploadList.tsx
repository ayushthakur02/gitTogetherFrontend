"use client"

import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react"

import { LuX } from "react-icons/lu"

const FileUploadList = () => {
	const fileUpload = useFileUploadContext()

	const files = fileUpload.acceptedFiles

	if (files.length === 0) return null

	return (
		<FileUpload.ItemGroup
			display="flex"
			flexDirection="row"
			gap={4}
			flexWrap="wrap">
			{files.map((file) => (
				<FileUpload.Item
					key={file.name}
					file={file}
					position="relative"
					boxSize="20"
					p="2"
					borderRadius="lg"
					border="1px solid"
					borderColor="border.default">
					<FileUpload.ItemPreviewImage />

					<Float placement="top-end">
						<FileUpload.ItemDeleteTrigger
							boxSize="5"
							layerStyle="fill.solid"
							borderRadius="full">
							<LuX />
						</FileUpload.ItemDeleteTrigger>
					</Float>
				</FileUpload.Item>
			))}
		</FileUpload.ItemGroup>
	)
}

export default FileUploadList
