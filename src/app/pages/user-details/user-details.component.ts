import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentUser: User = {};

  message = '';

  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  content: any;
  type: any;

  role: Role = {};
  roles_user?: Role[];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params['id']);
    }

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
        console.log('getByRole: ', err);
        this.isLoggedIn = false;
      },
    });

    this.roleService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.roles_user = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  type_role(id: any) {
    if (id == 1) {
      return 'User';
    } else if (id == 2) {
      return 'Moderador';
    } else if (id == 3) {
      return 'Admin';
    } else {
      return 'Sem Tipo!!!';
    }
  }

  getUser(id: string): void {
    this.userService.getByUser(id).subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This user was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/users']);
      },
      error: (e) => console.error(e),
    });
  }
}