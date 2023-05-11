import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit {
  @Input() room: Room = {};
  sectores: any;
  submitted = false;
  isSubmitFailed = false;
  errorMessage = '';

  isButtonClicked: boolean = false;

  public disableButtonClick() {
    this.isButtonClicked = true;
  }

  constructor(
    private roomService: RoomService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.sectorService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.sectores = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  saveRoom(): void {
    this.roomService.create(this.room).subscribe({
      next: (res) => {
        console.log(res);
        this.isSubmitFailed = false;
        this.submitted = true;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSubmitFailed = true;
      },
    });
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }
}
