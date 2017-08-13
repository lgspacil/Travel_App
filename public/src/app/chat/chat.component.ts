import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService }       from './chat.service';
import { CookieService } from "angular2-cookie/services";

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.component.html',
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  name = this._cookieService.get('user_name');
  country_code = this._cookieService.get('country_code');

  passed_obj = {
    my_name: this.name,
    new_message : "",
    my_country: this.country_code.toLowerCase(),
    longitude: null,
    latitude: null
  }

  others_location = null;
  

  constructor(private chatService: ChatService, private _cookieService:CookieService) { }

  ngOnInit() {

    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log("the message here is: ", message)
      this.others_location = message;

      if(Math.abs(this.others_location.latitude - this.passed_obj.latitude) <= .192528 || Math.abs(this.passed_obj.latitude - this.others_location.latitude) <= .192528 && Math.abs(this.others_location.longitude - this.passed_obj.longitude) <= .192528 || Math.abs(this.passed_obj.longitude - this.others_location.longitude) <= .192528){
        this.messages.unshift(message);
      }else{
        console.log("you are not close enough to other people");
        
      }
 
    })

    this.getLocation();
  }

  getLocation() {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((pos)=>this.setPosition(pos))
     }
  }

  setPosition(position) {
     this.passed_obj.latitude = position.coords.latitude;
     this.passed_obj.longitude = position.coords.longitude;
     console.log(position.coords);
  }



  sendMessage() {
    console.log("I am sending this: ", this.passed_obj)
    this.chatService.sendMessage(this.passed_obj);
    this.passed_obj.new_message = '';
  }


  ngOnDestroy() {
    this.connection.unsubscribe();
  }


}