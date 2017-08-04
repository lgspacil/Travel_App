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
    my_country: this.country_code.toLowerCase()
  }

  constructor(private chatService: ChatService, private _cookieService:CookieService) { }

  sendMessage() {
    console.log("I am sending this: ", this.passed_obj)
    this.chatService.sendMessage(this.passed_obj);
    this.passed_obj.new_message = '';
  }

  ngOnInit() {

    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log(message)
      console.log("in the messages array: what is inside? ", this.messages)
      this.messages.unshift(message);
      console.log("After I added the message", this.messages);
      
      
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}