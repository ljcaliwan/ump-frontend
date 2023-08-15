import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { IUserForm } from '../models/user-form.model';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToesterMessage } from '../enum/toester-message.enum';
import { ToesterType } from '../enum/toaster-type.enum';
import { ICustomHttpResponse } from '../models/custom-response.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    private userListSubject = new Subject<User[]>();
    userList$: Observable<User[]> = this.userListSubject.asObservable();
    private isAddedOrUpdated = new Subject<boolean>();
    isNewUserState = new BehaviorSubject<boolean>(false);
    isNewUser: Observable<boolean> = this.isNewUserState.asObservable();
    private loggedInUsername = new Subject<string>();
    users: User[] = [];
    errors: any = {};

    constructor(private toaster: ToastrService, private apiService: ApiService,private authService: AuthService) { 
    }
 
    getUserListRequest() {
        this.apiService.getUsers().subscribe({
            next: (response: User[]) => {
                this.users = response;
                this.userListSubject.next(response);
            },
            error: (error) => {
                this.toaster.error(error.error.message, 'Error')
            }
        })
    }

    save(loggedInUsername: string | null, user: User, profileImage: File | null) {
        const formData = this.createUserFormData(loggedInUsername, user, profileImage);
        loggedInUsername === '' || loggedInUsername === null ? this.add(formData) : this.updateUser(formData);
    }

    add(formData: FormData) {
        this.apiService.addUser(formData).subscribe({
            next: (response) => {
                this.isAddedOrUpdated.next(true);
                this.toaster.success(ToesterMessage.SUCCESS_MSG, ToesterType.SUCCESS)
            },
            error: (error) => {
                this.errors = error.error;
                this.isAddedOrUpdated.next(false);
                this.toaster.error(error.error.message, 'Error')
            },
        })
    }

    updateUser(formData: FormData) {
        const currentUsername = formData.get('currentUsername');
        const username = formData.get('username');
        this.apiService.updateUser(formData).subscribe({
            next: (response) => {
                if(username === currentUsername) {
                    this.authService.saveUserToLocalStorage(response);
                    this.loggedInUsername.next(response.username);
                }
                this.isAddedOrUpdated.next(true);
                this.toaster.success(ToesterMessage.UPDATED_MSG, ToesterType.SUCCESS)
            },
            error: (error) => {
                this.isAddedOrUpdated.next(false);
                this.toaster.error(error.error.message, 'Error')
            },
        })
    }

    updateProfile(loggedInUsername: string | null, user: User, profileImage: File | null) {
        const formData = this.createUserFormData(loggedInUsername, user, profileImage);
        this.apiService.updateUser(formData).subscribe({
            next: (response) => {
                this.authService.saveUserToLocalStorage(response); //update currentUser
                this.loggedInUsername.next(response.username);
                this.isAddedOrUpdated.next(true);
                this.toaster.success(ToesterMessage.UPDATED_MSG, ToesterType.SUCCESS)
            },
            error: (error) => {
                this.isAddedOrUpdated.next(false);
                this.toaster.error(error.error.message, 'Error')
            },
        })
    }

    deleteUser(username: string) {
        this.apiService.deleteUser(username).subscribe({
            next: (response: ICustomHttpResponse) => {
                this.toaster.success(response.message, ToesterType.SUCCESS)
                this.getUserListRequest();
            },
            error: (error) => {
                this.toaster.error(error.error.message, 'Error')
            }
        })
    }
    
    addUsersToLocalCache(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    getUsersToLocalCache(): User[]{
        const users = localStorage.getItem('users');
        if(users) {
            return JSON.parse(users) as User[];
        }
        return [];
    }

    createUserFormData(loggedInUsername: string | null, user: IUserForm, profileImage: File | null): FormData {
        const formData = new FormData();
        formData.append('currentUsername', loggedInUsername ?? '');
        formData.append('username', user.username);
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        if(user.role) {
            formData.append('role', user.role);
        }
        if (profileImage instanceof File) {
            formData.append('profileImage', profileImage);
        }
        formData.append('isActive', JSON.stringify(user.active));
        formData.append('isNonLocked', JSON.stringify(user.notLocked));
        return formData;
    }

    getAddedOrUpdatedState(): Observable<boolean> {
        return this.isAddedOrUpdated.asObservable();
    }

    getLoggedInUsername(): Observable<string> {
        return this.loggedInUsername.asObservable();
    }

    getErrors(): any {
        return this.errors;
    }
}
