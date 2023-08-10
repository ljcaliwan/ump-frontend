export interface IUserForm {
    userId?: string;
	firstName: string;
	lastName: string;
	username: string;
	password?: string;
	email: string;
	phone: string;
	profileImageUrl: string;
	lastLoginDateDisplay?: Date;
	joinDate?: Date;
	role?: string;
	authorities?: [];
	active?: boolean;
	notLocked?: boolean;
}