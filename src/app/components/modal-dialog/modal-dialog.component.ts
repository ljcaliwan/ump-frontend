import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserForm } from 'src/app/models/user-form.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.css']
    })
export class ModalDialogComponent implements OnInit {
    user: User = new User();
    profilePhoto: File | null = null;
    tempProfile: string | ArrayBuffer | File | null = null;
    errors: any = {};
    currentUsername: string  = '';
    isAdmin: boolean = false;
    isNewUser: boolean = false;

    @Output() addUserEvent = new EventEmitter<IUserForm>();

    constructor(private userService: UserService, private roleService: RoleService, 
        public dialogRef: MatDialogRef<ModalDialogComponent>, @Inject(MAT_DIALOG_DATA) data: User) {
        if(data) {
            this.user = data;
            this.isAdmin = this.roleService.isAdmin;
            this.currentUsername = data.username;
        }
        this.userService.getAddedOrUpdatedState().subscribe((isSuccessfull) => {
            isSuccessfull ? this.dialogRef.close(true) : this.getErrors();
        })
        this.userService.isNewUser.subscribe((value) => {
            this.isNewUser = value;
        })
    }

    ngOnInit(): void {}

    save() { 
        this.userService.save(this.currentUsername, this.user, this.profilePhoto); 
    }

    onFileChange(inputFile: HTMLInputElement) {
        let file = inputFile.files![0] as File;
        const reader = new FileReader();
        reader.readAsDataURL(file!);
        reader.onload = (_event) => {
            this.tempProfile = reader.result;
        }
        this.profilePhoto = file;
    }

    getEmployeeForm(user: User | null): User {
        return {
            userId: user ? user.userId : '',
            firstName: user ? user.firstName : '',
            lastName: user ? user.lastName : '',
            username: user ? user.username : '',
            email: user ? user.email : '',
            phone: user ? user.phone : '',
            role: user ? user.role : '',
            active: user ? user.active : false,
            notLocked: user ? user.notLocked : false,
            profileImageUrl: user ? user.profileImageUrl : ''
        };
    }

    getErrors() {
    }

}
