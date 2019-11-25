import { Component, OnInit } from '@angular/core';
import { HrmsService } from '../services/hrms.service';
import { DataService } from '../services/data.service';
import { EmployeeInfo } from './EmployeeInfo.model';
import {Location} from '@angular/common';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  backClicked() {
    this._location.back();
    
    
  }
  projectDetails: any;
  projectDetailsLi: any;
  private pageSize: number = 5;
  eid;
  empbasic: Object;
  empbasicinfo: any;
  manager: any;
  employee: any;
  allEmp: EmployeeInfo[];
  pic1: any;
  pic: any;
  initials: any;
  txt: boolean;
  
  constructor(private hrms:HrmsService, private dataservice:DataService,private _location: Location) { 
    this.eid = localStorage.getItem("UserName");
  }

  ngOnInit() {
    this.getempdata();
  

  }
  loading=true;
  getempdata() {
    //this.isupdate=false;

    var empinfo =
    {
      "employeeInfo": [{

      }],
      "transactionType": "getall"
    }

    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.loading=false;
      this.empbasicinfo = this.empbasic;
     // console.log("emp data : ", this.empbasicinfo);
      
      
      this.allEmp = this.empbasicinfo.employeeInfo.map(emp => {
        let info =  new EmployeeInfo();
        info.email = emp.email;
        info.employeeId = emp.employeeId;
        info.firstname = emp.firstname;
        info.lastname = emp.lastname;
        info.middlename = emp.middlename;
        info.officialEmail = emp.officialEmail;
        info.personalMobileNo = emp.personalMobileNo;
        info.image = emp.image;
        info.gender = emp.gender;
        return info;
      });
     // console.log("Ajay data : ", this.allEmp);
      for (let i = 0; i <  this.allEmp.length; i++) {
        if(this.allEmp[i].image != "data:image/jpeg;base64,null") {
          this.allEmp[i].txt = false;
        let img = this.allEmp[i].image;
        this.allEmp[i].image = "data:image/jpeg;base64,"+img;
        console.log('Image data : ', this.allEmp[i]);
        } if (this.allEmp[i].image == "data:image/jpeg;base64,null") {
console.log("Else block");
          if(this.allEmp[i].gender == 1) {
            this.allEmp[i].image = "/assets/pics/male.png";
          } else {
            this.allEmp[i].image = "/assets/pics/female.png";
          }
          /* let fName= this.allEmp[i].firstname;
          let lName= this.allEmp[i].lastname;
          const f = fName[0];
          const l = lName[0];
          this.allEmp[i].text = f[0].toUpperCase()+l[0].toUpperCase();
          this.allEmp[i].txt =true;
          console.log("Txt status : ", this.allEmp[i]);
          
          console.log("The First Letter of Fitst Name : ",f[0]);
          console.log("The First Letter of Last Name : ",l[0]);
          console.log("First and Last initails letters: ",this.initials); */
        }
      }


    //this.pic1 = this.allEmp.map(_=>_.image);
   //this.pic = "data:image/jpeg;base64,"+this.pic1

     // console.log(this.allEmp, "ssssssssssssssssseconddddddddddddddddddd");
    })
  }
}
