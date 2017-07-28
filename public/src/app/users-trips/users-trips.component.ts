import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-trips',
  templateUrl: './users-trips.component.html',
  styleUrls: ['./users-trips.component.css']
})
export class UsersTripsComponent implements OnInit {

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _route: ActivatedRoute, private _router: Router) { }

  users_trips = null;

  ngOnInit() {
    this.loadAllTrips()
  }

  loadAllTrips(){
    this._httpService.loadAllTrips()

    .then((data) =>{
      console.log("loading all the trips: this is what I got back", data);
      this.users_trips = data;
      
    })
    .catch((err) =>{
      console.log("error unable to load all the tripps");
      
    })
  }

  checkOutUsersTrip(trip_id){
    console.log("you selected a trip id of: ", trip_id);
    
    this._cookieService.put('trip_id', trip_id);
    this._router.navigate(['/map']);
  }

}
