import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenAuthInterceptor } from './interceptor/token-auth.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
