export interface User {
	_id: string
	firstName: string
	lastName: string
	emailId: string
	userName: string
	age: number
	gender: string
	country: string
	state: string
	city: string
	bio: string
	profilePic: string
	morePhotos: string[]
	skills: string[]
	phoneNumber: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface UserFeed {
	_id: string
	firstName: string
	lastName: string
	userName: string
	age: number
	gender: string
	country: string
	state: string
	city: string
	bio: string
	profilePic: string
	morePhotos: string[]
	skills: string[]
}

export interface FeedResponse {
	message: string
	total: number
	pageTotal: number
	data: UserFeed[]
	limit: number
	page: number
}

export interface UserDetailResponse {
	_id: string
	firstName: string
	lastName: string
	userName: string
	age: number
	gender: string
	country: string
	state: string
	city: string
	bio: string
	profilePic: string
	morePhotos: string[]
	skills: string[]
}

export interface UserRequest {
	requestID: string
	initiatorID: string
	recipientID: string
	firstName: string
	lastName: string
	age: number
	gender: string
	country: string
	state: string
	city: string
	profilePic: string
	skills: string[]
	createdAt: string
}

export interface UserRequestsListResponse {
	message: string
	total: number
	data: UserRequest[]
}

export interface UserMatch {
	_id: string
	firstName: string
	lastName: string
	userName?: string
	age: number
	gender: string
	country: string
	state: string
	city: string
	profilePic: string
	skills: string[]
}

export interface UserMatchesResponse {
	message: string
	total: number
	pageTotal: number
	data: UserMatch[]
	limit: number
	page: number
}

export interface UserFeedPayload {
	page: number
	limit: number
}

export interface UserRequestsPayload {
	page: number
	limit: number
}
