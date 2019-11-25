import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { PsaService } from '../psa.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { HrmsService } from '../../services/hrms.service';
import { BehaviorSubject } from 'rxjs';
import swal from 'sweetalert';
import { inputs } from '@syncfusion/ej2-angular-navigations/src/accordion/accordion.component';

@Component({
  selector: 'app-project-psa',
  templateUrl: './project-psa.component.html',
  styleUrls: ['./project-psa.component.scss']
})
export class ProjectPSAComponent implements OnInit {

  projectData;
  dataProject: any;
  getId: any;
  getIdData: any;
  hideToEdit;
  tblupdate = true;
  editTo = true;
  updateResponse: any;
  customer: any;
  customerData: any;
  customerId: any;
  contract: any;
  contractData: any;


  contractFilter: any;
  locTypes: any;
  loc;
  delivery: any;
  deliveryLoc: any;
  serviceCat: any;
  serviceCategoryList: any;
  serv: any;
  serviceTypes: any;
  billingTypeList: any;
  billingTypes;
  rateTypes: any;
  rateTypeList: any;
  techStackResp: any;
  techStacks: any;
  task: any;
  taskList: any;
  saveSuccess: any;
  contractDisable = true;
  contractDisableToTable = true;
  cus: any;
  contractIdGet: any;
  contractId: any;

  contractTableID: any;
  minStartDate: Date;
  maxStartDate: Date;
  minEndDate: Date;
  maxEndDate: Date;
  contr: any;
  contractDataTo: any;
  disableDate = true;
  procon: any;
  contractPro: any;
  countValue: any;
  contractValue: any;
  valueToShow;
  showBalance = false;
  greenShow = false;
  redShow = false;
  valueContract: any;
  show = true;
  onShow = false;
  business: any;
  businessUnit: any;
  subBusiness: any;
  subBusinessUnit: any;
  empbasic: any;
  empbasicin: any;
  loggedUserName;
  msgApprove: any;
  msg: any;
  msgdelete: any;
  manager: any[];
  employee: any[];
  managerdata = [];
  empDesignationDetails: any;
  empDesignationlist: any;
  ipppd = 5;
  empObjTech;
  errorContract = false;
  reason: any;
  reasonFor = false;
  custId: any;
  contId: any;
  role: boolean;

  roleEdit: boolean;
  roleStatus: boolean;
  cusconeditHide=false;
  dataTo: any;

  constructor(private formBuild: FormBuilder, private psaService: PsaService, private toastr: ToastrManager, private hrms: HrmsService) {
    this.getLocationType();
    this.getDelivaryLoc();
    this.getServiceCategory();
    this.getServiceType();
    this.getBillingType();
    this.getRateType();
    this.getTechStack();
    this.getTasks();
    this.getBusinessUnit();
    this.getSubBusinessUnit();
    this.getEmpDesignation();



    //this.getIdcontract();



  }

  ngOnInit() {
    this.getHide();
    this.getAllProject();
    this.getAllContract();
    this.getAllCustomer();
    this.getAllEmployees();





    this.loggedUserName = localStorage.getItem('UserName');


    if (localStorage.getItem('Role') == "ROLE_DM" || localStorage.getItem('Role') == "ROLE_BDM" || localStorage.getItem('Role') == "ROLE_SALES" || localStorage.getItem('Role') == "ROLE_SBUHEAD") {
      this.role = true;
    }
    if (localStorage.getItem('Role') == "ROLE_DM" || localStorage.getItem('Role') == "ROLE_BDM" || localStorage.getItem('Role') == "ROLE_SALES" || localStorage.getItem('Role') == "ROLE_SBUHEAD") {
      this.roleEdit = true;
    }
    if (localStorage.getItem('Role') == "ROLE_BUHEAD") {
      this.roleStatus = true;
    }

  }


