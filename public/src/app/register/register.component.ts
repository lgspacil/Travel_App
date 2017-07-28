import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _router: Router) { }

  user_obj = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  }

  errors = "";

  ngOnInit() {
  }

  registerUser(){
    console.log("hello dip shit")
    this._httpService.registerUser(this.user_obj)

    .then((data) =>{
      console.log("back in the register.ts with the data: ", data)
      if(data==false){
        this.errors = "you already registered with this email";
      }
      else{
        console.log("success posted to the DB: now adding to our cookies");
        this._cookieService.put('user_name', data.username);
        this._cookieService.put('user_id', data._id);

        this._router.navigate(['/create_continue']);
      }
    })
    .catch((err) =>{
      console.log("in the register.ts but had an error")
    })
  }

}
