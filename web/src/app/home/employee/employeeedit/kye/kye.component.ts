import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { HrmsService } from 'src/app/home/services/hrms.service';
import { DataService } from 'src/app/home/services';
import { DomSanitizer } from '@angular/platform-browser';
import { stringify } from '@angular/compiler/src/util';

import * as jspdf from 'jspdf';
@Component({
  selector: 'app-kye',
  templateUrl: './kye.component.html',
  styleUrls: ['./kye.component.scss']
})
export class KyeComponent implements OnInit {
  isEditEnable : boolean = false;
  public eid:any;
    loggeduser: string;
    bankdetailss1: any;
    bankdata: any;
  responseMessage: any;
  today=new Date();
  karr: any;
  kidd: any;
  emmmm: any;
  ennn: any;
  passppp: any;
  aadimg: any;
  paanii: any;
  pimg: any;
  panig: any;
  aimg: any;
  passreason: any;
  aadharreason: any;
  panreason: any;
  
    onEdit(){
      this.isEditEnable =!this.isEditEnable;
    }
 
  requestobj: String | Blob;
  base64textString: String;
  b: string;
  // sanitizer: any;
  //san:any;
  resobj: any;
  pass_img: any;
  pass_img1: any;
  pass_img2: any;
  empre: Object;
  emper: Object;
  emper1: Object;
  emper2: Object;
  emperr:Object;
  emperr1:Object;
  Accesspass: any;

  constructor(private hrms: HrmsService, private dataservice: DataService, protected sanitizer: DomSanitizer) {
    this.getEmpKye();
    this.getempdata();
    this.eid = this.dataservice.paramId;
    this.loggeduser = localStorage.getItem('UserName');
  }
rolemanagerflag:boolean=true;
  role;
  hide = false;
  emphide = false;
  setUserRole;

  
  ngOnInit() {
    this.getempdata();
    this.transform();
    this.getbankdetails();
    this.getEmpKye();
    this.getPassportCenter();
   

    this.role = localStorage.getItem("Role");
    if (this.role == "ROLE_HR") {
      this.hide = true;
    }
    if (this.role == "ROLE_USER") {
      this.emphide = true;
    }
    if (this.role == "ROLE_MANAGER") {
      this.rolemanagerflag = false;
    }
    this.setUserRole = localStorage.getItem("setUserRole");
    console.log('role to check user', this.setUserRole);
    if (this.setUserRole == "true") {
      this.rolemanagerflag = true;
      this.emphide = true;
      this.hide=false;
    }

  }
addonboard=true;
board;
onb;
  onAddOnboard(){
    this.addonboard=!this.addonboard;
    this.isEditEnable=false;
    this.board=true;
    this.onb=false;
  }




