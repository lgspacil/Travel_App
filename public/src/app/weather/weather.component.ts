import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services";


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather_obj = {
    location_name : ""
  }

  weather_res = {
    name : "",
    temp : Number
  }

  show_weather = false;

  seconds = 1;
  

  constructor(private _httpService: HttpService, private _cookieService:CookieService) { }

  ngOnInit() {
    // setInterval(()=> {
    //    this.timer(); },1000); 
  }

  getWeather(){
    this._httpService.getWeather(this.weather_obj.location_name)

    .then((data) =>{
      console.log("In the city of: ", data.name, " has a temp of: ", data.main.temp)
      console.log(data);
      
      this.weather_res.name = data.name;
      this.weather_res.temp = data.main.temp;

      this.show_weather = true;
    })
    .catch((err) =>{
      console.log("unable to get weather information");
      
    })
  }



  // timer(){
  //   this.seconds += 1;
  // }



}
