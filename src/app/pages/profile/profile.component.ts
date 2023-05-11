import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  content?: string;
  type?: string;

  currentUser: User = {};

  message = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.authService.getProtected().subscribe({
      next: (data) => {
        this.content = data.message;
        this.type = data.type;
        this.currentUser = data.user;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this.router.navigate(['/']);
          this.reloadPage();
        }, 1000);
      },
      error: (e) => console.error(e),
    });
  }

  reloadPage(): void {
    window.location.reload();
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
}
