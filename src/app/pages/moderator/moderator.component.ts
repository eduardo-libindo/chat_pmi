import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css'],
})
export class ModeratorComponent implements OnInit {
  content?: string;
  isModerator?: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

  }
}
