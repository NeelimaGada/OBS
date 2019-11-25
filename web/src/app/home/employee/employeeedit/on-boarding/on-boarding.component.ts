import { Component, OnInit } from '@angular/core';
import { HrmsService } from '../../../services/hrms.service';
import swal from 'sweetalert';
import { DataService } from 'src/app/home/services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss']
})
export class OnBoardingComponent implements OnInit {
  
  isEditEnable : boolean = false;


  public eid: any;
  loggeduser: string;
  empbasic: any;
  empbasicinfo: any;
  // dt:any;
  // latest_date:any;
  // dateToday=new Date();
  onEdit(){
    this.isEditEnable =!this.isEditEnable;
  }
  constructor(private hrms: HrmsService, private dataservice: DataService) {
    this.eid = this.dataservice.paramId;
    this.loggeduser = localStorage.getItem('UserName');
    this.getEmpRole();
    this.getempdata();
    this.costData = this.getCostCenter();
    console.log('Cost data: ', this.costData);

    this.buData = this.getBu();
    console.log('BU Data : ', this.buData);

    this.sbuData = this.getSbu();
    console.log('sbu Data : ', this.sbuData);

    this.getResource();

    //  this.latest_date =this.date.transform(this.dateToday, 'yyyy-MM-dd');
  }
  costData;
  buData;
  sbuData;
  ngOnInit() {
    
    //this.getboardingdetailsbyId();
    //  this.getSeparation();
    setTimeout(() => this.getboardingdetailsbyId(), 500);
console.log("kkkksdjdzfj",this.onboarddetailsss);
    //this.getemploymentdetails();


    // this.getempdata();

  }
  user: boolean = false;
  getEmpRole() {
    if (localStorage.getItem("Role") == "ROLE_USER")
      this.user = true;
    console.log("Role", this.user);
  
  }

   getCostCenter(){
    var request = {
      "costCenter": [{
      }],
      "transactionType": "get"
    }
    this.hrms.getCostcenter(request).subscribe(res => {
      this.costResp = res;
      this.costCenterList = this.costResp.listOfCostCenter;
      console.log('Cost List : ', this.costCenterList);
    });
   return this.costCenterList;
  }

  getBu() {
    var request = {
      "businessUnit": [{
      }],
      "transactionType": "getAll"
    }
    this.hrms.getBusinesinfo(request).subscribe(resp => {
      this.buDetails = resp;
      this.buList = this.buDetails.businessUnitList;
      console.log('BU Data :', this.buList);
    });
   return this.buList;
  }
  getSbu() {
    var request = {
      "subBusinessUnitModel": [
        {}
      ],
      "transactionType": "getAll"
    }
    this.hrms.getSubbusinessUnit(request).subscribe(respo => {
      this.sbuResp = respo;
      this.sbuList = this.sbuResp.subBusinessUnitList;
      console.log('SBU Data :',this.sbuList);
    });
   return this.sbuList;
  }

  //empbasic:any;
  //empbasicinfo:any;
  //    getempdata(){

  //     var empinfo = 
  //    {

  //      "employeeInfo" :[{
  //            "employeeId" : this.eid

  //      }],
  //      "transactionType" : "getbyid"

  //  }
  //     this.hrms.getempinfo(empinfo).subscribe(res =>{
  //    this.empbasic =res;
  //    this.empbasicinfo= this.empbasic.employeeInfo;
  //     console.log(this.empbasicinfo);
  //     })
  //    }
  //employment details starts
  employmentdetailsss: any;
  onboarding: any
  onboardingdetails: any;
  deleteonboarding: any;

  isupdateDependent: boolean;
  createdByDependent: boolean;
  onboard_details: any;
  onboard_details_by_id: any;
  onboardRes: any;

  //employment details starts
  onboardingdropdown: any;


