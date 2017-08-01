import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-continue',
  templateUrl: './create-continue.component.html',
  styleUrls: ['./create-continue.component.css']
})
export class CreateContinueComponent implements OnInit {
  
  //user info stored in the cookie:
  name = this._cookieService.get('user_name');
  user_id = this._cookieService.get('user_id');

  selected_users_trips = [];

  new_trip_obj = {
    trip_name: "",
    _user_id: this.user_id,
    username: this.name
  }

  error = "";

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {

    this.loadTrips()

  }

  loadTrips(){
    console.log("in the loading trips in component.ts");

    this._httpService.loadTrips(this.user_id)
    .then((data) =>{
      console.log("the users info must be: ", data)
      this.selected_users_trips = data;

    })
    .catch((err) =>{
      console.log("there was an error when loading trips...");
      
    })
  }

  addedNewTrip(){
    this._httpService.addedNewTrip(this.new_trip_obj)

    .then((data) => {
      if(data == false){
        this.error = "you already have a trip in that name.."
      } else{
        console.log("this is a new trip()()()()()(): ", data)
        this._cookieService.put('trip_id', data._id);

        this._router.navigate(['/map']);
      }
    })
    .catch((err) =>{
      console.log("got an error when adding a new trip");
      
    })
  }

  continueTrip(trip_id){
    console.log("the trip you selected has an id of: ", trip_id)
    this._cookieService.put('trip_id', trip_id);
    this._router.navigate(['/map']);

  }


  // removing the trip
  deleteTrip(trip_id){
    console.log("removing trip.... at the id of: ", trip_id)
    this._httpService.deleteTrip(trip_id)
      .then((data) =>{
        this.loadTrips();
      })
      .catch((err) =>{
        console.log("unable to delete the trip");  
      })
    
  }

}
