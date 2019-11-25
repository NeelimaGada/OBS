import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import swal from 'sweetalert';
import { HrmsService } from 'src/app/home/services/hrms.service';
import { DataService } from 'src/app/home/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import html2PDF from 'jspdf-html2canvas';
import * as jspdf from 'jspdf';
import * as FileSaver from 'file-saver' 
import * as moment from 'moment';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  today;
  subscription: Subscription;
  message: any;
  public eid: any;
  loggeduser: string;
  emp: any;
  empbasic: any;
  empbasicinfo: any;
  filedata: string;
  pass: boolean;
  role;
  hide: boolean=false;
  emphide: boolean=false;
  pdfs: boolean;
  expereince: any;
  StateList: any;
  statename: any;
  ipppd:any=5;
  sd: any;
  ed: any;
  msg: any;
  Accepted: any;
  Access: boolean;
  employeeExpdetails: any;
  view: boolean;
  reason: any;
  constructor(private hrms: HrmsService, private dataservice: DataService, private paramroute: ActivatedRoute) {
    this.eid = this.dataservice.paramId;
    this.loggeduser = localStorage.getItem('UserName');

    this.today=moment().format('YYYY-MM-DD'); 
    console.log(this.today,"today date expirence");
    this.getStateListDetails();
  }
  // getempId(){

  // }
  rolemanagerflag:boolean=true;
  setUserRole;

  ngOnInit() {
   
    this.getEmpExp();
    this.getProject();
    this.getempdata();

   
    this.pdfs=false;
    this.role=localStorage.getItem("Role");
 
           if(this.role=="ROLE_HR")
           {
           this.hide=true;
           }
             if(this.role=="ROLE_USER")
             {
             this.emphide=true;
             }
             if (this.role == "ROLE_MANAGER") {
              this.rolemanagerflag = false;
            }
            this.setUserRole = localStorage.getItem("setUserRole");
            console.log('role to check user', this.setUserRole);
            if (this.setUserRole == "true") {
              this.rolemanagerflag = true;
              this.emphide=true;
              this.hide=false;
            }

  }
  user: boolean = false;
 

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
      console.log(this.empbasicinfo);
    })
  }
  // ----Employee Experience Details Starts---------------------------------------------
  empexp: any;
  empexpdetails: any;
  saveRes: any;

  //---getting employee details---------------------------------------------------
  getEmpExp() {
    var requestObj =
    {
      "employeeExperienceDetails":[{
	
        "employee_Id": this.eid
   }],
   
   "transactionType":"getById"
    }


    this.hrms.getEmployeeExperienceDetails(requestObj).subscribe(response => {
      this.empexp = response;
      this.empexpdetails = this.empexp.employeeExperienceDetails;
      console.log("Employee Experience data ", this.empexpdetails);

      this.Accepted = this.empexpdetails[0].documentsstatus;
      console.log("Document status value ", this.Accepted);
           
      if(this.Accepted == "Accepted"){
      this.Access = true;
     } else
      this.Access = false;
     
    })
  }

  //---adding employee experience----------------------------------------------------

  company_name: any;
  joining_date: any;
  exit_date: any;
  salary: any;
  //location:any;
  is_current_company: any;
  //employee_Id:any;
  first_Reference_Name: any;
  first_Reference_Contact: any;
  second_Reference_Name: any;
  second_Reference_Contact: any;
  sessionId: any;
  created_date: any;
  updated_date: any;

  booleanValue = true;
  EmpExpArr: any;
  status:any;
  documentstatus:any;
  

  saveEmpExp() {
    var savReqObj =

    {
      "employeeExperienceDetails":

        [
          {
            "company_name": this.editemparrlist.company_name,
            "joining_date": this.editemparrlist.joining_date,
            "exit_date": this.editemparrlist.exit_date,
            "salary": this.editemparrlist.salary,
            "location": this.editemparrlist.location,
            "is_current_company": this.editemparrlist.is_current_company,
            //"is_current_company":1,
            "employee_Id": this.eid,
            "first_Reference_Name": this.editemparrlist.first_Reference_Name,
            "first_Reference_Contact": this.editemparrlist.first_Reference_Contact,
            "second_Reference_Name": this.editemparrlist.first_Reference_Name,
            "second_Reference_Contact": this.editemparrlist.first_Reference_Contact,
            "flag":false,
            "created_by": this.loggeduser,
            "image":this.filedata,
            "experience":2.7,
            "status":false,
           "documentsstatus":this.msg
            
          }
        ],

      "transactionType": "save"
    }

    console.log("Employee Experience save data is", savReqObj);
    if (this.editemparrlist.exit_date > this.editemparrlist.joining_date) {
       this.hrms.saveEmployeeExperienceDetails(savReqObj).subscribe(res => {
        this.saveRes = res;
        this.expereince= this.saveRes.employeeExperienceDetails;
        if (this.saveRes.message == "Employee Experience Details saved successfully") {
          swal(this.saveRes.message, "", "success");
          this.getEmpExp();
        }
      })
    } else {
      swal("Enter valid relieving date!", "", "error");
      this.getEmpExp();
    }
  }


  exfileSelected(evt) {
 
    var files = evt.target.files;
    var file = files[0];
    
    if (files && file) {
    var reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    }
    
   }
    
   handleReaderLoaded(readerEvt) 
   {
     console.log(readerEvt)
    var binaryString = readerEvt.target.result;
    this.filedata = btoa(binaryString);
    //this.filedata.push({i:this.base64textString});
    //this.filedata=this.base64textString;
    console.log(this.filedata);
    
   }
  //---deleting employee experience---------------------------
  deleteres: any;
  details;
  deleteEmpExpArr: any;


  deleteEmpExp(emp) {
    var deleteReqObj =
    {
      "employeeExperienceDetails":
        [{
          "id": emp.id,
          "updated_by": emp.updated_by
        }],
      "transactionType": "delete",
      "sessionId": "any String"
    }
    this.hrms.deleteEmployeeExperienceDetails(deleteReqObj).subscribe(res => {
      this.deleteres = res;

      this.deleteEmpExpArr = this.deleteres.employeeExperienceDetails;
      console.log(this.deleteres);

      if (this.deleteres.message == "EmployeeExperienceDetails deleted sucesfully") {
        swal(this.deleteres.message, "", "success");
        this.getEmpExp();
      }
      //this.getEmpExp();
    })
  }

  //---editing employee experience------------------------------------------
  editemp: any;
  editemparr: any;

  public editemparrlist =
    {
      "id": "",
      "company_name": "",
      "salary": "",
      "location": "",
      "joining_date": "",
      "exit_date": "",
      "is_current_company": "",
      "employee_Id": "",
      "first_Reference_Name": "",
      "first_Reference_Contact": "",
      "second_Reference_Name": "",
      "second_Reference_Contact": "",
      "flag":"",
      "created_by": "",
      "updated_by": "",
      "created_date": "",
      "updated_date": "",
      "image":"",
      "experience":"",
      "status":"",
      "documentsstatus":""
    }

  //--Add Button----------------
  isUpdate: boolean
  isCreated: boolean = false;
  addempexp(newUserFormEmpExp) {
    newUserFormEmpExp.reset();
    this.isUpdate = false;
    this.isCreated = true;

  }


  editempexpbyid(emp) {
    console.log("ssssssssssssss",emp);


    // this.editemparrlist.employee_Id=emp.employee_Id;
    // this.editemparrlist.company_name=emp.company_name;
    // this.editemparrlist.salary=emp.salary;
    // this.editemparrlist.location=emp.location;
    // this.editemparrlist.joining_date=emp.joining_date;
    // this.editemparrlist.exit_date=emp.exit_date;
    // this.editemparrlist.is_current_company=emp.is_current_company;

    // this.editemparrlist.first_Reference_Name=emp.first_Reference_Name;
    // this.editemparrlist.second_Reference_Name=emp.second_Reference_Name;
    // this.editemparrlist.second_Reference_Contact=emp.second_Reference_Contact;
    // this.editemparrlist.updated_by=emp.updated_by;
    // this.editemparrlist.created_by=emp.created_by;
    // this.editemparrlist.created_date=emp.created_date;
    // this.editemparrlist.updated_date=emp.updated_date;

    this.isUpdate = true;
    this.isCreated = false;
    var empid = emp.id;
    var editempexpobj =
    {
      "employeeExperienceDetails": [{
        "id": empid

      }],
      "transactionType": "getById"
      
    }

    this.hrms.editEmpExpDetails(editempexpobj).subscribe(res => {
      this.editemp = res;
      this.editemparr = this.editemp.employeeExperienceDetails;
      this.editemparrlist = this.editemparr[0];
      console.log("this.editemparrlist", this.editemparrlist);

    })
  }



  //---updating employee experience------------------------

  updateres: any;
  updateEmpExpArr: any;
  newUserFormExp: any;



  updateEmpExp() {
// console.log("data",this.empexpdetails);
    var updateReqObj =
    {
      "employeeExperienceDetails":
        [{

          "id": this.empexpdetails[0].id,
          "company_name": this.empexpdetails[0].company_name,
          "joining_date": this.empexpdetails[0].joining_date,
          "exit_date": this.empexpdetails[0].exit_date,
          "salary": this.empexpdetails[0].salary,
          "location": this.empexpdetails[0].location,
          "is_current_company": this.empexpdetails[0].is_current_company,
          //"is_current_company":1,
          "employee_Id": this.eid,
          "first_Reference_Name": this.empexpdetails[0].first_Reference_Name,
          "first_Reference_Contact": this.empexpdetails[0].first_Reference_Contact,
          "second_Reference_Name": this.empexpdetails[0].first_Reference_Name,
          "second_Reference_Contact": this.empexpdetails[0].first_Reference_Contact,
          "flag":false,
          "updated_by": this.loggeduser,
          //"updated_date" :this.empexpdetails[0].updated_date,
          "image": this.filedata,
          "experience":2.5,
          "status": false,
         "documentsstatus": this.msg,
         "rejectreason":this.reason
        }],
      "transactionType": "update"
    
    }
    console.log("Emp Exp update request object is", updateReqObj);
    //if (this.empexpdetails.exit_date > this.empexpdetails.joining_date) {
      this.hrms.updateEmployeeExperienceDetails(updateReqObj).subscribe(res => {
        this.updateres = res;
        this. employeeExpdetails = this.updateres.employeeExperienceDetails;
         //swal(this.updateres.message, "", "success");
          this.getEmpExp();
     })
    // }
    //   else {
    //   swal("Enter valid relieving date!", "", "error");
     
    // }

  }


  download(){
  
    for(let i in this.empexpdetails){
      let data=this.empexpdetails[i].image
      var filepdf = 'data:application/pdf;base64,' + data;
    }
   let a = document.createElement('a');
   a.href = filepdf;
   a.download = 'experince certificates';
   a.click();
  
 }


