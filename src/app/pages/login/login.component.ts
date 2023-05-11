import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;

  errorMessage = '';
  token: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        console.log(data);

        if (data !== null) {
          this.isLoggedIn = true;
          this.isLoginFailed = false;

          setTimeout(() => {
            this.router.navigate(['/']);
            this.reloadPage();
          });
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    setTimeout(() => {
      window.location.reload();
    });
  }
}
