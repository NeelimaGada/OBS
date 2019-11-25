import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-userleavecomponent',
  templateUrl: './userleavecomponent.component.html',
  styleUrls: ['./userleavecomponent.component.scss']
})
export class UserleavecomponentComponent implements OnInit {
  backClicked() {
    this._location.back();
    
    
  }
  constructor(private _location: Location) { }

  ngOnInit() {
  }

}
