import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    titleSubject = new BehaviorSubject<string>("Users");
    titleAction$ = this.titleSubject.asObservable();
    loggedInUsername: string = '';

    constructor(private authService: AuthService,
        private userService: UserService) {
            this.userService.getLoggedInUsername().subscribe((value) => {
                this.loggedInUsername = value;
            })
        }

    ngOnInit(): void {
        this.loggedInUsername = this.authService.getUserFromLocalStorage().username;
    }

    onTitleClick(title: string) {
        this.titleSubject.next(title);
    }
}