  getempdata() {
    //this.isupdate=false;
    //this.isupdate=false;
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
      console.log(this.empbasicinfo);
    })
  }
  emptyRecord: boolean;
  getemploymentdetails() {
    var employmentdetailss =
    {
      "employmentDetails": [{
        "employeeId": this.eid
      }],
      "transactionType": "getAll"
    }
    this.hrms.getonboardingdetails(employmentdetailss).subscribe(response => {
      this.employmentdetailsss = response;
      console.log( "EMPLOYEEEMENT DETAILS",this.employmentdetailsss)
      this.onboarding = this.employmentdetailsss.employmentDetailsList;
      
      console.log('Empty Record : ', this.emptyRecord);
      console.log(this.onboarding);
      for (let i = 0; i <= this.onboarding.length; i++) {
        for (let j = 0; j < this.getResourceList.length; j++) {
          if (this.getResourceList[j].id == this.onboarding[i].resourceType) {
            this.onboardingdropdown = this.getResourceList[j].resourceTypeName;
            console.log("Qualification details");
            console.log(this.onboardingdropdown);
          }
        }
        this.onboarding[i].resourceType = this.onboardingdropdown;
        console.log("Final Educational ");
        console.log(this.onboarding);
      }
    });
  }

  //---getSeparation-------------
  separationDetailsList: any;
  separationDetails: any;
  separationTypedropdown: any;
   getSeparation() {
    var requestgetObj =
    {
      "separationType": [
      ],
      "sessionId": "1234",
      "transactionType": "getall"
    }
    this.hrms.getSeperationType(requestgetObj).subscribe(res => {
      this.separationDetails = res;
      console.log(this.separationDetails);
      this.separationDetailsList = this.separationDetails.separationTypeList;
      console.log(this.separationDetailsList);
      for (let i = 0; i <= this.onboarding.length; i++) {
        for (let j = 0; j < this.separationDetailsList.length; j++) {
          if (this.separationDetailsList[j].separationTypeId == this.onboarding[i].separationType) {
            this.separationTypedropdown = this.separationDetailsList[j].separationType;
            console.log("Qualification details");
            console.log(this.separationTypedropdown);
          }
        }
        this.onboarding[i].separationType = this.separationTypedropdown;
        console.log("Separation Type ");
        console.log(this.onboarding);
      }

    })
  }
  //---getSeparation ENDS------------

  saveemploymentdetails() {
    var user = "user";
    var saveemploymentdetailss =
    {
      "employmentDetails": [{
        "employeeId": this.eid,
        "joiningDate": this.onboarddetailsss.joiningDate,
        "resourceType": this.onboarddetailsss.resourceType,
        "bondStatus": this.onboarddetailsss.bondStatus,
        "resignationDate": this.onboarddetailsss.resignationDate,
        "exitDate": this.onboarddetailsss.exitDate,
        "separationType": this.onboarddetailsss.separationType,
        "costCenterId": this.onboarddetailsss.costCenterId,
        "buId": this.onboarddetailsss.buId,
        "sbuId": this.onboarddetailsss.sbuId,
        "createdBy": this.loggeduser
      }],
      "transactionType": "save"
    }
   /*  if (this.onboarddetailsss.joiningDate > this.onboarddetailsss.resignationDate) {
      swal("joining date is greater than exit date");
    } */
   // else {
     console.log('Save Request : ', saveemploymentdetailss);
     
      this.hrms.saveonboardingdetails(saveemploymentdetailss).subscribe(response => {
        this.onboardingdetails = response;
        console.log(this.onboardingdetails);
        if (this.onboardingdetails.statusMessage == "Data is inserted successfully") {
          swal(this.onboardingdetails.statusMessage, "", "success");
          // this.getemploymentdetails();
        }
        //this.getemploymentdetails();
        this.getboardingdetailsbyId();
      }) 
      err => {
        swal(this.onboardingdetails.statusMessage, "", "error");
      }
    //}
    // this.getemploymentdetails();
    // if(this.dt>this.latest_date)
    //    {
    //      alert("please enter valid date");
    //    }

  }

  // Master data for Resourse Type
  getResourceDetails: any;
  getResourceList: any;

  getResource() {
    var getresrequest =
    {
      "resourceTypes": [
        {}
      ],
      "transactionType": "getAll"
    }
    this.hrms.getResourceType(getresrequest).subscribe(res => {
      this.getResourceDetails = res;
      console.log(this.getResourceDetails);
      this.getResourceList = this.getResourceDetails.employmentDetailsList;
      console.log(this.getResourceList);
    })
  }

  deleteOnbording(onboard) {
    var deleteemployee = {
      "employmentDetails": [{
        "id": onboard.id,
        "updatedBy": this.loggeduser
      }],
      "transactionType": "delete"
    }
    this.hrms.deleteOnboardingdetails(deleteemployee).subscribe(res => {
      this.deleteonboarding = res;
      if (this.deleteonboarding.message == "Data is deleted successfully") {
        swal(this.deleteonboarding.message, "", "success");
        this.getemploymentdetails();
      }
    })
  }