// Access=false;
  
//  accept(){

//   var updateReqObj1 =
//   {
//     "employeeExperienceDetails":
//       [{

//         "id": this.empexpdetails[0].id,
//         "company_name": this.empexpdetails[0].company_name,
//         "salary": this.empexpdetails[0].salary,
//         "location": this.empexpdetails[0].location,
//         "joining_date": this.empexpdetails[0].joining_date,
//         "exit_date": this.empexpdetails[0].exit_date,
//         "is_current_company": this.empexpdetails[0].is_current_company,
//         "employee_Id": this.empexpdetails[0].employee_Id,
//         "first_Reference_Name": this.empexpdetails[0].first_Reference_Name,
//         "first_Reference_Contact": this.empexpdetails[0].first_Reference_Contact,
//         "second_Reference_Name": this.empexpdetails[0].first_Reference_Name,
//         "second_Reference_Contact": this.empexpdetails[0].first_Reference_Contact,     
//         "created_by":this.empexpdetails[0].created_by,
//         "updated_by": this.loggeduser,
//         "created_date":this.empexpdetails[0].created_date,
//         "updated_date":this.empexpdetails[0].updated_date,
//         "image":this.filedata,
//         "experience":this.empexpdetails[0].experience,
//          "status":true,
//         "documentstatus":true,
//       }],
//     "transactionType": "update"
  
