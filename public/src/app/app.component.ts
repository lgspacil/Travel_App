import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  images = ['http://www.picturesforwalls.com/wallpapers/SDIM0236.jpg',
  'http://www.dream-wallpaper.com/free-wallpaper/nature-wallpaper/black-and-white-landscape-wallpaper/1680x1050/free-wallpaper-6.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/08/e7/d8/08e7d8295b8d3d275698812175a5e45c.jpg',
  'https://image.redbull.com/rbcom/010/2014-12-17/1331695662332_2/0010/1/1500/1000/2/the-torres-del-paine-range-in-chile-south-america-location-for-base-jumper-jokke-summer-s-next-project.jpg',
  'http://www.mauratilbury.com/wp-content/uploads/2014/12/Black-and-white-cliffs-of-moher-stormy.jpg'
]
  random_num = Math.floor(Math.random() * (this.images.length-1 - 0 + 1)) + 0;

  constructor(){}

  ngOnInit() {
    // document.getElementById('wrapper').style.backgroundImage="url("+this.images[this.random_num]+")";
    document.getElementById('wrapper').style.backgroundImage="url('https://www.gochile.cl/fotos/header/64499-511281025.jpg')";
  }
}
