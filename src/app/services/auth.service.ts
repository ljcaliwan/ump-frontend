import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    loggedInUsername = new Subject<string>();
    private jwtHelperService = new JwtHelperService();
    host = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.host}/user/register`, user);
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('users');
    }

    isLoggedIn(): boolean {
        this.loadToken();
        if(this.token !== null && this.token !== ''){
            if(this.jwtHelperService.decodeToken(this.token).sub !== null || '') {
                if(!this.jwtHelperService.isTokenExpired(this.token)) {
                    this.loggedInUsername.next(this.jwtHelperService.decodeToken(this.token).sub);
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

    saveUserToLocalStorage(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    getUserFromLocalStorage(): User {
        const userString = localStorage.getItem('user');
        if(userString) {
            return JSON.parse(userString); 
        }
        return new User;
    }

    getLoggedInUsername(): Observable<string>{
        return this.loggedInUsername.asObservable();
    }

}
