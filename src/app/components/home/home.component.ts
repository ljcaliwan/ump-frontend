import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enum/role.enum';
import { RoleService } from 'src/app/services/role.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    users: User[] = [];
    subscription: Subscription [] = [];
    refreshing: boolean = false;
    isLoading: boolean = false;
    isAdmin: boolean = false;
    isAdminOrManager: boolean = false;
    
    constructor(private dialog: MatDialog, private toaster: ToastrService, private authService: AuthService, 
        private userService: UserService, private roleService: RoleService) {
        this.subscription.push(userService.userList$.subscribe((users) => {
            this.users = users;
        })) 
    }

    ngOnInit(): void {
        this.userService.getUserListRequest()   
        this.isAdmin = this.roleService.isAdmin;
        this.isAdminOrManager = this.roleService.isAdminOrManager;
    }

    openModal(user: User | null){
        if(user === null){
            this.userService.isNewUserState.next(true);
        }
        const dialogRef = this.dialog.open(ModalDialogComponent, { data: user });    
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.userService.getUserListRequest()   
            }
        });
    }

    deleteModal(user: User) {
        const dialogRef = this.dialog.open(DeleteModalComponent, { data: "user '" + user.firstName + ' ' + user.lastName + "'"})
        dialogRef.afterClosed().subscribe( result => {
            if(result) {
                this.userService.deleteUser(user.username);
            }
        })
    }

    searchUsers(key: string) {
        const results: User[] = [];
        for(const user of this.users) {
            if(user.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.username?.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || user.userId.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(user);
            }
        }
        this.users = results;
        if(results.length === 0 || !key) {
            this.userService.getUserListRequest()   
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(sub => sub.unsubscribe());
    }

}
