import { Component, OnInit } from '@angular/core';
import { HrmsService } from '../../../services/hrms.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/home/services';
import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss']
})
export class ResignationComponent implements OnInit {
  ddddd: any;
  date: Date;
  date1: Date;
  d: number;
  [x: string]: any;
  output: any;
  eid:string;
  ippr:any=5
  updateResignationList=[];
  updateEmpid;
  upemailId1;
  upemailId2;
  upemailId4
  upemailId3;
  upemployeeIsDeceased;
  upfinalSettlementDate;
  upid;
  upleavingDate;
  upleavingReason;
  upremarks;
  upresignationSubmittedOn;
  upresignationTyp;
  upstate;
  role:any;
  constructor(private hrms: HrmsService,private fb:FormBuilder,private dataservice: DataService) { 
    this.eid=this.dataservice.paramId;
    console.log(this.eid,"    this is in construcrto ",this.dataservice.paramId)
  }

  leavingDate1:Date;
  resignationSubmittedOn1:any;
  finalSettlementDate1s:any;
  resignationmodifies:any;
  finalSettlementsmodifies:any;
  leaingreasoninfo;

setUserRole;

  maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  minDate = moment().subtract(118, 'years').format('YYYY-MM-DD');
  formList:FormGroup;
  ngOnInit() {

    this.getResignationDetails();
    this.getSeperationType();
    this.resignationGetByEmpId();
    this.abc();
    this.fn();
   
    this.setUserRole = localStorage.getItem("setUserRole");
    console.log('role to check user', this.setUserRole);
    if (this.setUserRole == "true") {
      this.roleUser=true;
    }


 


    this.formList=new FormGroup({
      //employeeIsDeceased:new FormControl('',Validators.required),
      // dateOfDemise:new FormControl('',Validators.required),
      leavingDate:new FormControl('',Validators.required),
      resignationSubmittedOn:new FormControl('',Validators.required),
      finalSettlementDate:new FormControl('',Validators.required),
      resignationType:new FormControl('',Validators.required),
      Remarks:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required)
    })
    this.leavingDate1=new Date();
     this.leavingDatemodifies=this.leavingDate1.toISOString().split("T")[0];
    

     this.resignationSubmittedOn1=new Date(Date.now() + (30 * 24 * 60 * 60 * 1000));
     this.resignationmodifies=this.resignationSubmittedOn1.toISOString().split("T")[0];

     this.finalSettlementDate1=new Date(Date.now() + (45 * 24 * 60 * 60 * 1000));
    this.finalSettlementsmodifies= this.finalSettlementDate1.toISOString().split("T")[0];
  }

  hidetothank=true;
  a1;
  saveResignationDetailsadv(a){
    
 
  console.log("leaving reason",a);
  this.a1=a
    var req = {
        
      "resignation":[
          {
            "employeeId":this.loc,
            "dateOfDemis": null,
            "emailId1": "narayana.jadapally@ojas-it.com",
            "emailId2": "shiva@gmail.com",
            "emailId3": "naveen@gmail.com",
            "emailId4": "sri@gmail.com",
            "employeeIsDeceased":" false",
            "finalSettlementDate":  this.finalSettlementsmodifies,
            "id": 2,
            "leavingDate":  this.leavingDatemodifies,
            "leavingReason": a.leavingreason,
            "remarks": "nice",
            "resignationSubmittedOn":  this.resignationmodifies,
            "resignationType": "2",
            "state": "applied"
              }],
          "transactionType":"save"
  }
  console.log(req,"lkjhgfdsa")
  this.hrms.saveResignation(req).subscribe(res =>{console.log(res,"this is from resignarion of narayana")
  this.saveres=res;
  if(this.saveres.message=="Successfully record added"){
    swal(this.saveres.message,"","success");
    

  }
   this.getResignationDetails();
   
  })
   
  }




  flag:any;
  user:any;
  id: any;
  EmployeeId: any;
  Remarks: any;
  resignationType: any;
  leavingReason: any;
  emailId1: any;
  emailId2: any;
  emailId3: any;
  emailId4: any;
  employeeIsDeceased: any;
  dateOfDemise: any;
  leavingDate: any;
  resignationSubmittedOn: any;
  finalSettlementDate: any;
  access:boolean = false;
  use: any;
  list: any;
  n: any;
  useSep: any;
  sepList: any;
  isEditable:boolean;
