import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    loggedInUsername: any;
    private jwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) { }

    register(user: IUser): Observable<HttpResponse<any> | HttpErrorResponse> {
        return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${environment.apiUrl}/user/register`, user, {observe: 'response'});
    }

    login(user: IUser): Observable<HttpResponse<any> | HttpErrorResponse> {
        return this.http.post<HttpResponse<IUser> | HttpErrorResponse>(`${environment.apiUrl}/user/login`, user);
    }

    logout(): void {
        this.token = null;
        this.loggedInUsername = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('users');
    }

    isLoggedIn(): boolean {
        this.loadToken();
        if(this.token !== null && this.token !== ''){
            if(this.jwtHelperService.decodeToken(this.token).sub !== null || '') {
                if(!this.jwtHelperService.isTokenExpired(this.token)) {
                    this.loggedInUsername = this.jwtHelperService.decodeToken(this.token).sub;
                    return true;
                }
            }
        } else {
            this.logout();
        }
        return false;
    }

    saveToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    loadToken(): void {
        this.token = localStorage.getItem('token');
    }

    getToken(): string {
        return this.token;
    }

    saveUserToLocalStorage(user: IUser): void {
        localStorage.setItem('users', JSON.stringify(user));
    }
    
    getUserFromLocalStorage(): IUser | null {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) as IUser : null;
    }

}
