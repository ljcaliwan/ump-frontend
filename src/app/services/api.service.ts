import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { ICustomHttpResponse } from '../models/custom-response.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/user/list`);
    }

    addUser(formData: FormData): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/add`, formData);
    }

    updateUser(formData: FormData): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/update`, formData);
    }

    resetPassword(email: string): Observable<ICustomHttpResponse> {
        return this.http.get<ICustomHttpResponse>(`${environment.apiUrl}/user/reset-password/${email}`);
    }

    updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
        return this.http.post<User>(`${environment.apiUrl}/user/updateProfileImage`, formData, { reportProgress: true, observe: 'events'});
    }

    deleteUser(username: string): Observable<ICustomHttpResponse> {
        return this.http.delete<ICustomHttpResponse>(`${environment.apiUrl}/user/delete/${username}`);
    }
}
