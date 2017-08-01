import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() displayUserId;

  user_id = this._cookieService.get('user_id');
  
  yourObj = {
    your_id: this.user_id,
    inbox: "",
    outbox: ""
  }

  yourFriendsObj = {
    yourFriendsId: null,
    inbox: ""
  }

  message_convo = [];

  constructor(private _httpService: HttpService, private _cookieService:CookieService) { }

  ngOnInit() {
    console.log("I am in the chat box and I should be talking to this person:", this.displayUserId);
    this.yourFriendsObj.yourFriendsId = this.displayUserId;
    this.yourFriendsObj.inbox = "hey!";

    setInterval(()=> {
       this.loadYourFriedsInfo();
       this.loadYourUserInfo(); },3000); 
  }

  loadYourUserInfo(){
    this._httpService.loadYourUserInfo(this.user_id)

    .then((data) =>{
      console.log("your inbox is....", data);
      this.message_convo.push(data.direct_message_inbox);
      
    })
    .catch((err) =>{console.log("error");
    })
    
  }

  loadYourFriedsInfo(){
    this._httpService.loadYourFriendsInfo(this.yourFriendsObj.yourFriendsId)

    .then((data) =>{
      console.log("your friends inbox is....", data);
      this.message_convo.push(data.direct_message_inbox);
      
    })
    .catch((err) =>{console.log("error");
    })
  }

  messageSent(){
    //adding what you sent to an array
    // this.message_convo.push(this.yourFriendsObj.inbox)


    this._httpService.messageSent(this.yourFriendsObj)

    .then((data)=>{
      console.log("your friends inbox is now updated: ", data);
      
    })
    .catch((err) =>{
      console.log("error sending message");
      
    })
  }


}