//   }
//   console.log("update request object is",updateReqObj1);
//   if (this.empexpdetails[0].status!=null) {
//     this.hrms.updateEmployeeExperienceDetails(updateReqObj1).subscribe(res => {
//       this.updateres = res;
//       console.log("updated data is",res);
//       if(this.Access==false)
//       this.Access=true;
//       else
//       this.Access=true;
//       this.getEmpExp();
//     })
//   } else {
//      this.getEmpExp();
//   }

  
//  }
//  decline(){
//   console.log("dtaa is ",updateReqObj2);
//   var updateReqObj2 =
//   {
    
//     "employeeExperienceDetails":
//       [{
//         "id": this.empexpdetails[0].id,
//         "company_name": this.empexpdetails[0].company_name,
//         "salary": this.empexpdetails[0].salary,
//         "location": this.empexpdetails[0].location,
//         "joining_date": this.empexpdetails[0].joining_date,
//         "exit_date": this.empexpdetails[0].exit_date,
//         "is_current_company": this.empexpdetails[0].is_current_company,
//         "employee_Id": this.empexpdetails[0].employee_Id,
//         "first_Reference_Name": this.empexpdetails[0].first_Reference_Name,
//         "first_Reference_Contact": this.empexpdetails[0].first_Reference_Contact,
//         "second_Reference_Name": this.empexpdetails[0].first_Reference_Name,
//         "second_Reference_Contact": this.empexpdetails[0].first_Reference_Contact,     
//         "created_by":this.empexpdetails[0].created_by,
//         "updated_by": this.loggeduser,
//         "created_date":this.empexpdetails[0].created_date,
//         "updated_date":this.empexpdetails[0].updated_date,
//         "image":this.filedata,
//         "experience":this.empexpdetails[0].experience,
//         "status":false,
//         "documentstatus":false,
//       }],
//     "transactionType": "update"
  
