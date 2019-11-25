import { Component, OnInit } from '@angular/core';
import { HrmsService } from '../services/hrms.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-personaldetail',
  templateUrl: './personaldetail.component.html',
  styleUrls: ['./personaldetail.component.scss']
})
export class PersonaldetailComponent implements OnInit {
  backClicked() {
    this._location.back();
    
    
  }
  empbasic: any;
  empbasicinfo:any;
  
  eId;
  employee_Status:any;
  employee_statuslist: any;
   tabledata:any=[];
   gender1: any;
  empgender: any;
  empgenderinfo: any;
  empDesignationDetails:any;
  empDesignationlist:any;

  constructor(private hrms:HrmsService,private _location: Location) {
    this.eId= localStorage.getItem("UserName");
 
    this. getEmployeeStatusData();
    this.getgender();
    this.getEmpDesignation()
    
  }
statusList;
  ngOnInit() {
    setTimeout(() => this.getbaicdetil(),200);
  }
  
  getbaicdetil(){
 var empinfo =
  {

    "employeeInfo": [{
      "employeeId": this.eId

    }],
    "transactionType": "getById"

  }
  this.hrms.getempinfo(empinfo).subscribe(res => {
    this.empbasic = res;
    this. empbasicinfo = this.empbasic.employeeInfo;
    console.log("Status List : ", this.employee_statuslist);
    
    let status = this.employee_statuslist.find(st => st.id == this. empbasicinfo[0].status);
    this. empbasicinfo[0].status = status.status;
    let gender = this.empgenderinfo.find(st => st.id == this. empbasicinfo[0].gender);
    this. empbasicinfo[0].gender = gender.gender;
    console.log("Designation List : ", this.empDesignationlist)
    let designation  = this.empDesignationlist.find(st => st.id == this. empbasicinfo[0].title);
    this. empbasicinfo[0].title = designation.designation;
  })
  }


  getEmployeeStatusData() {
    var request = {

      "transactionType": "getall"
    }
    this.hrms.getEmployeeStatusMaster(request).subscribe(response => {
      this.employee_Status = response;
      this.employee_statuslist = this.employee_Status.employeeStatusList;
      console.log("Employee Status");
      console.log("this is from master",this.employee_statuslist);
    })
  }
  getgender() {

    var genderinfo = {
      "gender": [{
      }],

      "transactionType": "getall"
    }

    this.hrms.getGenderinfo(genderinfo).subscribe(res => {
      this.empgender = res;
      this.empgenderinfo = this.empgender.genderList;
      
    
     console.log("empgenderinfo")
      console.log("this is from master",this.empgenderinfo);
    })


  
  
  }
  getEmpDesignation(){
    var request = {
      "designation":[
             
      ],
      "sessionId":"3121",
      "transactionType":"getall"
  }
     this.hrms.getEmployeeDesignation(request).subscribe(res =>{
      this.empDesignationDetails = res;
     
      this.empDesignationlist = this.empDesignationDetails.listDesignation;
      console.log("empDesignationDetails");
      console.log("this from list",this.empDesignationlist)
     })
  }

}

