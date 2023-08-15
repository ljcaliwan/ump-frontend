import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationBarToggle } from './models/navigation-bar-toggle.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ump-frontend';
    isSideNavCollapsed = false;
    screenWidth = 0;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    getBodyClass(): string {
        let styleClass = '';
        if(this.isSideNavCollapsed && this.screenWidth > 768) {
        styleClass = 'body-trimmed';
        } else if(this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
        styleClass = 'body-md-screen'
        }
        return styleClass;
    }
    
    onToggleSideNav(data: NavigationBarToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }
}
