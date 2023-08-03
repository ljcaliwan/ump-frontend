import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { ICustomHttpResponse } from '../models/custom-response.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[] | HttpErrorResponse> {
        return this.http.get<IUser[]>(`${environment.apiUrl}/user/list`);
    }
    
    addUsers(formData: FormData): Observable<IUser | HttpErrorResponse> {
        return this.http.post<IUser>(`${environment.apiUrl}/user/add`, formData);
    }

    updateUser(formData: FormData): Observable<IUser | HttpErrorResponse> {
        return this.http.post<IUser>(`${environment.apiUrl}/user/add`, formData);
    }

    resetPassword(email: string): Observable<ICustomHttpResponse | HttpErrorResponse> {
        return this.http.get<ICustomHttpResponse>(`${environment.apiUrl}/user/reset-password/${email}`);
    }

    updateProfileImage(formData: FormData): Observable<HttpEvent<IUser> | HttpErrorResponse> {
        return this.http.post<IUser>(`${environment.apiUrl}/user/updateProfileImage`, formData, { reportProgress: true, observe: 'events'});
    }

    deleteUser(id: number): Observable<ICustomHttpResponse | HttpErrorResponse> {
        return this.http.delete<ICustomHttpResponse>(`${environment.apiUrl}/user/delete/${id}`);
    }

    addUsersToLocalCache(users: IUser[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    getUsersToLocalCache(): IUser[] | null {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) as IUser[] : null;
    }

    createUserFormData(loggedInUsername: string, user: IUser, profileImage: File): FormData {
        const formData = new FormData();
        formData.append('currentUsername', loggedInUsername);
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('role', user.role);
        formData.append('profileImage', profileImage);
        formData.append('isActive', JSON.stringify(user.isActive));
        formData.append('isNotLocked', JSON.stringify(user.isNotLocked));
        return formData;
    }
}