state:any;




  fn(){
    this.user = this.fb.group({
      // EmployeeId:['',Validators.required],
      // resignationType:['',Validators.required],
      leavingReason:['',Validators.required],
     // employeeIsDeceased:['',[Validators.required]],
     // dateOfDemise:['',[Validators.required]],
      // leavingDate:['',Validators.required],
      // resignationSubmittedOn:['',Validators.required],
      // finalSettlementDate:['',Validators.required],
    //   Remarks:['',Validators.required],
    //  state:['',Validators.required ]
    });
  }








  loc:string=localStorage.getItem("UserName");




  getSeperationType() {
    var reqSep = {
      "separationType": [

      ],
      "sessionId": "1234",
      "transactionType": "getall"
    }

    this.hrms.getSeperationType(reqSep).subscribe(res => {
      this.useSep = res;
      this.sepList = this.useSep.separationTypeList;

      console.log(this.sepList, "seperation type getall");
    })
  }
  getResignationDetails() {

    var req1= {
      "resignation": [
        {

        }],
      "transactionType": "getall"
    }
    this.hrms.getResignation(req1).subscribe(res => {
      this.use = res;
      this.output = this.use.resignationList;
      console.log(this.output);
      console.log(this.use + " this  in resignation");
      this.list = this.use.resignationList;
      //  this.n = this.list.map(x=>x.emailId1);
      //  console.log(this.n, "  all ids")
      console.log(this.list, " this  in from narayana");
      


    })
  }
  savResiRes: any;
  saveResList: any;
  saveResignationDetails(us) {
    this.user.controls['resignationType'].markAsTouched();
    this.user.controls['leavingReason'].markAsTouched();
    this.user.controls['leavingDate'].markAsTouched();
    this.user.controls['resignationSubmittedOn'].markAsTouched();
    this.user.controls['finalSettlementDate'].markAsTouched();
   
   this.getResignationDetails();
   

    console.log(this.loc , " in save methis" );
    var req = {
      
      "resignation":[
          {
            "employeeId":this.loc,

             "remarks":"good",
             "resignationType":us.resignationType,
             "leavingReason":us.leavingReason,
         
            // "employeeIsDeceased":us.employeeIsDeceased,
             //"dateOfDemise":us.dateOfDemise,
             "leavingDate":us.leavingDate,
             "resignationSubmittedOn":us.resignationSubmittedOn,
             "finalSettlementDate":us.finalSettlementDate
             
          }],
          "transactionType":"save"
  }

  console.log("request ",req);
    this.hrms.saveResignation(req).subscribe(res => {
      this.savResiRes = res;
      this.saveResList= this.savResiRes.resignationList;

      console.log(this.savResiRes, "save resignation details");


      if(this.saveResList.message=="Successfully record added"){
        swal(this.saveResList.message,"","success");
        
      
      }
      },
      error=> {
        swal("Duplicates are not allowed","","error");
      
      

      //this.getResignationDetails();
    })
  
  }

