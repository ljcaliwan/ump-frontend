import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    subscription: Subscription[] = [];
    errors: any = {};
  
    constructor(private router: Router, private authService: AuthService, private toaster: ToastrService) {}
    
    ngOnInit(): void {
        this.authService.isLoggedIn() ? this.router.navigateByUrl('/user/management') :  this.router.navigateByUrl('/login');
    }

    onLogin(user: User): void {
        this.subscription.push(
            this.authService.login(user).subscribe({
                next: (response: HttpResponse<User>) => {
                    const token = response.headers.get(HeaderType.JWT_TOKEN);
                    token ? this.authService.saveToken(token) : '';
                    const body = response.body;
                    if(body) this.authService.saveUserToLocalStorage(body);
                    this.router.navigateByUrl('/user/management');
                },
                error: (error: HttpErrorResponse) => {
                    this.errors = error.error;
                    if(error.error.message){
                        this.toaster.error(error.error.message, 'Error');
                    } else {
                        this.toaster.error('An error occured. Please try again.', 'Error');
                    }
                },
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.forEach(sub => sub.unsubscribe());
    }
}
