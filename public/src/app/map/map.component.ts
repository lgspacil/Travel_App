import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  //user info stored in the cookie:
  name = this._cookieService.get('user_name');
  user_id = this._cookieService.get('user_id');
  trip_id = this._cookieService.get('trip_id');

  //load specific markers with this obj
  trip_user_obj = {
    trip_id: this.trip_id
  }

  //in case you are looking at another trip we have to know their user_id if it matches to the user_id that logged in
  //to see if you have the ability to change features
  the_trips_user_id = null;

  //name of the trip on the map page, this name is pulled when the view loads depending on the trip_id cookie
  trip_name = "";

  //values
  markerName:string = '';
  markerLat:string = '';
  markerLng:string = '';

  //zoom level
  zoom: number = 10

  //Start Postion
  latitude: number;
  longitude: number;

  //markers
  markers = [
  ]

  //trip info that is being displayed
  display_obj ={
    money_count : 0,
    day_count: 0,
    trip_id: this.trip_id
  }

  //parameter to load info page
  info_page = false;
  add_info_page = false;

  //variable that will be available to the child
  add_info_to_marker = null;
  info_for_child_to_display = null;

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.loadSpecificMarkers()
    this.getTripNameAndUserIdFromTripId()
  }

  scroll(el) {
    console.log('scroll')
    el.scrollIntoView(true);
  }

  loadSpecificMarkers(){
    this._httpService.loadSpecificMarkers(this.trip_user_obj)

    .then((data) =>{
      // console.log("Success loading markers got back this###########", data);

      this.markers = [];
      this.display_obj = {
        money_count : 0,
        day_count: 0,
        trip_id: this.trip_id
      }

      // console.log("entering the for loop");

      for(var i = 0; i < data._locations.length; i++){
        let newMarker = {'location_name': data._locations[i].location_name,
                             'latitude': data._locations[i].latitude,
                             'longitude': data._locations[i].longitude,
                             'username': data._locations[i].username,
                             'content': data._locations[i].content,
                             'price': data._locations[i].price,
                             '_id': data._locations[i]._id,
                             'images': data._locations[i].images,
                             'img_url': data._locations[i].img_url,
                             'day_number': data._locations[i].day_number,
                             '_user': data._locations[i]._user,
                             '_trip': data._locations[i]._trip,
                             'weather': data._locations[i].weather

        }
        this.markers.push(newMarker);

        if (data._locations[i].day_number > this.display_obj.day_count){
          this.display_obj.day_count = data._locations[i].day_number;
        }

        this.display_obj.money_count += data._locations[i].price;

      }
      // this.display_obj.trip_name = data.trip_name;

      //if no marker was placed start in the bay area else, start at the markers last placed position
      if (this.markers.length == 0){
        this.latitude = 32.898504;
        this.longitude = -36.4194155;
        this.zoom =2;
      }else{
        this.latitude = this.markers[this.markers.length -1].latitude;
        this.longitude = this.markers[this.markers.length -1].longitude;
      }

      //add the updated informatino about the current days and money count to the DB:
      // console.log("about to enter updateTripInfo... in loadSpecificMarkers:");

      this._httpService.updateTripInfo(this.display_obj)
        .then((data) =>{
          // console.log("awesome this new feature worked")
        })
        .catch((err) =>{
           console.log("unable to update users money and day count")
      })
    })
    .catch((err) =>{
      console.log("failed loading markers");

    })
  }

  mapCLicked($event:any){

    if (this.user_id == this.the_trips_user_id){
      // console.log("a new marker was added when the screen was clicked: ", event);

      var newMarker = {
        location_name: '',
        latitude: $event.coords.lat,
        longitude: $event.coords.lng,
        username: this.name,
        _trip: this.trip_id,
        icon_url: '',
        content: '',
        price: 0,
        day_number: 0,
        trip_location: '',
        _user: this.user_id
      }

      // this.markers.push(newMarker);

      this._httpService.addLocationToDB(newMarker)
        .then((data) =>{
          if (data != null){
            this.markers.push(data);
            // console.log("pushed this location to the markers array: ", data)

            // moving the map to the location that was just added
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }
        })
        .catch((err) =>{
          console.log("unable to post location to the DB");
        })
    }

  }

  clickedMarker(marker, index:number){
    // console.log('Clicked Marker:' +marker.name+ ' at index '+ index);
  }

  // removing the marker
  removeMarker(marker){
    // console.log("removing marker.... at the id of: ", marker._id)
    this._httpService.removeMarker(marker)
      .then((data) =>{
        //if successful removal then I need to update the users location
        this._httpService.updateTripsLocations(marker)
          .then((data) =>{
            // console.log("I think this means that I was able to remove one of the locations after updating the locaions array, ", data)
            this.loadSpecificMarkers();
          })
          .catch((err) =>{
            console.log("Didnt work :( ");
          })
      })
      .catch((err) =>{
        console.log("unable to reload the locations");
      })

  }

  //using the input tag to look up a marker point using the google api
  getLocationName(){

    this._httpService.getLocationName(this.markerName)
    .then((data) =>{
      // console.log("this is the data that came back: ", data.results[0].geometry.location)

      this.markerLat = data.results[0].geometry.location.lat
      this.markerLng = data.results[0].geometry.location.lng

      var newMarker = {
        location_name: this.markerName,
        latitude: parseFloat(this.markerLat),
        longitude: parseFloat(this.markerLng),
        username: this.name,
        _user: this.user_id,
        icon_url: '',
        content: '',
        price: 0,
        day_number: 0,
        _trip: this.trip_id
      }

      // console.log("the new marker made by the search bar is: ", newMarker)

      //add this location to the DB
      this._httpService.addLocationToDB(newMarker)
        .then((data) =>{
          if (data != null){
            this.markers.push(data);
            // console.log("pushed this location to the markers array, ", data)

            //moving the map to the location that was just added
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }

        })
        .catch((err) =>{
          console.log("unable to post location to the DB");

        })

    })

    .catch((err) =>{
      console.log("ther was an error")
    })

  }

  load_add_info(marker_info){
    this.add_info_page = true;
    this.info_page = false;

    this.add_info_to_marker = marker_info;
  }

  load_view_info(marker_info){
    this.info_page = true;
    this.add_info_page = false;

    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@", marker_info)
    this.info_for_child_to_display = marker_info;
  }

  getTripNameAndUserIdFromTripId(){
    // console.log("hey I am getting the trip name");

    this._httpService.getTripNameAndUserIdFromTripId(this.trip_id)

    .then((data) =>{
      // console.log("the trip name is: ", data.trip_name, "and the trips user_id is: ", data._user_id)
      this.trip_name = data.trip_name;
      this.the_trips_user_id = data._user_id;

    })
    .catch((err) =>{
      console.log("unable to get the trip name")
    })

  }


  closeInfoPage(event){
    if (event == false){
      this.info_page = false;
    }
  }

  closeAddPage(event){
    if(event == false){
      this.add_info_page = false;
    }
  }

  reloadPage(event){
    this.loadSpecificMarkers();
    if (event == false){
      this.add_info_page = false;
    }
  }



}
