import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {
  @Input() displayMarkerInfo;
  @Output() xClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.displayMarkerInfo)
  }

  closeViewInfo(){
    this.xClicked.emit(false);
  }

}
