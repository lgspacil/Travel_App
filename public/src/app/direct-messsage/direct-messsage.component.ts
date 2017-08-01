import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services";

@Component({
  selector: 'app-direct-messsage',
  templateUrl: './direct-messsage.component.html',
  styleUrls: ['./direct-messsage.component.css']
})
export class DirectMesssageComponent implements OnInit {

  user_id = this._cookieService.get('user_id');

  constructor(private _httpService: HttpService, private _cookieService:CookieService) { }

  allUsers = null;
  showChatBox = false;
  info_for_child_to_display = null;

  ngOnInit() {
    this.loadAllUsers()
  }

  loadAllUsers(){
    this._httpService.loadAllUsers()

    .then((data) =>{
      console.log("got all users", data);
      this.allUsers = data;
    })
    .catch((err) =>{
      console.log("can not get all users");
      
    })
  }

  startAChat(user_id){
    this.showChatBox = true;
    console.log("I want to chat with: ", user_id);

    this.info_for_child_to_display = user_id;
  }
}
