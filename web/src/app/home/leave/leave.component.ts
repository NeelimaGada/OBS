import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  backClicked() {
    this._location.back();
    
    
  }
  constructor(private _location: Location) { }

  ngOnInit() {
  }

}
