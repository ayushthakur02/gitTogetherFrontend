export interface sendRequestPayload {
	status: string
	recipientID: string
}

export interface sendRequestResponse {
	message: string
	data: sendRequestResponseObject
}

interface sendRequestResponseObject {
	initiatorID: string
	recipientID: string
	status: string
	_id: string
	createdAt: Date
	updatedAt: Date
	__v: number
}
