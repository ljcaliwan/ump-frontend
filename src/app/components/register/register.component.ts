import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    subscription: Subscription[] = [];
    errors: any = {};
  
    constructor(private router: Router, private authService: AuthService, private toaster: ToastrService) {}
    
    ngOnInit(): void {
        if(this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/user/management');
        }
    }

    onRegister(user: User) {
        this.subscription.push(
            this.authService.register(user).subscribe({
                next: (response: User) => {
                    this.toaster.success(`New account was created for ${response.firstName}. Please check your account to log in.`, 'Success');
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
