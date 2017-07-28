import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { CreateContinueComponent } from './create-continue/create-continue.component';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpService } from "app/http.service";
import { HttpModule } from '@angular/http';
import { ViewInfoComponent } from './map/view-info/view-info.component';
import { AddInfoComponent } from './map/add-info/add-info.component';
import { UsersTripsComponent } from './users-trips/users-trips.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    CreateContinueComponent,
    ViewInfoComponent,
    AddInfoComponent,
    UsersTripsComponent,
    ChatRoomComponent,
  ],
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9QqT__lEB5kzYAlfK6HpQEtgOAVijZyk'
    })
  ],
  providers: [HttpService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
