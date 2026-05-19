import axiosInstance from "@/lib/axios"
import axios from "axios"

interface UploadSignature {
	timestamp: number
	signature: string
	folder: string
	api_key: string
	cloud_name: string
}

const getSignature = async (endpoint: string): Promise<UploadSignature> => {
	const response = await axiosInstance.get(endpoint)
	return response.data
}

const applyTransformations = (url: string): string =>
	url.replace("/upload/", "/upload/q_auto,f_auto/")

const uploadWithSignature = async (
	file: File,
	sig: UploadSignature,
): Promise<string> => {
	const form = new FormData()
	form.append("file", file)
	form.append("api_key", sig.api_key)
	form.append("timestamp", String(sig.timestamp))
	form.append("signature", sig.signature)
	form.append("folder", sig.folder)

	const response = await axios.post(
		`https://api.cloudinary.com/v1_1/${sig.cloud_name}/image/upload`,
		form,
	)

	return applyTransformations(response.data.secure_url)
}

export const uploadToCloudinary = async (files: File | File[]): Promise<string | string[]> => {
	const sig = await getSignature("/upload/signature")
	if (Array.isArray(files)) {
		return Promise.all(files.map((f) => uploadWithSignature(f, sig)))
	}
	return uploadWithSignature(files, sig)
}

export const uploadToCloudinaryAsGuest = async (files: File | File[]): Promise<string | string[]> => {
	const sig = await getSignature("/upload/signature/signup")
	if (Array.isArray(files)) {
		return Promise.all(files.map((f) => uploadWithSignature(f, sig)))
	}
	return uploadWithSignature(files, sig)
}
