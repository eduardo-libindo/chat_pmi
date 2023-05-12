import { Component } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { AuthService } from './services/auth.service';
import { EventBusService } from './shared/event-bus.service';
import { Router } from '@angular/router';
import { RoleService } from './services/role.service';
import { User } from './models/user.model';
import { Role } from './models/role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  content: any;
  type: any;

  role: Role = {};
  currentUser: User = {};

  eventBusSub?: Subscription;

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProtected().subscribe({
      next: (data) => {
        // console.log(data);
        
        this.isLoggedIn = true;

        this.content = data.message;
        this.type = data.type;
        this.currentUser = data.user;

        this.roleService.getByRole(this.currentUser?.role).subscribe({
          next: (data) => {
            // console.log(data);

            this.role = data;

            if (this.role.name === 'user') {
              this.showUserBoard = true;
            } else if (this.role.name === 'moderator') {
              this.showModeratorBoard = true;
            } else if (this.role.name === 'admin') {
              this.showAdminBoard = true;
            } else {
              this.showUserBoard = false;
              this.showModeratorBoard = false;
              this.showAdminBoard = false;
            }
          },
          error: (err) => {
            // console.log('getByRole: ', err);
            this.isLoggedIn = false;
          },
        });
      },
      error: (err) => {
        // console.log('getProtected: ', err);
        this.isLoggedIn = false;
      },
    });

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);

        this.isLoggedIn = false;
        this.content = res.message;
        this.type = res.type;

        setTimeout(() => {
          this.router.navigate(['/']);
          this.reloadPage();
        }, 1000);
      },
      error: (err) => {
        console.log('logout: ', err);
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}