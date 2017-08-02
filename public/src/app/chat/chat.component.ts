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
  
  passed_obj = {
    my_name: this.name,
    new_message : ""
  }

  constructor(private chatService: ChatService, private _cookieService:CookieService) { }

  sendMessage() {
    this.chatService.sendMessage(this.passed_obj);
    this.passed_obj.new_message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}