  pass = true;
  empbasic: any;
  empbasicinfo: any;
  getempdata() {

    var empinfo =
    {

      "employeeInfo": [{
        "employeeId": this.eid

      }],
      "transactionType": "getbyid"

    }
    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;

      this.empbasicinfo = this.empbasic.employeeInfo;

      console.log("emp basic", this.empbasic);
    })
  }
  //---Employee KYE details starts--------------

  //--- getting Employee KYE details-------------------
  Location: any;
  empkye: any;
  empkyearr: any;
  savepassport: any;
  Access: boolean;
  Access1: boolean;
  Access2: boolean;
  Access3:boolean;
  getEmpKye() {

    var reqObj =
    {
      "kye":
        [{
          "employee_Id": this.eid,

        }],
      "transactionType": "getAll"
    }
    // {
    //         "kye" :
    //         [{

    //         }],
    //         "transactionType"     :  "getAll"
    // }
    var kyevalue: boolean = true;
    this.hrms.getEmployeeKyeDetails(reqObj).subscribe(res => {
      this.empkye = res;

      this.empkyearr = this.empkye.kyeList;
      this.karr=this.empkyearr[this.empkyearr.length-1];
      this.kidd=this.karr.id;

      console.log("bashaaa",this.karr);
      this.passppp=this.karr.passport_img;
      this.aadimg=this.karr.aadhar_img;
      this.paanii=this.karr.pan_img;


      this.Access = this.empkyearr[0].passport_status;
      this.Access1 = this.empkyearr[0].aadhar_status;
      console.log("aaaadhar_status", this.Access1)
      this.Access2 = this.empkyearr[0].pan_status;
      console.log("pan_status",this.Access2);

      if (this.empkyearr.length > 0) {
        kyevalue = false;
      }
      else {
        kyevalue = true;
      }

      // for (let i = 0; i <= this.empkyearr.length; i++) {
      //   for (let j = 0; j < this.passportCenterList.length; j++) {
      //     if (this.passportCenterList[j].id == this.empkyearr[i].place_of_issue) {
      //       this.savepassport = this.passportCenterList[j].centerName;
      //       console.log("Loop for Place");
      //       console.log(this.savepassport);
      //     }
      //   }
      //   this.empkyearr[i].place_of_issue = this.savepassport;
      // }


    })
  }


  //-- Getting Passport Deatails -------------
  passportCenterDetails: any;
  passportCenterList: any;
  passport: any;
  sample: any;
  getPassportCenter() {
    var request =
    {
      "passportList": [
      ],

      "sessionId": "323",
      "transaactionType": "getall"
    }
    this.hrms.getPassportCeneter(request).subscribe(res => {
      this.passportCenterDetails = res;
      //this.sample= this.passportCenterDetails.passportList;
      this.passportCenterList = this.passportCenterDetails.passportList;
      console.log("placessssssssss",this.passportCenterList);
    })
  }


  //num = this.passport.id



  //-- Getting Passport Deatails -------------


  //--- saving Employee KYE details-------------------
  savekyeres: any;
  savekyeresarr: any;
  kYE_Type: any;
  uan: any;
  kYE_address: any;
  passport_no: any;
  passport_date_of_Issue: any;
  
  passport_date_of_expiry: any;
  place_of_issue: any;
  passport_address: any;
  employee_Id: any;
  status: boolean;
  //created_by:any;
  value: boolean
  aadhar_address: any;
  pan_number: any;
  aadhar_number: any;
  files: any;
  aadharfile: any;
  passportfile: any
  panfile: any;

  passport_img: any;
  pan_img: any;
  aadhar_img: any;

  savereqObj: any;


  saveEmpKye() {



    this.savereqObj =
      {
        "kye": [{
          "id": this.eid,
          "kYE_Type": this.empkyedetails.kYE_Type,
          "uan": this.empkyedetails.uan,
          "kYE_address": this.empkyedetails.kYE_address,
          "passport_no": this.empkyedetails.passport_no,
          "passport_date_of_Issue": this.empkyedetails.passport_date_of_Issue,
          "passport_date_of_expiry": this.empkyedetails.passport_date_of_expiry,
          "place_of_issue": this.empkyedetails.place_of_issue,
          "passport_address": this.empkyedetails.passport_address,
          "employee_Id": this.eid,
          "created_by": this.loggeduser,
          "passport_img": this.passport_img,
          "pan_img": this.panfile,
          "aadhar_img": this.aadharfile,
          "aadhar_address": this.empkyedetails.aadhar_address,
          "pan_number": this.empkyedetails.pan_number,
          "aadhar_number": this.empkyedetails.aadhar_number,
          "passport_status": false,
          "aadhar_status":false,
          "pan_status": false


        }],
        "transactionType": "save"
      }
    //console.log("anusha" + this.empkyedetails.place_of_issue);
    this.empkyearr = this.savereqObj.kye;
    console.log("ansu", this.savereqObj);
    if (this.empkyedetails.passport_date_of_Issue <= this.empkyedetails.passport_date_of_expiry) {
      this.hrms.saveEmployeeKyeDetails(this.savereqObj).subscribe(res => {
        this.savekyeres = res;
        console.log("sssssssssssss", this.savekyeres);


        if (this.savekyeres.message == "Mail sent successfully") {
          console.log(this.savekyeres.message,"praneethhhhhhhhhhhhhh");
          swal(this.savekyeres.message, "", "success");
          this.getEmpKye();
        }
        // this.getEmpKye();
      },
        err => { console.log(err) }

      )
    }

    else {
      this.getEmpKye();
      swal("Enter the valid Date of expiry", "", "error");
    }
  }

  panfileSelected(event) {

    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this.panHandleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);

  }

  panHandleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.panfile = btoa(binaryString);

    console.log(" Pan Image Data***:", this.panfile);

  }

  aadharfileSelected(event) {

    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this.aadharHandleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }

  aadharHandleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.aadharfile = btoa(binaryString);
    console.log("Aadhar Image Data***:", this.aadharfile);

  }

  passportfileSelected(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this.passportHandleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }

  passportHandleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.passport_img = btoa(binaryString);
    // console.log("Passport Image Data***:", this.passport_img);

  }

  transform() {
    var c = this.sanitizer.bypassSecurityTrustResourceUrl(this.b);
    return c;
  }



  //--- deleting Employee KYE details-------------------
  deleteKye; any;
  deleteKyearr: any;
  isCreated: boolean = false
  deleteEmpKye(kye) {
    var deleteReqKye =
    {
      "kye": [{
        "id": kye.id,

        "updated_by": this.loggeduser
      }],
      "transactionType": "delete"
    }

    this.hrms.deleteEmployeeKyeDetails(deleteReqKye).subscribe(res => {
      this.deleteKye = res;
      console.log(this.deleteKye);
      this.deleteKyearr = this.deleteKye.kye;

      if (this.deleteKye.message == "record deleted successfully") {
        swal(this.deleteKye.message, "", "success");
        this.getEmpKye();
      }
      this.getEmpKye();
    })
  }

  //--- Updating Employee KYE details-------------------

  editkye: any;
  editkyearr: any;
  kye: any;
  isUpdate: boolean


  addeditkye(newUserFormKye) {
    newUserFormKye.reset();
    this.isUpdate = false;
    this.isCreated = true;

  }

  public empkyedetails =
    {
      "id": "",
      "kYE_Type": "",
      "uan": "",
      "kYE_address": "",
      "passport_no": "",
      "passport_date_of_Issue": "",
      "passport_date_of_expiry": "",
      "place_of_issue": "",
      "passport_address": "",
      "employee_Id": "",
      "created_by": "",
      "updated_by": "",
      "updated_date": "",
      "passport_img": "",
      "pan_img": "",
      "aadhar_img": "",
      "aadhar_address": "",
      "pan_number": "",
      "aadhar_number": "",
      "passport_status": "",
      "aadhar_status": "",
      "pan_status": ""


    }


  //----edit kye details----------------------------------------------------
  editkyeDetails: any;
  editkyebyid(kye) {
    this.isUpdate = true;
    this.isCreated = false;
    var kyeid = kye.id;
    var editempkyeobj =
    {
      "kye": [{
        "id": kyeid

      }],
      "transactionType": "getAll"
    }

    this.hrms.editEmployeeKyeDetails(editempkyeobj).subscribe(res => {
      this.editkye = res;
      this.editkyeDetails = this.editkye.kyeList;
      this.empkyedetails = this.editkyeDetails[0];
      console.log("this.empkyedetails", this.empkyedetails);

    })
  }

  //----update kye details----------------------------------------------------
  updatekyeres: any;
  updatekyeresarr: any;

  updatekye() {

    var updatekyereq =
    {
      "kye": [

      {
        "id": this.kidd,
        "kYE_Type":this.empkyearr[0].kYE_Type,
        "uan":this.empkyearr[0].uan,
        "kYE_address":this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id":  this.empkyearr[0].employee_Id,
        "flag": true,
        "created_by": "18162",
        "passport_img": this.passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": this.empkyearr[0].passport_status,
        "aadhar_status": this.empkyearr[0].aadhar_status,
        "pan_status": this.empkyearr[0].pan_status,
    }
    
    
    
    
    
    ],
      "transactionType": "update"
    }
    // console.log("kesh mmmmmmmm",updatekyereq);
    // debugger;
    
   
    // this.pass_img = updatekyereq.kye;
    // this.pimg=this.pass_img[0].passport_img;
    // console.log("pass img", this.pass_img[0].passport_img);
    this.karr=updatekyereq.kye;
    if (updatekyereq.kye[0].passport_img != null) {
      this.hrms.updateEmployeeKyeDetails(updatekyereq).subscribe(updateres => {
      this.emmmm=updateres;



        if (this.emmmm.message == "record updated successfully") {
          swal(this.emmmm.message, "", "success");
          this.pass = false;
          this.getEmpKye();

        }

      },
        err => { console.log(err) }
      )
    }
    else {
      swal("Enter the valid Date of expiry", "", "error")
      this.getEmpKye();
    }

  }



  //update pan
  updatekyePan() {

    var updatekyereq1 =
    {
      "kye": [{
        "id": this.kidd,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.panfile,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "pan_status": this.empkyearr[0].pan_status

      }],
      "transactionType": "update"
    }


    // console.log("hello", updatekyereq1);
    // this.pass_img1 = updatekyereq1.kye;
    // this.panig=this.pass_img1[0].pan_img;
    // console.log("pass img", this.pass_img1[0].pan_img);
    this.karr=updatekyereq1.kye;
    if (updatekyereq1.kye[0].pan_img != null) {
      this.hrms.updateEmployeeKyeDetails(updatekyereq1).subscribe(updateres => {
        this.empkyearr =  updateres;

       
        
        if (this.empkyearr.message == "record updated successfully") {
          swal(this.empkyearr.message, "", "success");

          this.pass = false;
          this.getEmpKye();

        }

      },
        err => { console.log(err) }
      )
    }
    else {
      swal("Enter the valid Date of expiry", "", "error")
      this.getEmpKye();
    }

  }

  //Update Aadhar 
  updatekyeAadhar() {

    var updatekyereq2 =
    {
      "kye": [{
        "id": this.kidd,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "aadhar_img": this.aadharfile,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "aadhar_status": this.empkyearr[0].aadhar_status
      }],
      "transactionType": "update"
    }


    // console.log("hello", updatekyereq2);
    // this.pass_img2 = updatekyereq2.kye;
    // this.aimg=this.pass_img2[0].aadhar_img;
    // console.log("pass img", this.pass_img2[0].aadhar_img);
    this.karr=updatekyereq2.kye;
    if (updatekyereq2.kye[0].aadhar_img != null) {
      this.hrms.updateEmployeeKyeDetails(updatekyereq2).subscribe(updateres => {

        console.log("updated successfully")
        this.empkyearr[0] = updateres;

        this.empkyearr = this.empkyearr[0];
      


        if (this.empkyearr.message == "record updated successfully") {
          swal(this.empkyearr.message, "", "success");

          this.pass = false;
          this.getEmpKye();

        }

      },
        err => { console.log(err) }
      )
    }
    else {
      swal("Enter the valid Date of expiry", "", "error")
      this.getEmpKye();
    }

  }




 

  //Update passport status 
  acceptpass() {


    var upAcess =
    {
      "kye": [{
        "id": this.empkyearr[0].id,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "updated_date": this.empkyearr[0].updated_date,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": true,
        "aadhar_status": this.empkyearr[0].aadhar_status,
        "pan_status": this.empkyearr[0].pan_status
      }],
      "transactionType": "update"
    }
   

    console.log("update passport status", upAcess);
  
    if (upAcess.kye[0].passport_status != null) {
      this.hrms.updateEmployeeKyeDetails(upAcess).subscribe(updateres => {
      
       console.log("updated successfully passport status")
        this.emper = updateres;
        if(this.emper){
          this.getEmpKye();
        }
      })

    }

  }




  declinepass() {
    var upAcess3 =
    {
      "kye": [{
        "id": this.empkyearr[0].id,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "updated_date": this.empkyearr[0].updated_date,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": false,
        "aadhar_status": this.empkyearr[0].aadhar_status,
        "pan_status": this.empkyearr[0].pan_status,
        "rejectreason":this.passreason
      }],
      "transactionType": "update"
    }
   
    console.log("deline passport status", upAcess3);

    if (upAcess3.kye[0].passport_status != null) {
      this.hrms.updateEmployeeKyeDetails(upAcess3).subscribe(updateres => {
        //debugger;
      console.log("passport status : declined")
        this.emper = updateres;
        if(this.emper){
          this.getEmpKye();
        }
   
      }, err => console.log(err))

    }
  }

  //Update aadhar status 
  acceptAadhar() {


    var upAcess1 =
    {
      "kye": [{
        "id": this.empkyearr[0].id,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "updated_date": this.empkyearr[0].updated_date,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": this.empkyearr[0].passport_status,
        "aadhar_status": true,
        "pan_status": this.empkyearr[0].pan_status
      }],
      "transactionType": "update"
    }


    console.log("accept aadhar status", upAcess1);

    if (upAcess1.kye[0].aadhar_status != null) {
      this.hrms.updateEmployeeKyeDetails(upAcess1).subscribe(updateres1 => {

        this.emper1 = updateres1;
        if(this.emper1){
          this.getEmpKye();
        }
        console.log("response of aadhar status", this.emper1);
        this.Access1 = true;



      }, err => console.log(err))

    }

  }


  declineAadhar(){
    var upAcess4 =
    {
      "kye": [{
        "id": this.empkyearr[0].id,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "updated_date": this.empkyearr[0].updated_date,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": this.empkyearr[0].passport_status,
        "aadhar_status": false,
        "pan_status": this.empkyearr[0].pan_status,
        "rejectreason":this.aadharreason
      }],
      "transactionType": "update"
    }
    //console.log("aaaaaaaaaaaa"+updatekyereq.kye[0].passport_img);
    //  console.log(updatekyereq.kye[0].passport_img)

    console.log("decline aadhar status", upAcess4);

    if (upAcess4.kye[0].aadhar_status != null) {
      this.hrms.updateEmployeeKyeDetails(upAcess4).subscribe(updateress => {
        
        //debugger;
        // console.log("updated successfully")
        this.emperr = updateress;
        if(this.emperr){
          this.getEmpKye();
        }
       
      }, err => console.log(err))

    }
  }

  //Update pan status 
  acceptpPan() {


    var upAcess2 =
    {
      "kye": [{
        "id": this.empkyearr[0].id,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "updated_date": this.empkyearr[0].updated_date,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": this.empkyearr[0].passport_status,
        "aadhar_status": this.empkyearr[0].aadhar_status,
        "pan_status": true
      }],
      "transactionType": "update"
    }


    console.log("pan_status", upAcess2);

    if (upAcess2.kye[0].aadhar_status != null) {
      this.hrms.updateEmployeeKyeDetails(upAcess2).subscribe(updateres2 => {

        this.emper2 = updateres2;
        this.getEmpKye();

        console.log("response", this.emper2);
        this.Access2 = true;



      }, err => console.log(err))

    }

  }


  declinePan(){
    console.log("razak",this.empkyearr)
    var upAcess5 =
    {
      "kye": [{
        "id": this.empkyearr[0].id,
        "kYE_Type": this.empkyearr[0].kYE_Type,
        "uan": this.empkyearr[0].uan,
        "kYE_address": this.empkyearr[0].kYE_address,
        "passport_no": this.empkyearr[0].passport_no,
        "passport_date_of_Issue": this.empkyearr[0].passport_date_of_Issue,
        "passport_date_of_expiry": this.empkyearr[0].passport_date_of_expiry,
        "place_of_issue": this.empkyearr[0].place_of_issue,
        "passport_address": this.empkyearr[0].passport_address,
        "employee_Id": this.empkyearr[0].employee_Id,
        "updated_by": this.eid,
        "updated_date": this.empkyearr[0].updated_date,
        "aadhar_address": this.empkyearr[0].aadhar_address,
        "aadhar_img": this.empkyearr[0].aadhar_img,
        "passport_img": this.empkyearr[0].passport_img,
        "pan_img": this.empkyearr[0].pan_img,
        "pan_number": this.empkyearr[0].pan_number,
        "aadhar_number": this.empkyearr[0].aadhar_number,
        "passport_status": this.empkyearr[0].passport_status,
        "aadhar_status": this.empkyearr[0].aadhar_status,
        "pan_status": false,
        "rejectreason":this.panreason
      }],
      "transactionType": "update"
    }
    //console.log("aaaaaaaaaaaa"+updatekyereq.kye[0].passport_img);
    //  console.log(updatekyereq.kye[0].passport_img)

    console.log("declined pan status", upAcess5);

    if (upAcess5.kye[0].pan_status != null) {
      this.hrms.updateEmployeeKyeDetails(upAcess5).subscribe(updateresponse => {
        
        //debugger;
        // console.log("updated successfully")
        this.emperr1 = updateresponse;
        if(this.emperr1){
          this.getEmpKye();
        }
       
      }, err => console.log(err))

    }
  }



  downloadpp() {
    let data = this.empkyearr[0].passport_img
    var filepdf = 'data:image/png;base64,' + data;
    let a = document.createElement('a');
    a.href = filepdf;
    a.download = 'passport';
    a.click();
  }

  downloadAd() {
    let data = this.empkyearr[0].aadhar_img
    var filepdf = 'data:image/png;base64,' + data;
    let a = document.createElement('a');
    a.href = filepdf;
    a.download = 'Aadhar';
    a.click();
  }
  downloadpan() {
    let data = this.empkyearr[0].pan_img
    var filepdf = 'data:image/png;base64,' + data;
    let a = document.createElement('a');
    a.href = filepdf;
    a.download = 'pan';
    a.click();
  }




  //---- KYE details  Ends----------------------------------------------

  deleteRes: any;
  employee_bankdetails: any;
  bankdt: any;
  bankuppdate: any;
  banksave: any;
  bank_name: any;
  bank_city: any;
  bank_branch: any;
  bank_ifsc_code: any;
  bank_account_status: any;
  is_active: boolean;
  employee_id: any;
  created_by: any;
  is_bank_update: boolean;
  is_bank_save: boolean;
  employee_bankdetailsById: any;
  bank_details: any;
  updateRes: any;
  isupdateDependent: any;
  createdByDependent: any;

  //bank details starts 


  public bankdetailss = {
    "id": "",
    "bank_account_no": "",
    "bank_name": "",
    "bank_city": "",
    "bank_branch": "",
    "bank_ifsc_code": "",
    "bank_account_status": "",
    "employee_id": "",
    "is_active": "",
    "created_by": "",
    "updated_by": ""
  }
