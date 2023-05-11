import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  @Input() user: User = {};
  roles: any;
  submitted = false;

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.roles = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  saveUser(): void {
    this.userService.create(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User;
  }
}