  project = this.formBuild.group({
    customerChange: [null, Validators.required],
    contractChange: [null, Validators.required],
    projectName: [null, Validators.required],
    projectDescription: [null, Validators.required],
    projectStartDate: [null, Validators.required],
    projectEndDate: [null, Validators.required],
    projectManager: [null, Validators.required],
    projectTechnicalLead: [null, Validators.required],
    projectValue: ['', [Validators.required, (control: AbstractControl) => Validators.max(this.valueToShow)(control)]],
    serviceType: [null, Validators.required],
    billingType: [null, Validators.required],
    rateType: [null, Validators.required],
    projectTechStack: [null, Validators.required],
    serviceCategory: [null, Validators.required],
    isInternal: [null, Validators.required],
    projectDelivaryLocation: [null, Validators.required],
    locationType: [null, Validators.required],
    numberOfResources: [null, Validators.required],
    tasks: [null, Validators.required],
    bu: [null, Validators.required],
    sbu: [null, Validators.required]
  })

  getHide() {
    if (localStorage.getItem('hideToEdit') == "false") {
      this.hideToEdit = false;
    }
    else {
      this.hideToEdit = true;
    }
  }
dataManager:any=[];
  getAllProject() {
    var getProject = {
      "projectInfo": {
      },
      "transactionType": "getall"
    }
    this.psaService.getAllProject(getProject).subscribe(response => {
      this.projectData = response;
    this.dataTo=this.projectData.projectList;
      if (localStorage.getItem('Role') == "ROLE_MANAGER") {
        this.getAllEmployees();
        
        //console.log("projectDATA Manager", this.dataProject);
      
          this.dataProject = this.dataTo.filter(info => info.projectResourceMapping.projectManager == this.loggedUserName);
         
        
        
        console.log("projectDATA Manager", this.dataProject);
      }

      else {
        this.dataProject =this.dataTo ;
        console.log("projectDATA", this.dataProject);

      }






      // for (var i = 0; i < this.dataProject.length; i++) {
      //   console.log("service project data : ", this.serviceCategoryList);
      //   let serCat = this.serviceCategoryList.find(type => type.serviceategoryId == this.dataProject[i].servicecategory)
      //   this.dataProject[i].servicecategory = serCat.serviceategoryName;

      //   let delivery = this.deliveryLoc.find(type => type.deliverylocationId == this.dataProject[i].deliveryLocation)
      //   this.dataProject[i].deliveryLocation = delivery.deliverylocationName;
      //   console.log("delivery project data", this.dataProject[i]);
      // }


    })
  }



