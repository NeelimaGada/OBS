import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HrmsService } from '../../services/hrms.service';
import { identifierModuleUrl } from '@angular/compiler';
import swal from 'sweetalert';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';

//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-employeeedit',
  templateUrl: './employeeedit.component.html',
  styleUrls: ['./employeeedit.component.scss']
})
export class EmployeeeditComponent implements OnInit {
 


eid:any;
backClicked() {
  this._location.back();
  
  
}

  subscription: Subscription;
  constructor(private hrms:HrmsService,private paramroute: ActivatedRoute, private dataservice:DataService,private route:Router,private _location: Location) { 
   
    // this.eid = this.paramroute.snapshot.paramMap.get('employee_Id');
    // console.log("Snapshot", this.eid);
    this.paramroute.params.subscribe(Response=>{
      this.eid= parseInt(Response['employee_Id']);
      console.log("The message from Employee Edit sibling "+this.eid);
     
      this.dataservice.sendMessage(this.eid);
      
    });
   
  }
  setUserRole;
  user=false;
  ngOnInit() {
    $( '#topheader .navbar-nav li a' ).on( 'click', function () {
      $( '#topheader .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
      $( this ).parent( 'li' ).addClass( 'active' );
    });
    this.setUserRole = localStorage.getItem("setUserRole");
    //console.log('role to check user', this.setUserRole);
    if (this.setUserRole == "true") {
      this.user=true;
      
    }
  }
 role:any;
 userData:any;
  // basicinfofun(){
  //   this.route.navigateByUrl('/employeeedit/basicinfo', this.eid);
  // }

  // education(){
  //   this.route.navigateByUrl('/employeeedit/experience', this.eid);
  // }
}