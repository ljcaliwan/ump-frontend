import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToesterType } from 'src/app/enum/toaster-type.enum';
import { ToesterMessage } from 'src/app/enum/toester-message.enum';
import { navBarData } from 'src/app/models/navigation-bar-data';
import { NavigationBarToggle } from 'src/app/models/navigation-bar-toggle.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('150ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SideNavComponent implements OnInit {
    @Output() onToggleSideNav: EventEmitter<NavigationBarToggle> = new EventEmitter();
    collapsed = false;
    screenWidth = 0;
    navData = navBarData;

    constructor(private authService: AuthService, private router: Router, private toaster: ToastrService) {}

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = window.innerWidth;
        if(this.screenWidth <= 768 ) {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
        }
    }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }

    closeSidenav(): void {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
    
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.toaster.success(ToesterMessage.SUCCESS_LOGOUT_MSG, ToesterType.SUCCESS)
    }
}
