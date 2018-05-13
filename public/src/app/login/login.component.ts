import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpService } from 'app/http.service';
import { Router } from '@angular/router';
// import { FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_obj = {
    email: '',
    password: '',
  }

  error = '';

  constructor(private _httpService: HttpService, private _cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
  }


  userLogin() {
    console.log('user clicked me to login')
    this._httpService.userLogin(this.user_obj)

    .then((data) => {
      console.log('data in the login.ts we got back is: ', data)
      if (data == null) {
        this.error = 'You have to register if this is your first time here'
      } else {
        if (this.user_obj.password == data.password) {
            console.log('success for logging in! ', data);
            this._cookieService.put('user_name', data.username);
            this._cookieService.put('user_id', data._id);
            this._cookieService.put('country_code', data.country)

            this._router.navigate(['/create_continue']);
        } else {
          this.error = 'Wrong Password!'
        }
      }
    })
    .catch((err) => {
      console.log('got an error when trying to login');

    })

  }
}
