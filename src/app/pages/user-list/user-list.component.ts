import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  username = '';

  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  content: any;
  type: any;

  role: Role = {};

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.retrieveUsers();

    this.authService.getProtected().subscribe({
      next: (data) => {
        console.log(data);

        this.isLoggedIn = true;

        this.content = data.message;
        this.type = data.type;
        this.currentUser = data.user;

        this.roleService.getByRole(this.currentUser?.role).subscribe({
          next: (data) => {
            console.log(data);

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
            console.log('getByRole: ', err);
            this.isLoggedIn = false;
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoggedIn = false;
      },
    });
  }

  retrieveUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchName(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.getByName(this.username).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}