import { Component, OnInit } from '@angular/core';
import { HrmsService } from '../services/hrms.service';
import { ReportComponent } from '../report/report.component';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormControl, NgModel } from '@angular/forms';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-empreports',
  templateUrl: './empreports.component.html',
  styleUrls: ['./empreports.component.scss']
})
export class EmpreportsComponent implements OnInit {
  // report: any = [];
  // listemployeeReports: any;
  // employeeReports: any;
  // empId: any;
  // empName: any;
  // location: any;
  // skil: any;
  // experience: any;
  // output: any;


  // EmpId=false
  // EmpName=false
  // Experience=false
  // Location=false
  // Skills=false



  constructor(private hrms: HrmsService, private excel: ExcelService) { }


  ngOnInit() {
    this.getAllServices()
    this.getStates()
    this.getGender()
    this.getDesignation()
    this.getResource()
    this.getQualification()
    this.getEmpResignation()
  }


  // getReport(data) {
  //   var request =
  //   {
  //     "employeeReports": [{
  //       "empId": this.empId,
  //       "empName": this.empName,
  //       "experience": this.experience,
  //       "skil": this.skil,
  //       "location": this.location
  //     }],

  //     "transactionType": "getbyId"
  //   }
  //   console.log('empId', this.empId);
  //   console.log('empname', this.empName);
  //   console.log('experience', this.experience);
  //   console.log('skil', this.skil);
  //   console.log('location', this.location);

  //   this.hrms.getReportById(request).subscribe(res => {
  //     this.report = res;
  //     this.employeeReports = this.report.listemployeeReports;
  //     console.log('report', this.employeeReports);
  //     console.log('empName',this.employeeReports.empName)
  //     data.reset();
  //   })

  // }
  // dataList = [];
  // request: any;
  // getExcel(f, i) {
  //   this.dataList = [];

  //   f.forEach(element => {
  //     console.log("dataaaaaaaaaaaaaaaa", element);
  //     console.log(f);
  //     this.request = {

  //       "empId": element.empId,
  //       "empName": element.empName,
  //       "location": element.location,
  //       "skil": element.skil,
  //       "experience": element.experience
  //     }
  //     this.dataList.push(this.request);
  //   });

  //   var dddd= {
  //     "list" : this.dataList
  //   }


  //   console.log("ssssssssssss", dddd);
  //   this.hrms.getExcelData(dddd).subscribe(res => {
  //     this.output = res;
  //     console.log("ssssssssssssssssssssssssssssssssssssssssssss",this.output);
  //     if(this.output.text == "createded....."){
  //         swal(this.output.text,"","success");
  //     } 
  //   })
  // }

  // dataListp = [];
  // requestp: any;
  // getPdf(ff, i) {
  //   this.dataListp = [];

  //   ff.forEach(element => {
  //     console.log("dataaaaaaaaaaaaaaaa", element);
  //     console.log(ff);
  //     this.requestp = {

  //       "empId": element.empId,
  //       "empName": element.empName,
  //       "experience": element.experience,
  //       "location": element.location,
  //       "skil": element.skil

  //     }
  //     this.dataListp.push(this.requestp);
  //   });

  //   var ddd= {
  //     "list" : this.dataListp
  //   }
  //   console.log("ssssssssssss", ddd);
  //   this.hrms.getPdfData(ddd).subscribe(res => {
  //     this.output = res;
  //     console.log("ssssssssssssssssssssssssssssssssssssssssssss",this.output);
  //     if(this.output.text == "createded....."){
  //         swal(this.output.text,"","success");
  //     } 
  //   })
  // }



  Details: any;
  fkey: any
  selected_fields:any;
  table_heading: any
  service: any;
  finalservices: any
  table_data: any
  status: any = false
  states: any
  gender: any
  genderList: any
  role: any
  roleList: any
  resource:any
  resourceType:any
  pstatus = false
  stateList: any
  ippr: any = 5;
  qualification:any
  qualificationList:any
  resignation:any
  resignationType:any

  getGender() {
    var genderinfo = {

      "gender": [
        {

        }
      ],

      "transactionType": "getall"
    }
    this.hrms.getGenderinfo(genderinfo).subscribe(res => {
      this.gender = res
      this.genderList = this.gender.genderList
      console.log("genderList", this.genderList)
    })
  }

