export class User {
	public userId: string;
	public firstName: string;
	public lastName: string;
	public username: string;
	public email: string;
	public phone: string;
	public profileImageUrl: string;
	public lastLoginDateDisplay?: Date;
	public joinDate?: Date;
	public role: string;
	public authorities?: [];
	public active: boolean;
	public notLocked: boolean;

	constructor() {
		this.userId = '';
		this.firstName = '';
		this.lastName = '';
		this.username = '';
		this.email = '';
		this.phone = '';
		this.lastLoginDateDisplay = undefined;
		this.joinDate = undefined;
		this.profileImageUrl = '';
		this.active = false;
		this.notLocked = false;
		this.role = '';
		this.authorities = [];
	}
 }