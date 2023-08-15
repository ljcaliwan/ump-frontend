import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() users: User[] = [];
    @Input() isAdmin: boolean = false;
    @Input() isAdminOrManager: boolean = false;
    @Output() editUserEvent = new EventEmitter<User>();
    @Output() deleteUserEvent = new EventEmitter<User>();

    constructor(private userService: UserService) {}

    ngOnInit(): void {}

    editUser(user: User) {
        this.editUserEvent.emit(user);
        this.userService.isNewUserState.next(false);
    }

    deleteUser(user: User) {
        this.deleteUserEvent.emit(user);
    }

}
