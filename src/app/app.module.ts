import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModeratorComponent } from './pages/moderator/moderator.component';

import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';

import { httpInterceptorProviders } from './helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    ProfileComponent,
    ModeratorComponent,
    CreateRoomComponent,
    RoomDetailsComponent,
    RoomListComponent,
    CreateUserComponent,
    UserDetailsComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
