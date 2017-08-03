import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  images = ['http://www.wallpapersbyte.com/wp-content/uploads/2015/06/Paris-City-Eiffel-Tower-Monument-Day-Sunset-Crop-Half-WallpapersByte-com-1920x1080.jpg',
  'http://i.imgur.com/MaHL9Nx.jpg',
  'http://www.wildernesstravel.com/images/trips/latin-america/argentina/in-patagonia/1-slide-patagonia-paine-national-park-cuernos-del-paine-pano.jpg',
  'https://umad.com/img/2015/7/nature-glacier-wallpaper-hd-7693-8036-hd-wallpapers.jpg',
  'https://wallpaperscraft.com/image/iceland_mountains_lake_reflection_102190_1920x1080.jpg',
  'http://s1.picswalls.com/wallpapers/2014/08/08/iceland-desktop-wallpaper_020509653_163.jpg',
  'https://www.walldevil.com/wallpapers/a78/maldives-french-polynesia-hammock.jpg',
  'http://www.zastavki.com/pictures/originals/2015/World___Maldives_Highlighting_wooden_pier_in_the_Maldives_111009_.jpg',
  'https://orientalflowers.files.wordpress.com/2013/03/whitehavenn.jpg',
  'http://i.imgur.com/7yuclys.jpg',
  'http://eskipaper.com/images/iceland-beach-wallpaper-1.jpg',
  'http://i.imgur.com/uUId1LT.jpg',
  'http://i.imgur.com/Xz2REfD.jpg',
  'http://i.imgur.com/s5hKnI5.jpg',
  'http://whywander.com/wp-content/uploads/2017/04/discoverparis-universaltourguide.jpg',


]
  random_num = Math.floor(Math.random() * (this.images.length-1 - 0 + 1)) + 0;

  constructor(){}

  ngOnInit() {
    console.log("I am picking a picture with this random number: ", this.random_num)
    document.getElementById('wrapper').style.backgroundImage="url("+this.images[this.random_num]+")";
    // document.getElementById('wrapper').style.backgroundImage="url('https://www.gochile.cl/fotos/header/64499-511281025.jpg')";
  }
}
