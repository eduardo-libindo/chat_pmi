import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorService } from 'src/app/services/sector.service';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role.model';
import { Sector } from 'src/app/models/sector.model';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentRoom: Room = {};

  currentUser: User = {};

  message = '';
  content:any
  type:any

  isLoggedIn = false;
  showUserBoard = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  role: Role = {};
  sectores?: Sector[];

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private roleService: RoleService,
    private sectorService: SectorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRoom(this.route.snapshot.params['id']);
    }

    this.authService.getProtected().subscribe({
      next: (data) => {
        console.log(data);

        this.isLoggedIn = true;

        this.content = data.message;
        this.type = data.type;
        this.currentUser = data.user;

        this.roleService.getByRole(this.currentUser.role).subscribe({
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
            console.log(err);
            this.isLoggedIn = false;
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoggedIn = false;
      },
    });

    this.sectorService.getAll().subscribe({
      next: (data) => {
        console.log(data);

        this.sectores = data;
        
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  type_sector(id: any) {
    if (id == 1) {
      return 'Administração';
    } else if (id == 2) {
      return 'Agricultura';
    } else if (id == 3) {
      return 'Educação';
    } else if (id == 4) {
      return 'Esporte e Cultura';
    } else if (id == 5) {
      return 'Faps';
    } else if (id == 6) {
      return 'Fazenda';
    } else if (id == 7) {
      return 'Fundação';
    } else if (id == 8) {
      return 'Gabinete';
    } else if (id == 9) {
      return 'Industria e Comercio';
    } else if (id == 10) {
      return 'Meio Ambiente';
    } else if (id == 11) {
      return 'Obras';
    } else if (id == 12) {
      return 'Relações Comunitarias';
    } else if (id == 13) {
      return 'Relações Institucionais';
    } else if (id == 14) {
      return 'Saude';
    } else if (id == 15) {
      return 'Serviços Urbanos';
    } else if (id == 16) {
      return 'Assistencia Social';
    } else {
      return 'Sem Tipo!!!';
    }
  }

  getRoom(id: string): void {
    this.roomService.getByRoom(id).subscribe({
      next: (data) => {
        this.currentRoom = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateRoom(): void {
    this.message = '';

    this.roomService.update(this.currentRoom.id, this.currentRoom).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This room was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteRoom(): void {
    this.roomService.delete(this.currentRoom.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/rooms']);
      },
      error: (e) => console.error(e),
    });
  }
}