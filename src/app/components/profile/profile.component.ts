import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FileUploadStatus } from 'src/app/enum/file-upload-status.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{
    user: User;
    fileStatus = new FileUploadStatus();
    subscription: Subscription [] = [];
    tempProfile: string | ArrayBuffer | File | null = null;
    profilePhoto: File | null = null;
    currentUsername: string  = '';
    isAdmin: boolean = false;

    constructor(private toaster: ToastrService, private authService: AuthService, private apiService: ApiService, 
        private userService: UserService, private roleService: RoleService) {
        this.user = this.authService.getUserFromLocalStorage();
        this.currentUsername = this.user.username;
    }
    
    ngOnInit(): void {
        this.isAdmin = this.roleService.isAdmin;
    }

    save() {
        this.userService.updateProfile(this.currentUsername, this.user, this.profilePhoto); 
    }

    updateProfileImage() {
        const formData = new FormData();
        formData.append('username', this.user.username);
        if(this.profilePhoto !== null){
            formData.append('profileImage', this.profilePhoto);
        }
        this.subscription.push(
            this.apiService.updateProfileImage(formData).subscribe({
                next: (event: HttpEvent<any>) => {
                    this.uploadProgress(event);
                },
                error: (error) => {
                    this.fileStatus.status = 'done';
                },
            })
        )
    }

    private uploadProgress(event: HttpEvent<any>) {
        switch(event.type) {
            case HttpEventType.UploadProgress:
                if (event.total !== undefined) {
                    this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
                }
                this.fileStatus.status = 'progress';
                break;
            case HttpEventType.Response:
                if(event.status === 200) {
                    this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
                    this.toaster.success(`${event.body.firstName}\'s profile image updated successfully.`, 'SUCCESS')
                    this.fileStatus.status = 'done';
                    break;
                } else {
                    this.toaster.error('Unable to upload image. Please try again.', 'ERROR')
                    break;
                }
            default:
                `Finished all processes`;
        }
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
            authorities: user ? user.authorities : [],
            active: user ? user.active : false,
            notLocked: user ? user.notLocked : false,
            profileImageUrl: user ? user.profileImageUrl : ''
        };
    }

    ngOnDestroy(): void {
        this.subscription.forEach(sub => sub.unsubscribe());
    }
}
