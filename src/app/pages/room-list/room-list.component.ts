import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Room } from 'src/app/models/room.model';
import { Role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms?: Room[];
  currentRoom: Room = {};
  currentUser: User = {};
  currentIndex = -1;
  name = '';

  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  content: any;
  type: any;

  role: Role = {};

  constructor(
    private roomService: RoomService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.retrieveRooms();

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
  }

  retrieveRooms(): void {
    this.roomService.getAll().subscribe({
      next: (data) => {
        this.rooms = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveRooms();
    this.currentRoom = {};
    this.currentIndex = -1;
  }

  setActiveRoom(room: Room, index: number): void {
    this.currentRoom = room;
    this.currentIndex = index;
  }

  removeAllRooms(): void {
    this.roomService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchName(): void {
    this.currentRoom = {};
    this.currentIndex = -1;

    this.roomService.getByName(this.name).subscribe({
      next: (data) => {
        this.rooms = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
