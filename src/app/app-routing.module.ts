import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { settingGuard } from './guard/setting.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'dashboard', 
        canActivate: [authGuard],
        component: DashboardComponent,
    },
    {
        path: 'user/management', 
        canActivate: [authGuard],
        component: HomeComponent,
    },
    {
        path: 'user/profile', 
        canActivate: [authGuard],
        component: ProfileComponent,
    },
    {
        path: 'reset-password',
        canActivate: [authGuard],
        component: ResetPasswordComponent,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
