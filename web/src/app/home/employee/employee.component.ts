import { Component, OnInit , HostListener} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeClass } from './employee.model';
import { HrmsService } from '../services/hrms.service';
//import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert';
import { DataService } from '../services/data.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

import {Location} from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  backClicked() {
    this._location.back();
    
    
  }
  addEmpTemplate: boolean = false
  private pageSize: number = 5;
  value: boolean;
  data: any;
  employee: any;
  Employee_Id: any;
  Employee_Name: any
  Fixed_CTC: any;
  CTC: any;
  Total_CTC: any;
  role: any;
// dt:number;
// mon:number;
// yr:number;
mydate:string;
  empData: any = [{
    Id: 19106,
    Name: "BALAJI",
    Fixed_CTC: 12000,
    CTC: 31000,
    Total_CTC: 27000

  }];
  location: any;
  createdby: boolean;
  update: boolean;
  eid: any;
  loggeduser: string;
  employeeId: any;
  newUserForminfo: any;
  empid: any;
  maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  minDate = moment().subtract(118, 'years').format('YYYY-MM-DD');
  

  curDate=new Date();
  dt = this.curDate.getDate();
  mon = this.curDate.getMonth()+1;
  yr = this.curDate.getFullYear();
   cdate=this.dt+"/"+this.mon+"/"+this.yr;