onBoardRecord;
  getboardingdetailsbyId() {
    this.isupdateDependent = true;
    this.createdByDependent = false;
    var onboardid = this.eid;
    console.log(onboardid);
    var boardingdetailsbyid = {
      "employmentDetails": [
        {
          "employeeId": this.eid
        }
      ],
      "transactionType": "getALL"
    }

    this.hrms.getonboardingdetails(boardingdetailsbyid).subscribe(response => {
      this.onboard_details = response;
      this.onboarddetailsss = this.onboard_details.employmentDetailsList[0];
      let onList = this.onboard_details.employmentDetailsList;
      this.emptyRecord = (onList.length == 0);
      //this.onBoardRecord = this.onboarddetailsss[0];
      //this.onboarddetailsss = this.onboard_details_by_id[0];
      console.log("this.onboarddetailsss", this.onboarddetailsss);
      
        console.log('Inside if***', this.costCenterList);
//console.log('Cost id : ', this.onboarddetailsss);
        if(this.onboarddetailsss.bondStatus == 'true') {
          this.onboarddetailsss.bondStatus = 'Yes';
        } else {
          this.onboarddetailsss.bondStatus = 'No';
        }
        let cost = this.costCenterList.find(con => con.id == this.onboarddetailsss.costCenterId);
        console.log('Cost Details : ', cost)
        console.log('Cost code : ', cost.costCenterCode);
        this.onboarddetailsss.costCenterId = cost.costCenterCode;
        let bu = this.buList.find(con => con.id == this.onboarddetailsss.buId);
        console.log('BU code : ', bu.businessUnitName);
        this.onboarddetailsss.buId = bu.businessUnitName;
        let sbu = this.sbuList.find(con => con.id == this.onboarddetailsss.sbuId);
        console.log('SBU code : ', sbu.name);
        this.onboarddetailsss.sbuId = sbu.name;
        let resorce = this.getResourceList.find(con => con.id == this.onboarddetailsss.resourceType);
        console.log('Resource Type : ', resorce.resourceTypeName);
        this.onboarddetailsss.resourceType = resorce.resourceTypeName;
        //this.getResourceList;
    });
  }


  updateonboard(){
    var user = user;
    var card1 = {
      "employmentDetails": [{
        "id": this.onboarddetailsss.id,
        "employeeId": this.onboarddetailsss.employeeId,
        "joiningDate": this.onboarddetailsss.joiningDate,
        "resourceType": this.onboarddetailsss.resourceType,
        "bondStatus": this.onboarddetailsss.bondStatus,
     
       
        "costCenterId": this.onboarddetailsss.costCenterId,
        "buId": this.onboarddetailsss.buId,
        "sbuId": this.onboarddetailsss.sbuId,
        "updatedBy": this.loggeduser

      }],

      "transactionType": "update"
    }
  console.log("card2 data",card1);
  
  this.hrms.updateonboardingdetails(card1).subscribe(res=>{console.log("card2 updated info",card1)});

  }




  updateonboardingdetailss() {
    var user = user;
    var updatenboarddetails = {
      "employmentDetails": [{
        "id": this.onboarddetailsss.id,
        "employeeId": this.onboarddetailsss.employeeId,
        "joiningDate": this.onboarddetailsss.joiningDate,
        "resourceType": this.onboarddetailsss.resourceType,
        "bondStatus": this.onboarddetailsss.bondStatus,
        "resignationDate": this.onboarddetailsss.resignationDate,
        "exitDate": this.onboarddetailsss.exitDate,
        "separationType": this.onboarddetailsss.separationType,
        "costCenterId": this.onboarddetailsss.costCenterId,
        "buId": this.onboarddetailsss.buId,
        "sbuId": this.onboarddetailsss.sbuId,
        "updatedBy": this.loggeduser

      }],

      "transactionType": "update"
    }
   console.log("resignation",this.onboarddetailsss.resignationDate)
    this.hrms.updateonboardingdetails(updatenboarddetails).subscribe(res => {
      this.onboardRes = res;
      console.log('Onboard update resp : ', this.onboardRes);
      if (this.onboardRes.statusMessage == "Data is updated successfully") {
        swal(this.onboardRes.statusMessage, "", "success");
        //this.getemploymentdetails();
        //this.getboardingdetailsbyId();
        this.getboardingdetailsbyId();
      }
    })
    //this.getemploymentdetails();
  }

  public onboarddetailsss = {
    "id": "",
    "employeeId": "",
    "joiningDate": "",
    "resourceType": "",
    "bondStatus": "",
    "resignationDate": "",
    "exitDate": "",
    "separationType": "",
    "costCenterId": "",
    "buId": "",
    "sbuId": "",
    "createdBy": "",
    "updatedBy": ""
  }

  // ends onboarding details

  OnSave(newUserFormOnboard) {
    newUserFormOnboard.reset();
    this.createdByDependent = true;
    this.isupdateDependent = false;
  }
  sbuResp;
  costResp;
  buDetails;
  buList;
  sbuList;
  costCenterList
  buDrop;
  sbuDrop;
  selectBu(ev) {
    console.log('Cost selected', ev);
    this.buDrop = this.buList.filter(con => con.costCenterId == ev);
        console.log('BU code : ', this.buDrop);
       // this.onboarddetailsss[0].buId = bu.businessUnitName;
  }
  selectSbu(ev) {
    console.log('Cost selected', ev);
    this.sbuDrop = this.sbuList.filter(con => con.businessUnitId == ev);
        console.log('BU code : ', this.sbuDrop);
       // this.onboarddetailsss[0].buId = bu.businessUnitName;
  }
 
}
