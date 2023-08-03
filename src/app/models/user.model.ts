export interface User {
	id: number,
	userId: string;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string;
	phone: string;
	profileImageUrl: string;
	loginDateDisplay: Date;
	joinDate: Date;
	role: string;
	authorities: [];
	isActive: boolean;
	isNotLocked: boolean;
}