  getDesignation() {
    var request = {

      "transactionType": "getAll"
    }

    this.hrms.getEmployeeDesignation(request).subscribe(res => {
      this.role = res
      this.roleList = this.role.listDesignation
      console.log("Role", this.roleList)
    })
  }
  getResource() {
    var getresrequest =
    {
      "resourceTypes": [
        {

        }
      ],
      "transactionType": "getAll"
    }
    this.hrms.getResourceType(getresrequest).subscribe(res=>{
      this.resource=res
      this.resourceType=this.resource.employmentDetailsList
      console.log("Resource_type",this.resourceType)
    })
  }

  getQualification(){
    var QualificationRequest=
  {"listEmployeeEducations" : [  {
           
           
  }],

"transactionType" :"getall"
}
this.hrms.getEmpEduQualification(QualificationRequest).subscribe(res=>{
  this.qualification=res
  this.qualificationList=this.qualification.listCourse
  console.log("qualificaton",this.qualificationList)
})
  }
  getEmpResignation(){
    var reqSep = {
      "separationType": [

      ],
      "sessionId": "1234",
      "transactionType": "getall"
    }
    this.hrms.getSeperationType(reqSep).subscribe(res=>{
      this.resignation=res
      this.resignationType=this.resignation.separationTypeList
      console.log("resignation",res)
    })
  }
  getKye() {

    var reqObj =
    {
      "kye":
        [{


        }],
      "transactionType": "getAll"
    }

    this.hrms.getEmployeeKyeDetails(reqObj).subscribe(res => {

      console.log("kyeRes", res);
      this.Details = res;
      this.table_data = this.Details.kyeList
      var key = Object.keys(this.Details.kyeList[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "passport_status");
      this.fkey = this.fkey.filter(d => d != "pan_status");
      this.fkey = this.fkey.filter(d => d != "aadhar_status");
      this.fkey = this.fkey.filter(d => d != "created_by");
      this.fkey = this.fkey.filter(d => d != "updated_by");
      this.fkey = this.fkey.filter(d => d != "created_date");
      this.fkey = this.fkey.filter(d => d != "updated_date");
      this.fkey = this.fkey.filter(d => d != "passport_img");
      this.fkey = this.fkey.filter(d => d != "pan_img");
      this.fkey = this.fkey.filter(d => d != "aadhar_img");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }


  selected_fields_fun() {
    console.log(this.selected_fields)
    this.table_heading = this.selected_fields
    this.status = true
    this.pstatus = true

    console.log("table data", this.table_data)
  }

  getExperience() {
    console.log("experience")

    var requestObj =
    {
      "employeeExperienceDetails": [{


      }],

      "transactionType": "getAll"
    }


    this.hrms.getEmployeeExperienceDetails(requestObj).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.employeeExperienceDetails
      for (let i in this.table_data) {
        var state = this.stateList.find(s => s.id == this.table_data[i].location)
        this.table_data[i].location = state.stateName
        if (this.table_data[i].is_current_company == 1) {
          this.table_data[i].is_current_company = "Yes"
        } else {
          this.table_data[i].is_current_company = "No"
        }
      }
      console.log("tabel_data", this.table_data)
      var key = Object.keys(this.Details.employeeExperienceDetails[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "status");
      this.fkey = this.fkey.filter(d => d != "documentsstatus");
      this.fkey = this.fkey.filter(d => d != "image");
      this.fkey = this.fkey.filter(d => d != "created_by");
      this.fkey = this.fkey.filter(d => d != "updated_by");
      this.fkey = this.fkey.filter(d => d != "created_date");
      this.fkey = this.fkey.filter(d => d != "updated_date");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }


  getEducation() {
    console.log("Education")
    var reqtitle =
    {
      "employeeEducationDetailsList": [
        {

        }
      ],

      "transactionType": "getAll"

    }

    this.hrms.getEmpEduDetails(reqtitle).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.employeeEducationDetailsList
      for(let i in this.table_data){
        var qua = this.qualificationList.find(q => q.id == this.table_data[i].qualification)
        this.table_data[i].qualification=qua.educationType
      }
      var key = Object.keys(this.Details.employeeEducationDetailsList[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "status");
      this.fkey = this.fkey.filter(d => d != "image");
      this.fkey = this.fkey.filter(d => d != "createdBy");
      this.fkey = this.fkey.filter(d => d != "updatedBy");
      this.fkey = this.fkey.filter(d => d != "createdDate");
      this.fkey = this.fkey.filter(d => d != "updatedDate");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }

  getBasicInfo() {
    console.log("basicInfo")

    var empinfo =
    {
      "employeeInfo": [{

      }],
      "transactionType": "getall"
    }

    this.hrms.getempinfo(empinfo).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.employeeInfo
      for (let i in this.table_data) {
        var gender = this.genderList.find(g => g.id == this.table_data[i].gender)
        this.table_data[i].gender = gender.gender
        var role = this.roleList.find(r => r.id == this.table_data[i].title)
        this.table_data[i].title = role.designation
      }
      var key = Object.keys(this.Details.employeeInfo[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "status");
      this.fkey = this.fkey.filter(d => d != "image");
      this.fkey = this.fkey.filter(d => d != "createdBy");
      this.fkey = this.fkey.filter(d => d != "updatedBy");
      this.fkey = this.fkey.filter(d => d != "createdOn");
      this.fkey = this.fkey.filter(d => d != "updatedOn");
      this.fkey = this.fkey.filter(d => d != "id");
      this.fkey = this.fkey.filter(d => d != "password");
      this.fkey = this.fkey.filter(d => d != "statusDate");
      console.log("field names", this.fkey);
    })
  }



  getSkills() {
    console.log("skills")

    var Requestdata = {
      "listOfSkill": [{


      }],
      "transactionType": "getAll"
    }
    this.hrms.getSkill(Requestdata).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.getSkillInfoList
      var key = Object.keys(this.Details.getSkillInfoList[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "status");
      // this.fkey = this.fkey.filter(d => d != "skill_id");
      // this.fkey = this.fkey.filter(d => d != "level_id");
      this.fkey = this.fkey.filter(d => d != "created_by");
      this.fkey = this.fkey.filter(d => d != "update_by");
      this.fkey = this.fkey.filter(d => d != "created_date");
      this.fkey = this.fkey.filter(d => d != "updated_date");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }

  getCertifications() {
    console.log("certifications")

    var request =

    {

      "certificationDetailsModel": [{


      }],

      "transactionType": "getall"
    }
    this.hrms.getCertification(request).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.certificationDetailsList
      var key = Object.keys(this.Details.certificationDetailsList[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "createdBy");
      this.fkey = this.fkey.filter(d => d != "updatedBy");
      this.fkey = this.fkey.filter(d => d != "createdDate");
      this.fkey = this.fkey.filter(d => d != "updatedDate");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }

  getContactInfo() {
    console.log("contacts")

    var request =
    {
      "empInfo": [
        {

        }
      ],
      "transactionType": "getAll"
    }

    this.hrms.getContactInfo(request).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.empContacts
      for(let i in this.table_data){
        var cs=this.stateList.find(s => s.id ==this.table_data[i].currentState)
        this.table_data[i].currentState=cs.stateName
      }
      var key = Object.keys(this.Details.empContacts[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "createdBy");
      this.fkey = this.fkey.filter(d => d != "updatedBy");
      this.fkey = this.fkey.filter(d => d != "createdDate");
      this.fkey = this.fkey.filter(d => d != "updatedDate");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }
  getBankInfo() {
    console.log("BankInfo")

    var bankdetails =
    {
      "bankDetails": [{

      }],
      "transactionType": "getall"
    }


    this.hrms.getbankserverdetails(bankdetails).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.listBankDetails
      var key = Object.keys(this.Details.listBankDetails[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "Is_active");
      this.fkey = this.fkey.filter(d => d != "created_by");
      this.fkey = this.fkey.filter(d => d != "updated_by");
      this.fkey = this.fkey.filter(d => d != "created_date");
      this.fkey = this.fkey.filter(d => d != "updated_date");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }
  getResignation() {
    console.log("Resignation")

    var req1 = {
      "resignation": [
        {

        }],
      "transactionType": "getall"
    }
    this.hrms.getResignation(req1).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.resignationList
      for(let i in this.table_data){
       var resig=this.resignationType.find(r => r.separationTypeId == this.table_data[i].resignationType)
       this.table_data[i].resignationType=resig.separationType
      }
      var key = Object.keys(this.Details.resignationList[0])
      this.fkey = key.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }
  getProjectDetails() {
    console.log("ProjectDetails")

    var jsonData =
    {
      "projectDetailsList": [{

      }],
      "transactionType": "getAll"
    }

    this.hrms.getProjectDetails(jsonData).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.projectDetailsList
      for(let i in this.table_data){
        var cs=this.stateList.find(s => s.id ==this.table_data[i].location)
        this.table_data[i].location=cs.stateName
      }
      var key = Object.keys(this.Details.projectDetailsList[0])
      this.fkey = key.filter(d => d != "billingId");
      this.fkey = this.fkey.filter(d => d != "rateId");
      this.fkey = this.fkey.filter(d => d != "isInternal");
      this.fkey = this.fkey.filter(d => d != "createdBy");
      this.fkey = this.fkey.filter(d => d != "updatedBy");
      this.fkey = this.fkey.filter(d => d != "createdDate");
      this.fkey = this.fkey.filter(d => d != "updatedDate");
      this.fkey = this.fkey.filter(d => d != "id");
      this.fkey = this.fkey.filter(d => d != "flag");
      console.log("field names", this.fkey);
    })
  }

  getDependents() {
    console.log("Dependents")

    var requestData = {


      "dependentDetails": [{

      }],
      "transactionType": "getall",

    }

    this.hrms.getdependentdetails(requestData).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.getDependentDetailsList
      var key = Object.keys(this.Details.getDependentDetailsList[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "created_By");
      this.fkey = this.fkey.filter(d => d != "updated_By");
      this.fkey = this.fkey.filter(d => d != "created_Date");
      this.fkey = this.fkey.filter(d => d != "updated_Date");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }


  getOnboarding() {
    console.log("Onboarding")

    var employmentdetailss =
    {
      "employmentDetails": [{

      }],
      "transactionType": "getAll"
    }
    this.hrms.getonboardingdetails(employmentdetailss).subscribe(res => {
      console.log(res)
      this.Details = res;
      this.table_data = this.Details.employmentDetailsList
      for(let i in this.table_data){
        var resource = this.resourceType.find(r => r.id == this.table_data[i].resourceType)
        this.table_data[i].resourceType=resource.resourceTypeName
      }
      var key = Object.keys(this.Details.employmentDetailsList[0])
      this.fkey = key.filter(d => d != "flag");
      this.fkey = this.fkey.filter(d => d != "createdBy");
      this.fkey = this.fkey.filter(d => d != "updatedBy");
      this.fkey = this.fkey.filter(d => d != "createdDate");
      this.fkey = this.fkey.filter(d => d != "updatedDate");
      this.fkey = this.fkey.filter(d => d != "bondStatus");
      this.fkey = this.fkey.filter(d => d != "sbuId");
      this.fkey = this.fkey.filter(d => d != "buId");
      this.fkey = this.fkey.filter(d => d != "costCenterId");
      this.fkey = this.fkey.filter(d => d != "id");
      console.log("field names", this.fkey);
    })
  }



  getAllServices() {
    var ReportReqObj =

    {
      "services": [{


      }],
      "transactionType": "getAll"
    }

    this.hrms.getAllservices(ReportReqObj).subscribe(res => {
      console.log("response", res)
      this.service = res
      this.finalservices = this.service.servicesList
      console.log("final services", this.finalservices)
    })
  }

  getStates() {
    var request =
    {

      "states":
        [{

        }],

      "sessionId": "1234",
      "transactionType": "getall"

    }
    this.hrms.getStateListMaster(request).subscribe(res => {
      this.states = res
      this.stateList = this.states.statesList
      console.log("stateList", this.stateList)
    })
  }

  selected_service(e) {
    console.log("service name", e)
    this.table_heading = null;
    this.fkey = null;
    if (this.status == false)
      this.status = true
    else
      this.status = false;
    var choice = e;
    switch (choice) {
      case "Kye":
        this.getKye();
        break;
      case "Experience":
        this.getExperience();
        break;
      case "Education":
        this.getEducation()
        break;
      case "Basic Info":
        this.getBasicInfo();
        break;
      case "Contact Info":
        this.getContactInfo();
        break;
      case "Certification":
        this.getCertifications();
        break;
      case "Dependents":
        this.getDependents();
        break;
      case "Project Details":
        this.getProjectDetails();
        break;
      case "Resignation":
        this.getResignation();
        break;
      case "Onboarding":
        this.getOnboarding();
        break;
      case "Skills":
        this.getSkills();
        break;
      case "Bank Info":
        this.getBankInfo();
        break;

    }

  }
  download_pdf() {
    const doc = new jsPDF();
    doc.autoTable({
      head: [this.table_heading],
    })

    doc.autoTable({
      html: '#my_table',
      body: [{ halign: 'center' }],
    });
    doc.save('table.pdf');
  }
  download_excel() {
    this.excel.exportAsExcelFile(this.table_data, 'sample');
  }



  selectAll(checkAll, select: NgModel, values) {
    //this.toCheck = !this.toCheck;
    if(checkAll){
      select.update.emit(values); 
     this.selected_fields_fun();
    }
    else{
      select.update.emit([]);
      this.selected_fields_fun();
    }
  }

}