  moreinfo(id) {

    var getID = {
      "projectInfo": {
        "projectId": id
      },
      "transactionType": "getByProId"
    }

    this.psaService.getIdProject(getID).subscribe(response => {
      this.getId = response;

      localStorage.setItem('hideToEdit', "false");
      this.getHide();
      this.getIdData = this.getId.projectList[0];
      console.log("selected data of project", this.getIdData);
      console.log("Location types : ", this.locTypes);
      this.getContractId(this.getIdData.contractId);
      this.disableDate = false;
      this.getProjectContractID(this.getIdData.contractId);
      this.show = true;
      this.onShow = false;

      if (this.getIdData.status == "Approved" || this.getIdData.status == "Pending") {
        this.reasonFor = false;
      }
      if (this.getIdData.status == "Approved" && localStorage.getItem("Role") == "ROLE_BUHEAD") {
        this.roleStatus = false;
      }
      if (this.getIdData.status == "Rejected" && localStorage.getItem("Role") == "ROLE_BUHEAD") {
        this.roleStatus = false;
       
      }
      if (this.getIdData.status == "Rejected") {
        
        this.reason = this.getIdData.comment;
        this.reasonFor = true;
        console.log("Reason", this.reason);
      }
      for (var i = 0; i < this.customerData.length; i++) {
        if (this.getIdData.customerId == this.customerData[i].customerId) {
          this.custId = this.customerData[i].customerName;
        }
      }
      for (var i = 0; i < this.contractIdGet.length; i++) {
        if (this.getIdData.contractId == this.contractIdGet[i].contractid) {
          this.contId = this.contractIdGet[i].contractname;
        }
      }

      // let manager = this.empbasicin.find(type => type.employeeId == this.getIdData.projectResourceMapping.projectManager)
      //  this.getIdData.projectResourceMapping.projectManager = manager.firstname + manager.lastname;

      //  let techLead = this.empbasicin.find(type => type.employeeId == this.getIdData.projectResourceMapping.techLead)
      //  this.getIdData.projectResourceMapping.techLead = techLead.firstname + techLead.lastname;

      // let locType = this.locTypes.find(type => type.locationtypeId == this.getIdData.locationType)
      // this.getIdData.locationType = locType.locationType;

      // let serCat = this.serviceCategoryList.find(type => type.serviceategoryId == this.getIdData.servicecategory)
      // this.getIdData.servicecategory = serCat.serviceategoryName;

      // let delivery = this.deliveryLoc.find(type => type.deliverylocationId == this.getIdData.deliveryLocation)
      // this.getIdData.deliveryLocation = delivery.deliverylocationName;

      // let serType = this.serviceTypes.find(type => type.id == this.getIdData.projectRatecard.serviceType)
      // this.getIdData.projectRatecard.serviceType = serType.serviceType;

      // let billType = this.billingTypes.find(type => type.id == this.getIdData.projectRatecard.billingType)
      // this.getIdData.projectRatecard.billingType = billType.name;

      // let rateType = this.rateTypes.find(type => type.id == this.getIdData.projectRatecard.rateType)
      // this.getIdData.projectRatecard.rateType = rateType.rateType;

      // for (var i = 0; i < this.getIdData.projectResourceMapping.techStack.length; i++) {
      //   let tech = this.techStacks.find(stack => stack.id == this.getIdData.projectResourceMapping.techStack[i])
      //   this.getIdData.projectResourceMapping.techStack[i] = tech.technology;
      // }

      // for (var i = 0; i < this.getIdData.tasks.length; i++) {
      //   let task = this.taskList.find(task => task.projecttaskId == this.getIdData.tasks[i])
      //   this.getIdData.tasks[i] = task.projecttask;
      // }
    })


  }


  back() {
    this.hideToEdit = true;
    this.tblupdate = true;
    this.editTo = true;
    this.getAllProject();
    localStorage.removeItem('hideToEdit');
    if (this.getIdData.status == "Approved" && localStorage.getItem("Role") == "ROLE_BUHEAD") {
      this.roleStatus = true;
    }
    if (this.getIdData.status == "Rejected" && localStorage.getItem("Role") == "ROLE_BUHEAD") {
      this.roleStatus = true;
    }
  }

  formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }

  createProject(proDataSave) {


    var data = {
      "projectInfo": {
        "projectName": proDataSave.projectName,
        "projectDescription": proDataSave.projectDescription,
        "startDate": proDataSave.projectStartDate,
        "endDate": proDataSave.projectEndDate,
        "customerId": proDataSave.customerChange,
        "contractId": proDataSave.contractChange,
        "servicecategory": proDataSave.serviceCategory,
        "isInternal": proDataSave.isInternal,
        "deliveryLocation": proDataSave.projectDelivaryLocation,
        "locationType": proDataSave.locationType,
        "tasks": proDataSave.tasks,
        "createdBy": this.loggedUserName,
        "buHead": proDataSave.bu,
        "sbuHead": proDataSave.sbu,
        "status": "pending"

      },
      "resourceMap":
      {

        "resourceCount": proDataSave.numberOfResources,
        "projectManager": proDataSave.projectManager,
        "techLead": proDataSave.projectTechnicalLead,
        "techStack": proDataSave.projectTechStack
      },
      "rateCard": {

        "projectValue": proDataSave.projectValue,
        "serviceType": proDataSave.serviceType,
        "billingType": proDataSave.billingType,
        "rateType": proDataSave.rateType
      },
      "transactionType": "save"
    }

    console.log("data", data);

    this.contractDisable = true;
    this.show = true;
    this.onShow = false;
    this.psaService.saveProject(data).subscribe(Response => {
      console.log("save data", Response);

      this.getAllProject();
      this.saveSuccess = Response;
      this.toastr.successToastr(this.saveSuccess.message, 'Success', {
        animate: 'slideFromRight',
        showCloseButton: true,
      });
      this.project.reset();
    },
      err => {
        console.log(err);

        if (err) {
          this.toastr.errorToastr(err.error.message, 'Error', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      }
    )

  }


  //edit

  edit() {
    this.tblupdate = false;
    this.editTo = false;
  }

  cancel() {
    this.editTo = true;
    this.tblupdate = true;
    this.moreinfo(this.getIdData.projectId);
    this.contractDisable = true;
    this.disableDate = true;
    this.showBalance = false;
    this.show = true;
    this.onShow = false;
  }

  updateproject(dataValue) {


    var data = {
      "projectInfo": {
        "projectId": this.getIdData.projectId,
        "projectName": dataValue.projectname,
        "projectDescription": dataValue.description,
        "startDate": dataValue.startdate,
        "endDate": dataValue.enddate,
        "customerId": this.getIdData.customerId,
        "contractId": this.getIdData.contractId,
        "servicecategory": dataValue.servicecategory,
        "isInternal": dataValue.isinternal,
        "deliveryLocation": dataValue.deliverylocation,
        "locationType": dataValue.locationtype,
        "tasks": dataValue.tasks,
        "buHead": dataValue.buHead,
        "sbuHead": dataValue.sbuHead,
        "status": "Pending",
        "createdBy": this.loggedUserName,
        "updatedBy": this.loggedUserName
      },
      "resourceMap":
      {
        "resourceMappingId": this.getIdData.projectResourceMapping.resourceMappingId,
        "resourceCount": dataValue.resourcecount,
        "projectManager": dataValue.manager,
        "techLead": dataValue.techlead,
        "techStack": dataValue.projecttechstack
      },
      "rateCard": {
        "ratecardId": this.getIdData.projectRatecard.ratecardId,
        "projectValue": dataValue.value,
        "serviceType": dataValue.servicetype,
        "billingType": dataValue.billingtype,
        "rateType": dataValue.ratetype
      },


      "transactionType": "update"
    }

    console.log("update", data);
    this.editTo = true;
    this.tblupdate = true;

    this.psaService.saveProject(data).subscribe(response => {
      console.log(response)
      this.updateResponse = response;
      this.getAllProject();
      this.moreinfo(this.getIdData.projectId);
      if (this.updateResponse.message == "Project updated successfully!") {
        this.toastr.successToastr('Project updated successfully!', 'Success', {
          animate: 'slideFromRight',
          showCloseButton: true,
        });
      }
      else {
        this.toastr.errorToastr('Not Updated Please select all fields', 'Error', {
          animate: 'slideFromRight',
          showCloseButton: true,
        });
      }
    }, err => {
      if (err) {
        this.toastr.errorToastr('Not Updated', 'Error', {
          animate: 'slideFromRight',
          showCloseButton: true,
        });
      }
    });
  }

  //get Customer

  getAllCustomer() {
    var data = {
      "customerList":
      {


      },
      "transactionType": "getall"
    }
    this.psaService.getAllCustomer(data).subscribe(response => {
      console.log("all customer", response)
      this.customer = response;
      this.customerData = this.customer.customerList;

    });

  }

  getIDCustomer() {

  }

  // get contract
  getAllContract() {
    var data = {
      "customercontractdetailslist": [
        {

        }],
      "transactiontype": "getAll"
    }

    this.psaService.getAllContractdDetails(data).subscribe(response => {


      this.contract = response;
      this.contractData = this.contract;
      console.log("contract", this.contractData)

    })
  }

  getIdcontract(id) {
    var data = {
      "customercontractdetailslist": [
        {
          "customerid": id
        }],
      "transactiontype": "getbycustid"
    }
    console.log("data customer select to contract", data);


    this.psaService.getIdContract(data).subscribe(response => {
      console.log("get id contract", response)
      this.cus = response;
      this.contractIdGet = this.cus.customercontractdetailslist;


    })
  }


  getContractId(id) {
    var data = {
      "customercontractdetailslist": [
        {

          "contractid": id



        }],
      "transactiontype": "getbyid"
    }
   
    this.onShow = true;
    
      this.cusconeditHide=true;
    
    this.show = false;
    
    this.psaService.getIdContract(data).subscribe(response => {
      console.log("contract selected", response)
      this.contr = response;
      this.contractDataTo = this.contr.customercontractdetailslist[0];
      this.contractValue = this.contractDataTo.contractvalue;

      this.minStartDate = new Date(this.contractDataTo.startdate);
      this.maxStartDate = new Date(this.contractDataTo.enddate);
      console.log("dates ", this.minStartDate, this.maxStartDate);
      this.disableDate = false;
      this.getProjectContractID(id);
      this.valueContract = this.contractValue - this.valueToShow;
      console.log("contract value",this.valueContract);
      
    });
  }



  getProjectContractID(id) {
    var data = {
      "projectInfo": {
        "contractId": id
      },
      "transactionType": "getByContId"
    }
    this.contractDisable=true;
    this.psaService.getProjectContractId(data).subscribe(response => {
      console.log("con pro ID", response);

      this.procon = response;
      this.contractPro = this.procon.projectList;
      this.countValue = 0;

      if (this.procon.message == "No projects found!") {
        this.valueToShow = this.contractValue;
        this.showBalance = true;
        this.greenShow = true;
      }
      else {
        for (var i = 0; i < this.contractPro.length; i++) {
          this.countValue = this.countValue + this.contractPro[i].projectRatecard.projectValue;
        }
        this.valueToShow = this.contractValue - this.countValue;
        if (this.valueToShow >= 0) {
         
          this.greenShow = true;
          this.redShow = false;
        
        }
        else {
          this.redShow = true;
          this.greenShow = false;
        }
        this.showBalance = true;

      }




    })

  }

  //edit customer and contract
  editHere(){
    if(this.cusconeditHide==true){
      this.cusconeditHide=false;
    }
  }

  cusConEdit(){

    this.contractDisable=true;
    this.onShow=false;
    this.showBalance=false;
    this.greenShow=false;
    this.redShow=false;
    this.show=true;
    this.cusconeditHide=false;
    
  }


  //get ALL Masters
  getLocationType() {
    var request = {
      "locationTypeList": [
        {

        }
      ],
      "transactionType": "getall"
    }
    this.psaService.getlocationType(request).subscribe(response => {
      this.loc = response;
      this.locTypes = this.loc.locationTypeList;
      console.log("location Type", this.locTypes)
    }
    );
  }

  getDelivaryLoc() {
    var data = {
      "deliverylocationList": [{

      }], "transactionType": "getall"
    }
    this.psaService.getdeliverylocation(data).subscribe(response => {

      this.delivery = response;
      this.deliveryLoc = this.delivery.deliverylocationList;
      console.log("delivary loc", this.deliveryLoc)
    });
  }

  getServiceType() {
    var data = { "servicetypeList": [{}], "transactionType": "getall" }
    this.psaService.getservicetype(data).subscribe(res => {

      this.serv = res;
      this.serviceTypes = this.serv.servicetypeList;
      console.log("service type", this.serviceTypes)
    });
  }
  getServiceCategory() {
    var data = { "servicecategoryList": [{}], "transactionType": "getall" }
    this.psaService.getServiceCategory(data).subscribe(Response => {
      this.serviceCat = Response;
      this.serviceCategoryList = this.serviceCat.servicecategoryList;
      console.log("service catogory", this.serviceCategoryList);
    });
  }

  getBillingType() {
    var data = {
      "transactionType": "getall"
    }
    this.psaService.getbillingtype(data).subscribe(response => {


      this.billingTypeList = response;
      this.billingTypes = this.billingTypeList.billingList;
      console.log("Billing Type", this.billingTypes);

    })
  }

  getRateType() {
    var data = {
      "rateType": [{

      }],
      "transactionType": "getAll"
    }
    this.psaService.getRatetype(data).subscribe(response => {

      this.rateTypeList = response;
      this.rateTypes = this.rateTypeList.rateTypeList;
      console.log("rate type", this.rateTypes);

    }
    )
  }

  getTechStack() {
    var data = {
      "projectTechStackList": [
        {
        }
      ],
      "transactionType": "getall"
    }
    this.psaService.getProjectTechStack(data).subscribe(response => {
      this.techStackResp = response;
      this.techStacks = this.techStackResp.projectTechStackList;
      console.log("Tech Stack", this.techStacks);

    })
  }

  getTasks() {
    let req = {
      "projecttasklist": [
        {}
      ],
      "transactionType": "getall"
    }
    this.psaService.getProjectTask(req).subscribe(resp => {
      this.task = resp;
      this.taskList = this.task.projecttasklist;
      console.log('Task List : ', this.taskList);

    })
  }

  getBusinessUnit() {
    var data = {
      "businessUnit": [{
      }],
      "transactionType": "GetAll"
    }
    this.psaService.getBusinessUnit(data).subscribe(Response => {
      this.business = Response;
      this.businessUnit = this.business.businessUnitList;

    })
  }

  getSubBusinessUnit() {
    var data = {

      "subBusinessUnitModel": [
        {
        }],
      "transactionType": "getAll"
    }

    this.psaService.getSubBusinessUnit(data).subscribe(Response => {
      this.subBusiness = Response;
      this.subBusinessUnit = this.subBusiness.subBusinessUnitList;

      console.log("subbusiness Unit", this.subBusinessUnit);

    })
  }
  getEmpDesignation() {
    var request = {
      "designation": [

      ],
      "sessionId": "3121",
      "transactionType": "getall"
    }
    this.hrms.getEmployeeDesignation(request).subscribe(res => {
      this.empDesignationDetails = res;
      this.empDesignationlist = this.empDesignationDetails.listDesignation;
      console.log("emp designatoin", this.empDesignationlist);
    })
  }

  //masters end





  buListArr = new Array();
  sbuListArr = new Array();



  getAllEmployees() {
    var empinfo =
    {
      "employeeInfo": [{
      }],
      "transactionType": "getall"
    }

    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.empbasicin = this.empbasic.employeeInfo;
      console.log("All Employees", this.empbasicin);
      console.log("Business Unit", this.businessUnit);
      for (var i = 0; i < this.businessUnit.length; i++) {
        let buObj = {
          'buHead': "",
          "buHeadName": "",
          "buName": ""
        }
        let empObj = this.empbasicin.find(type => type.employeeId == this.businessUnit[i].buHead)
        console.log("Find employee : ", empObj);
        buObj.buHeadName = empObj.firstname + empObj.lastname;
        buObj.buHead = empObj.employeeId;
        buObj.buName = this.businessUnit[i].businessUnitName;
        this.buListArr.push(buObj);
      }
      for (var i = 0; i < this.subBusinessUnit.length; i++) {
        let sbuObj = {
          'sbuHead': "",
          "sbuHeadName": "",
          "name": ""
        }
        let empObj = this.empbasicin.find(type => type.employeeId == this.subBusinessUnit[i].sbuHead)
        console.log("Find employee : ", empObj);
        sbuObj.sbuHeadName = empObj.firstname + empObj.lastname;
        sbuObj.sbuHead = empObj.employeeId;
        sbuObj.name = this.subBusinessUnit[i].name;
        this.sbuListArr.push(sbuObj);
      }

      this.empObjTech = this.empbasicin.filter(type => type.title == 5)
      console.log("Find employee of tech lead: ", this.empObjTech);



      this.manager = Array.from(new Set(this.empbasicin.map(x => x.reportingManager)));
      this.employee = Array.from(new Set(this.empbasicin.map(x => x.employeeId)));
       console.log(this.employee, "only employessssssssss........")
       console.log(this.manager, "only managers in employee info...................");
      for (let n = 0; n <= this.manager.length; n++) {
        for (let m = 0; m < this.employee.length; m++) {

          if (this.manager[n] == this.employee[m]) {
            this.managerdata.push(this.empbasicin[m]);

          }
        }
      }
      console.log("managers", this.managerdata)




    });
    console.log("bu obj", this.buListArr);



  }



  selected_customer(id) {

    this.contractDisable = false;
    this.customerId = id
    console.log("customer selected", this.customerId);
    this.getIdcontract(this.customerId);
  }





  cancelSave(value) {

    this.disableDate = true;
    this.showBalance = false;
    value.reset();
    this.show = true;
    this.contractDisable = true;
    this.onShow = false;
  }


  selected_customerToTable(value) {
    this.contractDisable = false;
    this.contractTableID = value;
  }

  approve() {
    var approve = {
      "projectInfo": {
        "projectId": this.getIdData.projectId,
        "status": "Approved",
        "updatedBy": this.loggedUserName
      },
      "transactionType": "statusUpdate"
    }
    // console.log("approved",approve);

    swal({
      title: "Are you sure?",
      text: "Want to approve the project",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((proceed) => {
        if (proceed) {

          this.psaService.saveProject(approve).subscribe(response => {
            console.log("approved response", response);
            this.msgApprove = response;
            this.toastr.successToastr(this.msgApprove.message, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
            this.moreinfo(this.getIdData.projectId);
            this.getAllProject();
          }, err => {
            console.log(err)
            this.msg = err
            this.toastr.infoToastr(this.msg.error.message, 'info', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          });

        }
        else {
          this.toastr.errorToastr('You did not approve project', 'Error', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      });







  }

  reject(comment) {
    var reject = {
      "projectInfo": {
        "projectId": this.getIdData.projectId,
        "status": "Rejected",
        "comment": comment.comments,
        "updatedBy": this.loggedUserName
      },
      "transactionType": "statusUpdate"
    }
    console.log("rejected", reject);

    swal({
      title: "Are you sure?",
      text: "Want to reject the project",

      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((proceed) => {
        if (proceed) {

          this.psaService.saveProject(reject).subscribe(response => {
            console.log("Reject response", response);
            this.msgApprove = response;
            this.toastr.successToastr(this.msgApprove.message, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
            this.moreinfo(this.getIdData.projectId);
            this.getAllProject();
            comment.reset();
          }, err => {
            console.log(err)
            this.msg = err
            this.toastr.infoToastr(this.msg.error.message, 'error', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          });

        }
        else {
          this.toastr.errorToastr('You did not reject project', 'info', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      });
  }




  deleteProject(id) {
    var data = {
      "projectInfo": {
        "projectId": id,
        "updatedBy": this.loggedUserName
      },
      "transactionType": "delete"
    }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this activity!",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((proceed) => {
        if (proceed) {

          this.psaService.saveProject(data).subscribe(response => {
            console.log("delete response", response);
            this.msgdelete = response;
            this.toastr.successToastr(this.msgdelete.message, 'success', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })

            this.getAllProject();
          }, err => {
            console.log(err)
            this.msg = err
            this.toastr.infoToastr(this.msg.error.message, 'error', {
              showCloseButton: true,
              animate: 'slideFromRight'
            })
          });

        }
        else {
          this.toastr.errorToastr('Delete activity not completed', 'info', {
            animate: 'slideFromRight',
            showCloseButton: true,
          });
        }
      });


  }



}
