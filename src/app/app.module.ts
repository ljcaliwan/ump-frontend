import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenAuthInterceptor } from './interceptor/token-auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TableComponent } from './components/table/table.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        SideNavComponent,
        HeaderComponent,
        TableComponent,
        ProfileComponent,
        DeleteModalComponent,
        ModalDialogComponent,
        ResetPasswordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        AuthService, 
        UserService, 
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: TokenAuthInterceptor, 
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
