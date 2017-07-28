import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

   registerUser(user_obj){
   return this._http.post("/add_user", user_obj).map(data => data.json()).toPromise()
  }

  userLogin(user_obj){
    return this._http.post("/log_in", user_obj).map(data => data.json()).toPromise()
  }

  loadTrips(user_id){
    return this._http.post('/load_trips', {user_id: user_id}).map(data => data.json()).toPromise()
  }

  addedNewTrip(new_trip_obj){
    return this._http.post("/adding_new_trip", new_trip_obj).map(data => data.json()).toPromise()
  }

  addLocationToDB(newMarker){
    return this._http.post("/add_newMarker", newMarker).map(data => data.json()).toPromise()
  }

  loadSpecificMarkers(obj){
    return this._http.post("/load_specific_markers", obj).map(data => data.json()).toPromise()
  }

  updateTripInfo(obj){
    console.log("updating the trip info: ", obj)
    return this._http.post("/update_trip_info", obj).map(data => data.json()).toPromise()
  }

  removeMarker(marker){
    return this._http.post("/remove_marker", marker).map(data =>data.json()).toPromise()
  }

  updateTripsLocations(marker){
    return this._http.post("/update_trip_locations", marker).map(data =>data.json()).toPromise()
  }

   getLocationName(location){
    return this._http.get("https://maps.googleapis.com/maps/api/geocode/json?&address="+location).map(data => data.json()).toPromise()
  }

  getTripNameAndUserIdFromTripId(trip_id){
    return this._http.post("/getTripNameAndUserId", {trip_id: trip_id}).map(data => data.json()).toPromise()
  }

  updateMarkerInfo(info_obj){
    return this._http.post("/update_marker", info_obj).map(data =>data.json()).toPromise()
  }
  
  loadAllTrips(){
    return this._http.get("/loadAllTrips").map(data =>data.json()).toPromise()
  }

}
