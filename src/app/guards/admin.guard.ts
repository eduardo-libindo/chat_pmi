import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}
  currentUser: User = {};
  role: Role = {};

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.getProtected().subscribe({
      next: (res) => {
        console.log(res);
        this.currentUser = res.user;

        this.roleService.getByRole(this.currentUser?.role).subscribe({
          next: (data) => {
            console.log(data);
            this.role = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });

    if (this.role.name == 'admin') {
      return true;
    } else {
      return this.router.navigate(['/']);
    }
  }
}