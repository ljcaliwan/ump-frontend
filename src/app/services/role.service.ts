import { Injectable } from '@angular/core';
import { Role } from '../enum/role.enum';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private authService: AuthService) { }

    get isAdmin(): boolean {
        return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
    }

    get isManager(): boolean {
        return this.isAdmin || this.getUserRole() === Role.MANAGER;
    }

    get isAdminOrManager(): boolean {
        return this.isAdmin ||  this.isManager;
    }

    private getUserRole(): string {
        return this.authService.getUserFromLocalStorage().role;
    }
}
