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
