import axiosInstance from "@/lib/axios"

export const sendRequest = async (status: string, recipientID: string) => {
    const response = await axiosInstance.post(`/request/send/${status}/${recipientID}`, {})
    return response.data
}