upList:any;
upResponse:any;
udateResignation(usr) {
  
console.log(this.eid, "")
  console.log(usr," in HR update");
  let reqUp  = 
  {
    "resignation":[
        {
        	"employeeId":this.finaldata[0].employeeId,
        	"id":this.finaldata[0].id,
           "resignationType":this.resignationId,
         "remarks":this.finaldata[0].remarks,
            //"flag":usr.flag,
            "state":usr.state,
           //"employeeIsDeceased":usr.employeeIsDeceased,
          // "dateOfDemise":usr.dateOfDemise,
           "leavingDate":usr.leavingDate,
           "resignationSubmittedOn":usr.resignationSubmittedOn,
           "finalSettlementDate":usr.finalSettlementDate,
           "emailId1":this.finaldata[0].emailId1,
           "emailId2":this.finaldata[0].emailId2,
           "emailId3":this.finaldata[0].emailId3,
           "emailId4":this.finaldata[0].emailId4
        }],
        "transactionType":"update"
}
console.log("sssssssssssssssssssssssssssssss",reqUp);
this.hrms.updateResignation(reqUp).subscribe(res=>{
  this.upResponse= res;
  console.log("update list in updte" ,this.upResponse );
  this.upList=this.upResponse.resignationList;
  console.log(this.upList," upated list ");


if(res){
  swal(this.upResponse.message,"","success");
  this.resignationGetByEmpId();

}
},
error=> {
  swal("Duplicates are not allowed","","error");
  this.resignationGetByEmpId();

})
//this.resignationGetByEmpId();
}

  empIdRes: any;
  empIdResponseList: any;
  empList:any;
  finaldata:any
  resignationId:any
  resignationGetByEmpId() {
    console.log("Eid : ", this.eid);
    
    var req2 = {
      "resignation": [
        {
          "employeeId": this.eid


        }],
      "transactionType": "getbyid"
    }
    this.hrms.getByEmpIdResignation(req2).subscribe(re => {
      this.empIdRes = re;
this.empList=this.empIdRes.resignationList;
this.finaldata=this.empList;
this.resignationId=this.empList[0].resignationType
this.upstate=this.empList[0].state
var rdate=new Date(this.empList[0].resignationSubmittedOn).getFullYear()+"-"+ ((new Date(this.empList[0].resignationSubmittedOn).getMonth() <= 9 ? '0': '') + (new Date(this.empList[0].resignationSubmittedOn).getMonth()))+"-"+((new Date(this.empList[0].resignationSubmittedOn).getDate() <= 9 ? '0': '') + (new Date(this.empList[0].resignationSubmittedOn).getDate()))
var ldate=new Date(this.empList[0].leavingDate).getFullYear()+"-"+ ((new Date(this.empList[0].leavingDate).getMonth() <= 9 ? '0': '') + (new Date(this.empList[0].leavingDate).getMonth()))+"-"+((new Date(this.empList[0].leavingDate).getDate() <= 9 ? '0': '') + (new Date(this.empList[0].leavingDate).getDate()))
var fsdate=new Date(this.empList[0].finalSettlementDate).getFullYear()+"-"+ ((new Date(this.empList[0].finalSettlementDate).getMonth() <= 9 ? '0': '') + (new Date(this.empList[0].finalSettlementDate).getMonth()))+"-"+((new Date(this.empList[0].finalSettlementDate).getDate() <= 9 ? '0': '') + (new Date(this.empList[0].finalSettlementDate).getDate()))
this.finaldata[0].resignationSubmittedOn=rdate
this.finaldata[0].finalSettlementDate=fsdate
this.finaldata[0].leavingDate=ldate
console.log(ldate,"Keshava Reddy");

var sp=this.sepList.find(s=>s.separationTypeId==this.finaldata[0].resignationType)
this.finaldata[0].resignationType=sp.separationType
this.upstate=this.finaldata[0].state
console.log(this.finaldata,  " resignationList getByemployeeId in resignation");
this.updateResignationList=this.empList;
console.log(this.updateResignationList,"this is for updation")
// this.updateEmpid=this.updateResignationList[0].employeeId;
// this.upemailId1=this.updateResignationList[0].emailId1;
// this.upemailId2=this.updateResignationList[0].emailId2;
// this.upemailId3=this.updateResignationList[0].emailId3;
// this.upemailId4=this.updateResignationList[0].emailId4;
// this.upemployeeIsDeceased=this.updateResignationList[0].employeeIsDeceased;
// this.upfinalSettlementDate=this.updateResignationList[0].finalSettlementDate;
// this.upid=this.updateResignationList[0].id;
// this.upleavingDate=this.updateResignationList[0].leavingDate;
// this.upleavingReason=this.updateResignationList[0].leavingReason;
// this.upremarks=this.updateResignationList[0].remarks;
// this.upresignationSubmittedOn=this.updateResignationList[0].resignationSubmittedOn;
// this.upresignationType=this.updateResignationList[0].resignationType;
// this.upstate=this.updateResignationList[0].state;

 
 
    })
  }
roleUser:boolean=false;
abc():boolean{
    if(localStorage.getItem("Role")=="ROLE_USER")
    {
      return this.roleUser=true;
    }
  console.log(this.loc, " user ema");
  console.log("deddddddddddddddddddddd",this.roleUser);
}

da(f){
  
   this.date = new Date(f);
  this.d = this.date.setDate(this.date.getDate() + 90);
  this.date1  = new Date(this.d);
  console.log(this.date1);
}

is_edit:boolean=true;







foo:any;
fo:any;


edit(h){
  console.log("jjjjjj",h);
  //this.foo = false;
  //this.fo=true;
  // this.h.setValue({
  //   employeeIsDeceased:this.employeeIsDeceased,
  //   dateOfDemise:this.dateOfDemise,
  //   leavingDate:this.leavingDate,
  //   resignationSubmittedOn:this.resignationSubmittedOn,
  //   finalSettlementDate:this.finalSettlementDate,
  //   resignationType:this.resignationType
  // })
  

this.EmployeeId=h.employeeId;
this.resignationType = h.resignationType;
console.log("resi",this.resignationType);
this.employeeIsDeceased = h.employeeIsDeceased;
//this.dateOfDemise = h.dateOfDemise;
this.leavingDate = h.leavingDate;
this.resignationSubmittedOn = h.resignationSubmittedOn;
this.finalSettlementDate = h.finalSettlementDate;
this.state=h.state;
console.log("this for stateeee",this.state)
console.log("hhhhhhhhhhhhhhhhh",h);
}
}