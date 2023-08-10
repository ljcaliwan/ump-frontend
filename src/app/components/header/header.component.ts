import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ToesterType } from 'src/app/enum/toaster-type.enum';
import { ToesterMessage } from 'src/app/enum/toester-message.enum';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    titleSubject = new BehaviorSubject<string>("Users");
    titleAction$ = this.titleSubject.asObservable();
    loggedInUsername: string = '';
    isAdmin: boolean = false;

    constructor(private router: Router, private toaster: ToastrService, private authService: AuthService,
        private userService: UserService, private roleService: RoleService) {
            this.userService.getLoggedInUsername().subscribe((value) => {
                this.loggedInUsername = value;
            })
        }

    ngOnInit(): void {
        this.loggedInUsername = this.authService.getUserFromLocalStorage().username;
        this.isAdmin = this.roleService.isAdmin;
    }

    onTitleClick(title: string) {
        this.titleSubject.next(title);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.toaster.success(ToesterMessage.SUCCESS_LOGOUT_MSG, ToesterType.SUCCESS)
    }
}
