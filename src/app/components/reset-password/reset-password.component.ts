import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ToesterType } from 'src/app/enum/toaster-type.enum';
import { ICustomHttpResponse } from 'src/app/models/custom-response.model';
import { ApiService } from 'src/app/services/api.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    subscription: Subscription[] = [];
    isAdmin: boolean = false;

    constructor(private apiService: ApiService, private roleService: RoleService, private toaster: ToastrService) {}
    
    ngOnInit(): void { 
        this.isAdmin = this.roleService.isAdmin;
    }

    resetPassword(emailForm: NgForm) {
        const email = emailForm.value['email'];
        this.subscription.push(
            this.apiService.resetPassword(email).subscribe({
                next: (response: ICustomHttpResponse) => {
                    this.toaster.success(response.message, ToesterType.SUCCESS)
                },
                error: (error: HttpErrorResponse) => {
                    this.toaster.error(error.error.message, 'Error')
                },
                complete: () => {
                    emailForm.reset();
                }
            })
        )
    }

    ngOnDestroy(): void {
        this.subscription.forEach(sub => sub.unsubscribe());
    }
}
