import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { RegisterComponent } from "app/register/register.component";
import { CreateContinueComponent } from "app/create-continue/create-continue.component";
import { MapComponent } from "app/map/map.component";
import { UsersTripsComponent } from "app/users-trips/users-trips.component";
import { ChatRoomComponent } from "app/chat-room/chat-room.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create_continue', component: CreateContinueComponent},
  { path: 'map', component: MapComponent},
  {path: 'all_trips', component: UsersTripsComponent},
  {path: 'chatroom', component: ChatRoomComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