//   }
//   console.log("update request object is",updateReqObj2);
//   if (this.empexpdetails[0].status!=null) {
//     this.hrms.updateEmployeeExperienceDetails(updateReqObj2).subscribe(res => {
//       this.updateres = res;
//       console.log("updated data is",this.updateres);
//       if(this.Access==false)
//             this.Access=false;
//                 else
//             this.Access=false;
//             this.getEmpExp();
//     })
//   } else {
//      this.getEmpExp();
//   }
  
//  }

 projectDetailsLi:any;
  projectDetails:any;
  projectDetailsList:any;
  projectsave:any;

  valueAdd(newUserFormProject){
    newUserFormProject.reset();
    this.isUpdate=false;
  }

  getProject(){
    var jsonData =
    {
      "projectDetailsList" : [{
              "employeeId" : this.eid
                   
                         }], 
                     "transactionType":"getById"
     }
  //    {
     
  //     "transactionType":"getAll"
  // }
    this.hrms.getProjectDetails(jsonData).subscribe(response =>{
      this.projectDetails = response;
      this.projectDetailsLi = this. projectDetails.projectDetailsList;
      console.log("Project Details List", this.projectDetailsLi);
      for(let proj in this.projectDetailsLi) {
        let loc = this.StateList.find(l => l.id == this.projectDetailsLi[proj].location);
        this.projectDetailsLi[proj].location = loc.stateName;
        if(this.projectDetailsLi[proj].isInternal) {
          this.projectDetailsLi[proj].isInternal = "Yes"
        } else {
          this.projectDetailsLi[proj].isInternal = "No"
        }
      }
    })
    
    }
    setProject(){
  
      var requestObj = {
        "projectDetailsList" : [{
                      "projectName":this.projectDetailss.projectName,
                                      "contractId":this.projectDetailss.contractId,
                                      "rateId":this.projectDetailss.rateId,
                                      "employeeId":this.eid,
                                      "startDate":this.projectDetailss.startDate,
                                      "endDate":this.projectDetailss.endDate,
                                      "billingId":this.projectDetailss.billingId,
                                      "projectTechStack":this.projectDetailss.projectTechStack,
                                      "customer":this.projectDetailss.customer,
                                      "location":this.projectDetailss.location,
                                      "gstApplicable":this.projectDetailss.gstApplicable,
                                      "projectType":this.projectDetailss.projectType,
                                      "projectStatus":this.projectDetailss.projectStatus,
                                      "bdmContact":this.projectDetailss.bdmContact,
                                      "isInternal":this.projectDetailss.isInternal,
                                      "createdBy":this.loggeduser
                                  
                                     
                           }], 
                       "transactionType":"save"
      }
      if(this.projectDetailss.startDate < this.projectDetailss.endDate){
        
  
      this.hrms.setProjectDetails(requestObj).subscribe(response =>{
        this.projectsave = response;
        this.projectDetailsList = this.projectsave.projectDetailsList;
        console.log(this.projectsave);
        if(this.projectsave.statusMessage == "ProjectDetails has saved successfully"){
          swal(this.projectsave.statusMessage,"","success");
          this.getProject();
        }
        
      })
    }else {
      swal("project end date should be greater than start date");
    }

    }
    
   // isUpdate = false;
    public projectDetailss = {
      "id":"",
      "projectName":"",
      "contractId":"",
      "rateId":"",
      "employeeId":"",
      "startDate":"",
      "endDate":"",
      "billingId":"",
      "projectTechStack":"",
      "customer":"",
      "location":"",
      "gstApplicable":"",
      "projectType":"",
      "projectStatus":"",
      "bdmContact":"",
      "isInternal":"",
      "createdBy":"",
      "updatedBy":""
    };
   
    projectGetById:any;
    projectdetailsupdate:any;
    projectdelete:any;
    
    startDate:any
    endDate:any
    getdatabyId1(user){
      this.isUpdate = true;
    // this.sd=user.startDate;
    // this.ed=user.endDate;
      console.log("Edit Project : ",user.id);
    
     
      var pid = user.id;
      var getupdatedata = {
        "projectDetailsList" : [{
                "id": pid
                     
                           }], 
                       "transactionType":"getById",
                     
      }
      console.log("GetById Request : ", getupdatedata);
      
      this.hrms.getprojectbyId(getupdatedata).subscribe(res =>{
        this.projectGetById = res;
        this.projectDetails = this.projectGetById.projectDetailsList;
        this.projectDetailss = this.projectDetails[0];
        console.log("this.projectDetailss",this.projectDetailss);
        this.startDate=new Date(this.projectDetailss.startDate).getFullYear()+'-'+(new Date(this.projectDetailss.startDate).getMonth() < 10 ? '0' : '')+(new Date(this.projectDetailss.startDate).getMonth()+1)+'-'+(new Date(this.projectDetailss.startDate).getDate() < 10 ? '0' : '')+new Date(this.projectDetailss.startDate).getDate()
        this.projectDetailss.startDate=this.startDate
        this.endDate=new Date(this.projectDetailss.endDate).getFullYear()+'-'+(new Date(this.projectDetailss.endDate).getMonth() < 10 ? '0' : '')+(new Date(this.projectDetailss.endDate).getMonth()+1)+'-'+(new Date(this.projectDetailss.endDate).getDate() < 10 ? '0' : '')+new Date(this.projectDetailss.endDate).getDate()
        this.projectDetailss.endDate=this.endDate
      })
    }
    updateprojdata(){
     
      var updatereq = {
        "projectDetailsList" : [{
                "id":this.projectDetailss.id,
                     "projectName":this.projectDetailss.projectName,
                                      "contractId":this.projectDetailss.contractId,
                                      "rateId":this.projectDetailss.rateId,
                                      "employeeId":this.projectDetailss.employeeId,
                                      "startDate":this.projectDetailss.startDate,
                                      "endDate":this.projectDetailss.endDate,
                                      "billingId":this.projectDetailss.billingId,
                                      "projectTechStack":this.projectDetailss.projectTechStack,
                                      "customer":this.projectDetailss.customer,
                                      "location":this.projectDetailss.location,
                                      "gstApplicable":this.projectDetailss.gstApplicable,
                                      "projectType":this.projectDetailss.projectType,
                                      "projectStatus":this.projectDetailss.projectStatus,
                                      "bdmContact":this.projectDetailss.bdmContact,
                                      "isInternal":this.projectDetailss.isInternal,
                                      "updatedBy":this.loggeduser
                           }], 
                       "transactionType":"update",
                      "sessionId" : "any String" 
      }
      console.log("Project update req : ", updatereq);
      
      this.hrms.updateproject(updatereq).subscribe(response =>{
        this.projectdetailsupdate = response;
        console.log(this.projectdetailsupdate);
        if(this.projectdetailsupdate.statusMessage == "ProjectDetails has updated successfully")
        swal(this.projectdetailsupdate.statusMessage,"","success")
        this.getProject();
      })
    }
  
    deleteproj(user){
      // alert(user.id);
    var deletep =
    {
      "projectDetailsList" : [{
                                                  "id":user.id
                                       
                                        
                            
                             }], 
                         "transactionType":"delete"
        }
    this.hrms.deleteproject(deletep).subscribe(response =>{
      this.projectdelete = response;
      console.log(this.projectdelete);
      // if(this.projectdelete.statusMessage == "ProjectDetails has deactivated successfully"){
      //  swal(this.projectdelete.statusMessage, "","success");
      //   this.getProject();
      // }
      this.getProject();
     
    })
    }


// states Master
StateDetails:any;
getStateListDetails() {
  var request = {

    "states":
      [],

    "sessionId": "1234",
    "transactionType": "getAll"

  }
  this.hrms.getStateListMaster(request).subscribe(res => {
    this.StateDetails = res;
  this.StateList = this.StateDetails.statesList;
    console.log("StateListgetAll", this.StateList);
  })
  
}


show(){
  this.view=true;
}
save(modalform){
  this.reason=modalform.value.uname;
  console.log("reason :",this.reason)
  swal("Experience Certificates are Declined", `Due to : ${this.reason}`, "success");
}

}  



