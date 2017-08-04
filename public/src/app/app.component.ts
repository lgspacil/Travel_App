import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  random_num = Math.floor(Math.random() * (15 - 1 + 1)) + 1;

  constructor(){}

  ngOnInit() {
    console.log("I am picking a picture with this random number: ", this.random_num)
    document.getElementById('wrapper').style.backgroundImage="url('/assets/images/background/"+this.random_num+".jpg')";
    // document.getElementById('wrapper').style.backgroundImage="url("+this.images[this.random_num]+")";
    // document.getElementById('wrapper').style.backgroundImage="url('https://www.gochile.cl/fotos/header/64499-511281025.jpg')";
  }
}
