import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  @Input() updateMarker;
  @Output() submitChangesClicked = new EventEmitter();
  @Output() closeAddPage = new EventEmitter();
  @Output() dayNumber = new EventEmitter();
  @Output() currentCost = new EventEmitter();

  //user info stored in the cookie:
  name = this._cookieService.get('user_name');
  user_id = this._cookieService.get('user_id');
  trip_id = this._cookieService.get('trip_id');

  //the markers on the page
  markers = [];


  constructor(private _httpService: HttpService, private _cookieService:CookieService) { }

  ngOnInit() {
  }

  submitUpdatedChanges(){
    this._httpService.updateMarkerInfo(this.updateMarker)
    .then((data) =>{
      console.log("this is the updated info: ", data)
      this.submitChangesClicked.emit(false);

    })
    .catch((err) =>{
      console.log("yeah.... that didnt work.....")
    })
  
  }

  closeAddInfoPage(){
    this.closeAddPage.emit(false);
  }

}