doo;
bankcancel(){
  this.getbankdetails();
  this.addonboard=true;
}
  getbankdetails() {
    this.onb=true;
    var bankdetails =
    {
      "bankDetails": [{

        "employee_id": this.eid

      }
      ],
      "transactionType": "getall"
    }
    //  {
    //   "bankDetails":[

    //   ],
    // "transactionType":"getall"

    // }
    var bankvalue: boolean = true;
    this.hrms.getbankserverdetails(bankdetails).subscribe(response => {
      this.employee_bankdetails = response;
      console.log("BANK DETAILSdvsggdgdg ", this.employee_bankdetails);
      this.bankdetailss1 = this.employee_bankdetails.listBankDetails;
      this.bankdata = this.bankdetailss1[0];
      console.log("BANK", this.bankdata);
      if(this.bankdata.bank_account_no==null){
        this.addonboard=true;
  this.doo=false;
}
else{
  this.addonboard=false;
  this.doo=true;
}
      console.log("sssssssssssssssss bank", this.bankdata.length);
      if (this.bankdata.length > 0) {
        bankvalue = false;
      }
      else {
        bankvalue = true;
      }

    })
  }

  getbankdetailsbyId(bank) {

    this.isupdateDependent = true;
    this.createdByDependent = false;
    var bbid = bank.id;
    var bankdetailsByid = {
      "bankDetails": [{
        "id": bbid

      }],
      "transactionType": "getall"

    }
    this.hrms.getbankserverdetails(bankdetailsByid).subscribe(response => {
      this.employee_bankdetailsById = response;
      this.bank_details = this.employee_bankdetailsById.listBankDetails;
      this.bankdetailss = this.bank_details[0]
      console.log("this.bankdetailss", this.bankdetailss);

    })
  }

  // Add Bank details Button 

  AddBank(newUserFormBank) {
    newUserFormBank.reset();
    this.createdByDependent = true;
    this.isupdateDependent = false;
  }


  Onsavebank(dtl) {


    var savebank =

    {
      "bankDetails": [{
        "bank_account_no": dtl.account_no,
        "bank_name": dtl.bankname,
        "bank_city": dtl.city,
        "bank_branch": dtl.branch,
        "bank_ifsc_code": dtl.ifsccode,
        "bank_account_status": "Active", //this.bankdetailss.bank_account_status
        "employee_id": this.eid,
        "is_active": dtl.isactive,
        "created_by": this.loggeduser
      }

      ],
      "transactionType": "save"
    }
    this.onb=true;
    this.hrms.savebankdetails(savebank).subscribe(response => {
      this.employee_bankdetails = response;
      console.log("resp of save",this.employee_bankdetails);

      this.getbankdetails();
      if (this.employee_bankdetails.message == "BankDetails record is saved Successfully") {
        swal(this.employee_bankdetails.message, "", "success");

      }
      this.getbankdetails();
    })
  }
  deletebanktddetails(bank) {
    var delebank = {
      "bankDetails": [{
        "id": bank.id
      }

      ],
      "transactionType": "delete"
    }
    this.hrms.savebankdetails(delebank).subscribe(res => {
      this.deleteRes = res;
      if (this.deleteRes.message == "BankDetails record is deleted Successfully") {
        swal(this.deleteRes.message, "", "success");
        //this.getbankdetails();
      }
      this.getbankdetails();
    })
  }


  updatebankInfo() {

    var card2 = {
      "bankDetails": [{
        "id": this.bankdata.id,
        "bank_account_no": this.bankdata.bank_account_no,
        "bank_name": this.bankdata.bank_name,
        "bank_city": this.bankdata.bank_city,
        "bank_branch": this.bankdata.bank_branch,
        "bank_ifsc_code": this.bankdata.bank_ifsc_code,
        "bank_account_status": this.bankdata.bank_account_status,
        "employee_id": this.bankdata.employee_id,
        "is_active": this.bankdata.is_active,
        "created_by": this.loggeduser


      }

      ],
      "transactionType": "update",

    }
    console.log("result", card2);
    this.hrms.updatebankdetails(card2).subscribe(res => { 
      this.responseMessage = res;
      if(this.responseMessage.message ==  "BankDetails record is updated Successfully"){
        swal(this.responseMessage.message,"","success"); 
      } 
      else{
        swal(this.responseMessage.message,"","error");
      }
    });

  }

  updatebankdetails() {
    var user = "user";
    var updatebankdetails = {
      "bankDetails": [{
        "id": this.bankdetailss.id,
        "bank_account_no": this.bankdetailss.bank_account_no,
        "bank_name": this.bankdetailss.bank_name,
        "bank_city": this.bankdetailss.bank_city,
        "bank_branch": this.bankdetailss.bank_branch,
        "bank_ifsc_code": this.bankdetailss.bank_ifsc_code,
        "bank_account_status": this.bankdetailss.bank_account_status,
        "employee_id": this.bankdetailss.employee_id,
        "is_active": this.bankdetailss.is_active,
        "created_by": this.loggeduser


      }

      ],
      "transactionType": "update"
    }
    this.hrms.updatebankdetails(updatebankdetails).subscribe(res => {
      this.updateRes = res;

      if (this.updateRes.message == "BankDetails record is updated Successfully") {
        swal(this.updateRes.message, "", "success");
        this.getbankdetails();
      }
      this.getbankdetails();
    })

  }
  declinepassport(modalform){
 this.passreason=modalform.value.uname;
  console.log("passreason :",this.passreason)
  swal("Passport is declined", `Due to : ${this.passreason}`, "success");
}
declineAadharreason(modalform){
  this.aadharreason=modalform.value.uname;
   console.log("Aadharreason :",this.aadharreason)
   swal("Aadhar is declined", `Due to : ${this.aadharreason}`, "success");
 }
 declinepanreason(modalform){
  this.panreason=modalform.value.uname;
   console.log("panreason :",this.panreason)
   swal("Pan is declined", `Due to : ${this.panreason}`, "success");
 }
}

//bank details ends