//  dat=d.getDate();
//  mon=d.getMonth();
//  yr=d.getFullYear();
//  mydate=dat+"/"+mon+"/"+yr;
  cDate=moment().format("YYYY-MM-DD");



  c:any
  //currentDate=  moment().format('MMMM Do YYYY'); 
  userData;
  emp: boolean;
  empbasicinfo1: any;


  managerdata = [];
  constructor(private _router: Router, private paramroute: ActivatedRoute, private hrms: HrmsService,
    private dataservice: DataService, private authService: AuthService,private _location: Location) {
    // this.dataservice.sendMessage.subscribe(empid=>this.Employee_Id=empid);
    // console.log("The Original message from data service"+this.Employee_Id);
    //this.dataservice.sendMessage(this.Employee_Id);
    // alert(this.minDate);
    // alert(this.maxDate);
    // this.eid=this.dataservice.paramId;
    // this.loggeduser=localStorage.getItem('UserName');

    // this.authService.getUserdata().then(data=>{
    //   this.userData=data;
    //   console.log(this.userData);
    //   this.role=localStorage.getItem('Role');
    // })
  }

  onBackButtonClick(): void {
    this._router.navigate(['/employeedetails']);
    //this._router.navigateByUrl('/employeedetails');
  }
  cancel() {
    this.location.back();
  }

  addTemplate() {
    this.addEmpTemplate = true;
  }

  updateData(data: any) {
    this.empData.push(data)
  }

  employee_edit(id) {
    
    this._router.navigateByUrl('/employeeedit');
  }

  savedata() {
    var data = {

      "Id": this.Employee_Id,
      "Name": this.Employee_Name,
      "Fixed_CTC": this.Fixed_CTC,
      "CTC": this.CTC,
      "Total_CTC": this.Total_CTC
    }
    this.empData.push(data);
  }



  deleteFieldValue(index) {

    this.empData.splice(index, 1);
  }
  ngOnInit() {
// console.log(this.cDate)
    this.eid = localStorage.getItem('UserName');
    this.getEmployeeStatusData();
    this.getRole();
    this.getgender();

    this.getempdata();
    this.getbyIdbasicdata();

    //console.log("Employee Id:", this.eid)
    this.authService.getUserdata().then(data => {
      this.userData = data;
     // console.log(this.userData);
      this.role = localStorage.getItem('Role');
    })
    var d=new Date()
   
    this.c=d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
   // console.log("date",this.c)
    
  }

  //maxDate ="2002-01-01"
  //minDate ="1960-01-01"  

  // emp basic starts //
  isUpdate: boolean;
  emp_fname: any;
  emp_mname: any;
  emp_lname: any;
  emp_dob: any;
  emp_status: any;
  emp_id: any;
  emp_password: any;
  emp_created: any;
  emp_gender: any;
  basicinfo: any;
  delete_data: any;
  emp_basic: any;
  basicInfobyid: any;
  updateempdata: any;
  basicInfoDetails: any;
  basicUnitObj: any;
  created: any;
  CREATEDBY2: any;
  createdby2: any;
  isUpdate1: boolean;
  basicempstatus: any;
  
  empbasicstatus: any;
  empgender: any;
  empgenderinfo: any;
  createdby1: any;
  employee_Status: any;
  isUPDATEDBY: any;
  employee_statuslist: any;
  isupdateDependent: boolean;
  isactive: boolean;
  isave: any;
  getRoleDetails: any;
  roleManagemenList: any;
  a: number;
  addSkillvalue(newUserForminfo) {
    newUserForminfo.reset();
    //this.isUPDATEDBY=false;
    this.isave = true;
    this.update = false;

  }

  /*
  
   {
       
  "employeeInfo":[
  {
  "firstname":"naga1119",
  "middlename":"siva",
  "lastname":"rani",
  "status":"1",
  "dob":"2019-01-12",
  "gender":"1",
  "title":"8",
  "reportingManager":"15469",
  "employeeId":"196900",
  "flag":"true",
  "statusDate":"2019-08-25",
  "createdOn":"",
  "updatedOn":"",
  "createdBy":"",
  "updatedBy":"",
   "email":"",
   "personalMobileNo":"9885511215"
  
  }],
  "transactionType": "save"
  }
  
  
  
  */



  public empinobj =
    {
      "id": "",

      "firstname": "",
      "middlename": "",
      "lastname": "",
      "status": "",
      "dob": "",
      "gender": "",
      "title": "",
      "reportingManager": "",
      "employeeId": "",
      "flag": "",
      "statusDate": "",
      "createdOn": "",
      "updatedOn": "",
      "createdBy": "",
      "updatedBy": "",
      "email": "",
      "officialEmail": "",
      "personalMobileNo": "",
      "image": ""
    }

  //Get Employee Basic Info
  getgenderdata: any;
  getstatusdata: any;
  empbasic: any;
  empbasicinfo: any
  employeeInfo: any = []
  manager: any;
  reporting: any;
  empbasicin;
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
      this.empbasicin = this.empbasic.employeeInfo;
      this.loading=false;
      if (this.role === 'ROLE_MANAGER') {
        this.empbasicinfo = this.empbasicin.filter(info => info.reportingManager == this.eid);
        //console.log("Report data : ", this.empbasicinfo);
        
      } else {
       
        this.empbasicinfo = this.empbasicin;
      }
    //console.log(this.empbasicinfo, "ffffffffffffffffffirst");
      //console.log(this.empbasic.employeeInfo, "")
     //console.log(this.empbasicinfo[0].image, "ssssssssssssssssseconddddddddddddddddddd");
      this.manager = Array.from(new Set(this.empbasicinfo.map(x => x.reportingManager)));

      this.employee = Array.from(new Set(this.empbasicinfo.map(x => x.employeeId)));
      //console.log(this.employee, "only employessssssssss........")
      //console.log(this.manager, "only managers in employee info...................");
      let mngrData = [];
      for (let n = 0; n <= this.manager.length; n++) {
        for (let m = 0; m < this.employee.length; m++) {
          if (this.manager[n] == this.employee[m]) {
            mngrData.push(this.empbasicinfo[m]);
            //console.log("reactshivaaaaaaaaaaaaaaaa", this.managerdata);
          }
        }
      }
      this.managerdata = mngrData;
      for (let i = 0; i < this.empbasicinfo.length; i++) {

        for (let j = 0; j < this.empgenderinfo.length; j++) {
          if (this.empbasicinfo[i].gender == this.empgenderinfo[j].id) {
           // console.log(this.empbasicinfo[i].gender, "this.empbasicinfo[i].gender");
            //console.log(this.empgenderinfo[j].id, "this.empgenderinfo[j].id");
            this.getgenderdata = this.empgenderinfo[j].gender;
           // console.log("GEnder details");
           // console.log(this.getgenderdata);
          }
        }
        this.empbasicinfo[i].gender = this.getgenderdata;
       // console.log("Final Educational Details Array");
       // console.log(this.empbasicinfo);
      }
      for (let i = 0; i < this.empbasicinfo.length; i++) {

        for (let j = 0; j < this.employee_statuslist.length; j++) {
          if (this.empbasicinfo[i].status == this.employee_statuslist[j].id) {

            this.getstatusdata = this.employee_statuslist[j].status;
            //console.log("GEnder And Status details");
            //console.log(this.getstatusdata);
          }
        }
        this.empbasicinfo[i].status = this.getstatusdata;
       // console.log("Final Educational Details Array");
        //console.log(this.empbasicinfo);
      }
    })

  }
  l: any;
  addempUnit(newUserForminfo) {
    newUserForminfo.reset();
    this.l = this.empbasicinfo.length;

    this.empinobj.employeeId = this.empbasicinfo[this.l - 1].employeeId
    this.a = parseInt(this.empinobj.employeeId) + 1;
    this.empinobj.employeeId = this.a + "";

  }
  files: any;
  filestring: any;

  fileSelected(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString);  // Converting binary string data.
   // console.log("Profile pic Data : ", this.filestring);

  }
  reportingManagerEmpId: any

  saveemployeeInfo(data) {
    //console.log("loggggggggggggggggggggggggggggggggg",data);
    
    var request =
    {
      "employeeInfo": [{

        "firstname": data.emp1,
        "middlename": data.emp2,
        "lastname": data.lastname,
        "status": data.emp02,
        "dob": data.empname,
        "gender": data.emp03,
        "title": data.Title,
        "reportingManager": data.reportingManager,
        "statusDate": this.cDate,
        "employeeId": this.a.toString(),
        "createdBy": this.eid,
        "email": data.email,
        "officialEmail": data.officialEmail,
        "personalMobileNo": data.personalMobileNo,
        "image": this.filestring

      }],
      "transactionType": "save"
    }


    //console.log( "this.empinobj.gender",request);
    //  if (new Date(this.empinobj.dob) < this.dateToday) {
    this.hrms.saveempinfo(request).subscribe(res => {
      this.basicinfo = res;

     // console.log(request, "trwgsfdgsfglksfjdglksfjdgskldfjgs;ldfkgjsdf;lkgjsfdgklsjdfg;lksfdjgkl");
      console.log("response",this.basicinfo);
      //console.log("employeeId", parseInt(this.empinobj.employeeId) + 1)
      if (this.basicinfo.message == "Successfully record added") {
        swal("", this.basicinfo.message, "success");

        this.getempdata();
      }
    },
      error => {
        swal("Duplicates are not allowed!", "", "error");

        this.getempdata();
      })


    /*  }else{
       swal("Please enter a valid date","","error");
     } */

    // {
    //   "employeeInfo" :[{
    //                   "firstname" : this.empinobj.firstname,
    //                   "middlename" : this.empinobj.middlename,
    //                   "lastname" : this.empinobj.lastname,
    //                   "status" : this.empinobj.status,
    //                "dob":this.empinobj.dob,
    //                   "gender" : this.empinobj.gender,
    //                  // "password" : this.empinobj.password,
    //                   "createdBy":this.loggeduser,
    //                   "employeeId" : this.empinobj.employeeId,

    //   }],
    //   "transactionType" : "save"
    // }


  }


  deleteemp(empbasic: { id: any; }) {
    var reguest1 = {
      "employeeInfo": [{
        "id": empbasic.id

      }],
      "transactionType": "delete"

    }
    this.hrms.deleteempinfo(reguest1).subscribe(response => {
      this.delete_data = response;
      //console.log(this.delete_data);
      if (this.delete_data.statusMessage == "Success fully record deleted") {
        swal(this.delete_data.statusMessage, "", "success");


      }
      this.getempdata();
    })

  }
  updateempinfo() {
    // this.isupdate = false;

    var updateempreq =
    {
      "employeeInfo": [{
        "id": this.empinobj.id,
        "firstname": this.empinobj.firstname,
        "middlename": this.empinobj.middlename,
        "lastname": this.empinobj.lastname,
        "status": this.empinobj.status,
        "dob": this.empinobj.dob,
        "gender": this.empinobj.gender,
        //"password" : this.empinobj.password,
        "employeeId": this.empinobj.employeeId,

      }],
      "transactionType": "update"


    }
    this.hrms.updateempinfo(updateempreq).subscribe(res => {
      this.updateempdata = res;
      //console.log(this.updateempdata);
      if (this.updateempdata.message == "Successfully record added") {
        swal(this.updateempdata.message, "", "success");
        //   this.getdependentData();

        this.getempdata();
      }
    },
      error => {
        swal("Duplicates are not allowed", "", "error");
        this.getempdata();
      })



  }

  //  addBasic()
  //  {

  //  }

  getbyIdbasicdata() {

    this.createdby = false;
    this.isUpdate = true;
    //var empdataid= .id;  
    var GetUpdatebasicInfo = {
      "employeeInfo": [{
        "employeeId": this.eid
      }],
      "transactionType": "getById"
    }
    this.hrms.getbyIdempinfo(GetUpdatebasicInfo).subscribe(res => {

      this.basicInfobyid = res;
      this.basicInfoDetails = this.basicInfobyid.employeeInfo;

      this.empinobj = this.basicInfoDetails;
      //console.log("this.basicUnitObj", this.empinobj);
    })
  }
  getgender() {
    var genderinfo = {

      "gender": [
        {

        }
      ],

      "transactionType": "getall"
    }
    this.hrms.getGenderinfo(genderinfo).subscribe(res => {
      this.empgender = res;
      this.empgenderinfo = this.empgender.genderList;
      //console.log("genderinfogetallllll", this.empgenderinfo);
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
      console.log(this.employee_statuslist);
    })

  }
  getRole() {
    var request = {

      "transactionType": "getAll"
    }

    this.hrms.getEmployeeDesignation(request).subscribe(res => {
      this.getRoleDetails = res;
      this.roleManagemenList = this.getRoleDetails.listDesignation;
      //console.log(this.roleManagemenList, "desination");
    })
  }





  //toscrollTOP

  isShow: boolean;
  topPosToStartShowing = 300;

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  
}
