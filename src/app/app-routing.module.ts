import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { AdminComponent } from './pages/admin/admin.component';
import { ModeratorComponent } from './pages/moderator/moderator.component';
import { UserComponent } from './pages/user/user.component';

import { ProfileComponent } from './pages/profile/profile.component';

import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

import { RoomListComponent } from './pages/room-list/room-list.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';

import { AuthGuard } from './guards/auth.guard';

import { UserGuard } from './guards/user.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'user', component: UserComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'mod', component: ModeratorComponent, canActivate: [AuthGuard, ModeratorGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: CreateUserComponent, canActivate: [AuthGuard] },

  { path: 'rooms', component: RoomListComponent, canActivate: [AuthGuard] },
  { path: 'rooms/:id', component: RoomDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-room', component: CreateRoomComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }