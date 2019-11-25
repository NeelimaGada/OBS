import { EmployeeClass } from './../../employee.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { HrmsService } from 'src/app/home/services/hrms.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/home/services';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  empObj;
  isEditEnable: boolean = false;
  isEditEnable1: boolean = false;
  isEditEnable2: boolean = false;
  addonboard: boolean;
  addContact: boolean;
  username;
  public eid: any;
  loggeduser: string;
  bankdetailss1: any;
  bankdata: any;
  empbasic: any;
  empbasicinfo: any;



  gen: any
  des: any
  stat: any




  //bank starts
  deleteRes: any;
  employee_bankdetails: any;
  bankdt: any;
  bankuppdate: any;
  banksave: any;
  bank_account_no: any;
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
  rolemanager: boolean;
  rp: any;
  onb: any;
  board: any;
  role: any;
  dataofonb: any;
  contact: boolean;
  iss: boolean;
  doo: any;


  onEdit2() {
    this.isEditEnable2 = !this.isEditEnable2;
    this.isEditEnable = false;
    this.isEditEnable1 = false;
    this.isUpdate = true;

    this.createdby = false;

    // console.log("CILISTTTTT",Cilist);


    //var cid= Cilist.id;
    var getupdatedata = {


      "transactionType": "getById",
      "empInfo": [{
        "empId": this.eid
      }]


    }

    this.hrms.getcontactbyId(getupdatedata).subscribe(res => {

      this.contactgetbyid = res;
      this.contactInfoDetails = this.contactgetbyid.empContacts;
      this.ContactInfo = this.contactInfoDetails[0];


      console.log("this.ContactInfo", this.ContactInfo)

    })
  }


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

  butDisabled: boolean = true;
  getbankdetails() {
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
      console.log("BANK", this.bankdt);
      console.log("sssssssssssssssss bank", this.bankdt.length);
      if (this.bankdt.length > 0) {
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

  AddBank(newUserFormBank) {
    newUserFormBank.reset();
    this.createdByDependent = true;
    this.isupdateDependent = false;
  }


  Onsavebank() {


    var savebank =

    {
      "bankDetails": [{
        "bank_account_no": this.bankdetailss.bank_account_no,
        "bank_name": this.bankdetailss.bank_name,
        "bank_city": this.bankdetailss.bank_city,
        "bank_branch": this.bankdetailss.bank_branch,
        "bank_ifsc_code": this.bankdetailss.bank_ifsc_code,
        "bank_account_status": "Active", //this.bankdetailss.bank_account_status
        "employee_id": this.eid,
        "is_active": this.bankdetailss.is_active,
        "created_by": this.loggeduser
      }

      ],
      "transactionType": "save"
    }
    this.hrms.savebankdetails(savebank).subscribe(response => {
      this.employee_bankdetails = response;
      console.log(this.employee_bankdetails);

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

    this.hrms.updatebankdetails(card2).subscribe(res => { console.log("card 2(bank info) update", card2) });

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



  //bank ends


  //onboarding 


  onEdit1() {

    this.isEditEnable1 = !this.isEditEnable1;
    this.isEditEnable = false;
    this.isEditEnable2 = false;
  }
  onAddOnboard() {
    this.addonboard = !this.addonboard;
    this.isEditEnable1 = false;
    this.board = true;
    this.onb = false;
  }
  tocon: boolean;
  onAddContact() {
    this.addContact = !this.addContact;
    this.isEditEnable2 = false;
    this.contact = true;
    this.tocon = false;
  }



  gender;
  dt: any;
  latest_date: any;
  dateToday = new Date();
  maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  minDate = moment().subtract(118, 'years').format('YYYY-MM-DD');
  maxDate1 = moment().subtract(0, 'years').format('YYYY-MM-DD');
  minDate1 = moment().subtract(80, 'years').format('YYYY-MM-DD');
  manager: {}[];
  employee: {}[];
  managerdata = [];
  empList: any;
  gender1: any;
  statusDate: any;
  updatedOn: any;
  updatedBy: any;
  id: any;
  reportingManager: any;



  onEdit() {
    this.isEditEnable = !this.isEditEnable;
    this.isEditEnable2 = false;
    this.isEditEnable1 = false;
  }

  submit() {
    this.isEditEnable = !this.isEditEnable;
  }

  onSubmit(value) {
    console.log(value);
  }







  message(arg0: string, message: any) {
    throw new Error("Method not implemented.");
  }
  isupdate: boolean;
  createdby: boolean;
  update: boolean;
  // empid: string;


  constructor(private hrms: HrmsService, private dataservice: DataService, private paramroute: ActivatedRoute, private authService: AuthService) {
    this.loggeduser = localStorage.getItem('UserName');
    this.eid = this.dataservice.paramId;
    // this.latest_date =this.date.transform(this.dateToday, 'yyyy-MM-dd');
    this.getEmpRole();
    // this.getempdata();
    this.getCostCenter();
    this.buData = this.getBu();
    this.sbuData = this.getSbu();
    this.getResource();
    this.getStatus();
    //this.getContactInformation();
    this.getEmployeeStatusData();
    this.getDesiginationData();
    this.getgender();

  }
  costData;
  buData;
  sbuData;
  Cilist: any;

  setUserRole;
 

  ngOnInit() {




    this.tocon = true;
    //this.getRole();
    this.getempdataa();
    this.getEmpRole();
    this.getbankdetails();
    // this.getempdata();
    //this.getempdata1();
    this.getContactInformation();

    this.role = localStorage.getItem("Role");
    console.log("helooooooooooooo", this.role);


    this.getEmpRole1();
    setTimeout(() => this.getboardingdetailsbyId(), 500);
    //this.getboardingdetailsbyId()

    if (this.role == "ROLE_HR" || this.role == "ROLE_ADMIN") {
      this.addonboard = true;
      this.addContact = true;
    }


    this.dataservice.getMessage().subscribe(Response => {
      this.message = Response.text;
      console.log("Message from the Basic Info Component", this.message);
    });
    this.getEmpRole();
    //this.getempdata();
    this.setUserRole = localStorage.getItem("setUserRole");
    console.log('role to check user', this.setUserRole);
    if (this.setUserRole == "true") {
      this.user=true;
      
    }






  }

  contactList: any;
  contactInfolist: any;
  contactinfoReq: any;
  transactionType: any;

  deletedcontactDetails: any;
  Email: any;
  personalMobileNo1: any;
  current_Address_Line2: any;
  current_Address_Line1: any;
  alternate_mobileNo: any;
  current_City: any;
  current_State: any;
  current_Pin: any;
  permanent_Address_Line_1: any;
  emp_Id: any;

  contactlist: any;
  savecontactres: any;
  contactinfoArr: any;

  contactgetbyid: any;
  contactInfo: any;
  contactInfoDetails: any;
  empinfoarr: any;


  StateDetails: any;
  StateList: any;
  getcontactontable: any;
  getEmpRole1() {
    if (localStorage.getItem("Role") == "ROLE_USER") {
      this.user = true;
    }
    console.log("Role", this.user);
  }
  public ContactInfo = {
    "id": "",
    "alternateMobileNo": "",
    "currentAddressLine1": "",
    "currentAddressLine2": "",
    "currentCity": "",
    "currentState": "",
    "currentPin": "",
    "permanentAddressLine1": "",
    "empId": "",
    "createdBy": "",
    "updatedBy": "",
    "created_date": "",
    "updated_date": "",
    "flag": ""
  }


  getempdata1() {

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
      console.log("wewewewewewe78415561567845418465261548785", this.empbasicinfo);
    })
  }
  updateRes1: any;
  updateContactdetails() {

    var updateRequestData = {


      "empInfo": [{

        "alternateMobileNo": this.ContactInfo.alternateMobileNo,
        "currentAddressLine1": this.ContactInfo.currentAddressLine1,
        "currentAddressLine2": this.ContactInfo.currentAddressLine2,
        "currentCity": this.ContactInfo.currentCity,

        "currentPin": this.ContactInfo.currentPin,
        "currentState": this.ContactInfo.currentState,
        "permanentAddressLine1": this.ContactInfo.permanentAddressLine1,
        "empId": this.ContactInfo.empId,
        "id": this.ContactInfo.id,
        "updatedBy": this.loggeduser
      }],

      "transactionType": "update"

    }


    console.log("praneeetheeeee", updateRequestData)
    this.hrms.updateContactInfo(updateRequestData).subscribe(res => {
      this.updateRes1 = res;

      console.log(this.updateRes1);
      if (res) {
        swal("Contact Info updated successfully", "", "success");
        //  this.getContactInformation();
      }
      this.getContactInformation();
    })


  }

  setContactInformation(infocontact) {


    var RequestData = {

      "empInfo": [{
        "alternateMobileNo": infocontact.alternateMobileNo,
        "currentAddressLine1": infocontact.currentAddressLine1,
        "currentAddressLine2": infocontact.currentAddressLine2,
        "currentCity": infocontact.currentCity,
        "currentState": Number(infocontact.currentState),
        "currentPin": Number(infocontact.currentPin),
        "permanentAddressLine1": infocontact.permanentAddressLine1,
        "empId": this.eid.toString(),
        "createdBy": this.loggeduser
      }],
      "transactionType": "save"
    }
    console.log("contact logggggggggg", RequestData);
    this.tocon = true;
    this.hrms.setContactInfo(RequestData).subscribe(responce => {
      this.contactinfoReq = responce;
      this.tocon = true;
      console.log("Conatct details Saved ", this.contactinfoReq);
      if (this.contactinfoReq.message == "Employee Certification detail saved successfuly") {

        swal(this.contactinfoReq.message, "", "success");
        this.getContactInformation();
      }
      this.contactinfoArr = this.contactinfoReq.empInfo;
      this.getContactInformation();
    })

  }

  cancelcontact() {
    this.getContactInformation();
    this.addContact = true;
  }

  getContactInformation() {

    var request =
    {
      "empInfo": [
        {
          "empId": this.eid
        }
      ],
      "transactionType": "getById"
    }
    this.tocon = true;
    this.hrms.getContactInfo(request).subscribe(res => {
      this.contactInfolist = res;
      this.contactList = this.contactInfolist.empContacts;
      if (this.contactList[0].alternateMobileNo == null) {
        this.addContact = true;
        this.iss = false;
      }
      else {
        this.addContact = false;
        this.iss = true;
      }
      console.log("contact list", this.contactList);

      console.log("StatesList", this.StateList);
      let states = this.StateList.find(state => state.id == this.contactList[0].currentState);
      console.log("States", states);

      this.contactList[0].currentState = states.stateName;
      console.log("state", this.contactList[0].currentState)
      /*  for(let i in this.StateList){
    
        if(this.contactList.currentState ==this.StateList[i].id){
          console.log("state",this.contactList.currentState)
          this.contactList.currentState=this.StateList[i].stateName
        }else{
          continue
        }
      } */

      for (let i = 0; i <= this.contactList.length; i++) {

        for (let j = 0; j < this.StateList.length; j++) {
          if (this.StateList[j].id == this.contactList[i].current_State) {
            this.getcontactontable = this.StateList[j].stateName;
            console.log("Qualification details");
            console.log(this.getcontactontable);
          }
        }
        this.contactList[i].current_State = this.getcontactontable;
        console.log("Final Educational ");
        console.log(this.contactList);
      }


    })
  }



  getStatus() {
    var request =
    {

      "states":
        [{

        }],

      "sessionId": "1234",
      "transactionType": "getall"

    }
    this.hrms.getStateListMaster(request).subscribe(res => {
      this.StateDetails = res;
      this.StateList = this.StateDetails.statesList;
      console.log("ghhhhjhjhhk", this.StateList);
    })
  }











  data(data: any): any {
    throw new Error("Method not implemented.");
  }
  user: boolean = false;
  getEmpRole() {
    if (localStorage.getItem("Role") == "ROLE_USER") {
      this.user = true;
    }
    if (localStorage.getItem("Role") == "ROLE_MANAGER") {
      this.rolemanager = true;
    }
    console.log("Role", this.rolemanager);
  }


  sbuResp;
  costResp;
  buDetails;
  buList;
  sbuList;
  costCenterList
  buDrop;
  sbuDrop;
  resourceDrop;
  getCostCenter() {
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
      console.log('SBU Data :', this.sbuList);
    });
    return this.sbuList;
  }


  employmentdetailsss: any;
  onboarding: any
  onboardingdetails: any;
  deleteonboarding: any;


  onboard_details: any;
  onboard_details_by_id: any;
  onboardRes: any;
  onboardingdropdown: any;

  emptyRecord: boolean;
  getResourceDetails: any;
  getResourceList: any;
  cid;
  rid;
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
      console.log("EMPLOYEEEMENT DETAILS", this.employmentdetailsss)
      this.onboarding = this.employmentdetailsss.employmentDetailsList;

      console.log('Empty Record : ', this.emptyRecord);
      console.log(this.onboarding);
      for (let i = 0; i <= this.onboarding.length; i++) {
        for (let j = 0; j < this.getResourceList.length; j++) {
          if (this.getResourceList[j].id == this.onboarding[i].resourceType) {
            this.rid = this.getResourceList[j].id
            this.onboardingdropdown = this.getResourceList[j].resourceTypeName;
            console.log("Qualification details");
            console.log(this.rid, "BASHA")
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

  saveemploymentdetailsOnboarding(onboard) {
    var user = "user";
    var saveemploymentdetailss =
    {
      "employmentDetails": [{
        "employeeId": this.eid.toString(),
        "joiningDate": onboard.joiningDate,
        "resourceType": Number(onboard.resourceType),
        "bondStatus": onboard.bondStatus,

        "flag": true,

        "costCenterId": Number(onboard.costCenter),
        "buId": Number(onboard.bu),
        "sbuId": Number(onboard.sbu),
        "createdBy": this.loggeduser
      }],
      "transactionType": "save"
    }
    /*  if (this.onboarddetailsss.joiningDate > this.onboarddetailsss.resignationDate) {
       swal("joining date is greater than exit date");
     } */
    // else {
    console.log('Save Request : ', saveemploymentdetailss);
    this.onb = true;
    this.addonboard;
    this.hrms.saveonboardingdetails(saveemploymentdetailss).subscribe(response => {
      this.onboardingdetails = response;
      console.log("dddddddddddddddddddddddddddddone", this.onboardingdetails);
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
      console.log(this.getResourceList, "RESOURCE LIST");
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
  restype: any;
  onBoardRecord;
  cancelonboarding() {
    this.getboardingdetailsbyId();
    this.addonboard = true;
  }
  getboardingdetailsbyId() {
    this.onb = true;

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
      console.log("ffffff", response)
      this.onboard_details = response;

      this.onboarddetailsss = this.onboard_details.employmentDetailsList[0];
      if (this.onboarddetailsss.joiningDate == null) {
        this.addonboard = true;
        this.doo = false;
      }
      else {
        this.addonboard = false;
        this.doo = true;
      }

      //console.log("ID OF SRIKANTH",this.onboarddetailsss);
      this.dataofonb = this.onboarddetailsss.joiningDate;
      let onList = this.onboard_details.employmentDetailsList;
      this.emptyRecord = (onList.length == 0);
      //this.onBoardRecord = this.onboarddetailsss[0];
      //this.onboarddetailsss = this.onboard_details_by_id[0];
      //console.log("this.onboarddetailsss", this.onboarddetailsss);

      // console.log('Inside if***', this.costCenterList);
      //console.log('Cost id : ', this.onboarddetailsss);


      // this.restype=this.onboarddetailsss.resourceType;
      // for(let i in this.getResourceList){
      //   if(this.onboarddetailsss.resourceType==this.onboarddetailsss[i].id){
      //     this.onboarddetailsss.resourceType=this.onboarddetailsss[i].gender
      //   }else{
      //     continue
      //   }
      // }


      if (this.onboarddetailsss.bondStatus == 'true') {
        this.onboarddetailsss.bondStatus = 'Yes';
      } else {
        this.onboarddetailsss.bondStatus = 'No';
      }
      let cost = this.costCenterList.find(con => con.id == this.onboarddetailsss.costCenterId);
      console.log('Cost Details : ', cost)
      // console.log('Cost code : ', cost.costCenterCode);
      this.cid = cost.id
      this.onboarddetailsss.costCenterId = cost.costCenterCode;
      let bu = this.buList.find(con => con.id == this.onboarddetailsss.buId);
      console.log('BU code : ', bu.businessUnitName);
      this.onboarddetailsss.buId = bu.businessUnitName;
      let sbu = this.sbuList.find(con => con.id == this.onboarddetailsss.sbuId);
      console.log('SBU code : ', sbu.name);
      this.onboarddetailsss.sbuId = sbu.name;
      let resorce = this.getResourceList.find(con => con.id == this.onboarddetailsss.resourceType);
      this.rid = resorce.id
      console.log('Resource Type : ', resorce.resourceTypeName);
      this.onboarddetailsss.resourceType = resorce.resourceTypeName;
      //this.getResourceList;
    });
  }

  joiningDate: any;
  resourceType: any;
  costCenterId: any;
  buId: any;
  sbuId: any;
  bondStatus: any;

  updateonboard(obj) {
    var user = user;
    var card1 = {
      "employmentDetails": [{
        "id": obj.id,
        //"employeeId": this.onboarddetailsss.employeeId,
        "joiningDate": obj.joiningDate,
        "resourceType": obj.resourceType,
        "bondStatus": obj.bondStatus,
        // "resignationDate": "",
        // "exitDate": "",
        // "separationType": "",
        "costCenterId": obj.costCenterId,
        "buId": obj.buId,
        "sbuId": obj.sbuId,
        "updatedBy": this.loggeduser,
        //"updatedDate":"2019-09-16 ",

      }],

      "transactionType": "update"
    }

    console.log("nariiiiiiiiiiiiiiii", card1)
    // this.hrms.updateonboardingdetails(card1).subscribe(res=>{console.log("card1 updated info",card1)});
    this.hrms.updateonboardingdetails(card1).subscribe(res => {
      this.onboardRes = res;
      console.log('Onboard update resp : ', this.onboardRes);
      if (res) {
        swal(this.onboardRes.statusMessage, "", "success");
        this.getboardingdetailsbyId();
      }
      // if (this.onboardRes.statusMessage == "Data is updated successfully") {
      //   swal(this.onboardRes.statusMessage, "", "success");
      //   //this.getemploymentdetails();
      //   //this.getboardingdetailsbyId();
      //   this.getboardingdetailsbyId();
      // }
    })

  }

  updateonboard1() {
    var user = user;
    var updatenboarddetails = {
      "employmentDetails": [{
        "id": this.onboarddetailsss.id,
        "employeeId": this.eid,
        "joiningDate": this.onboarddetailsss.joiningDate,
        "resourceType": this.rid,
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
    console.log("card1 data", updatenboarddetails);
    console.log("resignation", this.onboarddetailsss.resignationDate)
    this.hrms.updateonboardingdetails(updatenboarddetails).subscribe(res => {
      this.onboardRes = res;
      console.log('Onboard update resp : ', this.onboardRes);
      if (this.onboardRes.statusMessage == "Data is updated successfully") {
        swal(this.onboardRes.statusMessage, "", "success");
        //this.getemploymentdetails();
        //this.getboardingdetailsbyId();
      }
      if (res) {
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

  OnSave(newUserFormOnboard) {
    newUserFormOnboard.reset();
    this.createdByDependent = true;
    this.isupdateDependent = false;
  }


  selectOption(rt) {
    console.log("resource selected", rt);
    this.resourceDrop = this.getResourceList.filter(con => con.id == rt);
    console.log("resourcetype:", this.resourceDrop);
  }

  selectBu(ev) {
    console.log('Cost selected', ev);
    this.buDrop = this.buList.filter(con => con.costCenterId == ev);
    console.log('BU drop : ', this.buDrop);
    // this.onboarddetailsss[0].buId = bu.businessUnitName;
  }
  selectSbu(ev) {
    console.log('Bu selected', ev);
    this.sbuDrop = this.sbuList.filter(con => con.businessUnitId == ev);
    console.log('SBU drop : ', this.sbuDrop);
    // this.onboarddetailsss[0].buId = bu.businessUnitName;
  }


  //onboarding ends











  // emp basic starts //
  isUpdate: boolean;
  emp_fname: any;
  emp_mname: any;
  emp_lname: any;
  emp_dob: any;
  emp_status: any;
  emp_statusDate: any;
  emp_reportingmanager: any;
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
  firstname: any;
  middlename: any;
  lastname: any;
  status: any;

  dob: any;

  title: any;
  reportingmanager: any;

  createdBy: any;
  employeeId: any;
  email: any;
  officialEmail: any;
  personalMobileNo: any;

  empDesignationDetails: any;
  empDesignationlist: any;


  basicempstatus: any;
  empbasicstatus: any;
  empgender: any;
  empgenderinfo: any;
  createdby1: any;
  employee_Status: any;

  employee_statuslist: any;

  isactive: boolean;
  isave: any;
  getRoleDetails: any;
  roleManagemenList: any;


  addempUnit(newUserForminfo) {
    newUserForminfo.reset();


  }

  empinobj =
    {
      "id": "",
      "firstname": "",
      "middlename": "",
      "lastname": "",
      "status": "",
      "statusDate": "",
      "dob": "",
      "gender": "",
      "title": "",
      "reportingManager": "",
      "employeeId": "",
      "updatedBy": "",
      "createdBy": "",
      "email": "",
      "officialEmail": "",
      "personalMobileNo": "",
      "updatedOn": ""

    }


  getgenderdata: any;
  getstatusdata: any;
  employeeStatusList: any;
  getstatusontable: any;
  getroleontable: any;

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
      console.log("emphhg", this.empbasicinfo[0]);

      if (this.employee_statuslist && this.empDesignationlist && this.empgenderinfo) {

        for (let i = 0; i < this.empbasicinfo.length; i++) {

          for (let j = 0; j < this.employee_statuslist.length; j++) {
            if (this.employee_statuslist[j].id == this.empbasicinfo[i].status) {
              this.getstatusontable = this.employee_statuslist[j].status;
              console.log("Qualification details");
              console.log('getstatusontable :', this.getstatusontable);
            }
          }
          this.empbasicinfo[i].status = this.getstatusontable;
          console.log("Final Educational ");
          console.log(this.empbasicinfo);
        }

        for (let i = 0; i < this.empbasicinfo.length; i++) {
          for (let j = 0; j < this.empgenderinfo.length; j++) {
            if (this.empgenderinfo[j].gender == this.empbasicinfo[i].id) {
              this.gender = this.empgenderinfo[j].gender;
              console.log("Qualification details");
              console.log(this.gender);
            }
          }
          this.empbasicinfo[i].gender = this.gender;
          console.log("Final Educational ");
          console.log(this.empbasicinfo);
        }

      }
    })
  }

  addSkillvalue(newUserForminfo) {
    newUserForminfo.reset()
    this.isUPDATEDBY = false;
    this.CREATEDBY = true;
  }
  isUPDATEDBY = false;
  CREATEDBY = true;

  saveemployeeInfo() {
    if (new Date(this.empinobj.dob) < this.dateToday) {
      swal("Please enter a valid date", "", "error");
    }
    var request = {
      "employeeInfo": [{

        "firstname": this.empinobj.firstname,
        "middlename": this.empinobj.middlename,
        "lastname": this.empinobj.lastname,
        "status": this.empinobj.status,
        "dob": this.empinobj.dob,
        "gender": this.empinobj.gender,
        "title": this.empinobj.title,
        "reportingmanager": this.empinobj.reportingManager,
        "createdBy": this.loggeduser,
        "employeeId": this.empinobj.employeeId,
        "email": this.empinobj.email,
        "officialEmail": this.empinobj.officialEmail,
        "personalMobileNo": this.empinobj.personalMobileNo
      }],
      "transactionType": "save"
    }

    this.hrms.saveempinfo(request).subscribe(res => {
      this.basicinfo = res;


      console.log('save basicinfo', this.basicinfo);
      if (this.basicinfo.message == "Successfully record updated") {
        swal(this.basicinfo.message, "", "success");


      }
    },
      error => {
        swal(this.basicinfo.message, "", "error");

        this.getempdata();
      })




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
      console.log(this.delete_data);
      if (this.delete_data.message == "Successfully record deleted") {
        swal(this.delete_data.message, "", "success");


      }
      this.getempdata();
    })

  }

  updatecardinfo() {
    var card =
    {
      "employeeInfo": [{


        "firstname": this.empObj.firstname,
        "middlename": this.empObj.middlename,
        "lastname": this.empObj.lastname,
        "status": this.stat,
        "statusDate": this.empObj.statusDate,
        "dob": this.empObj.dob,
        "gender": this.gen,
        "title": this.des,
        "reportingManager": this.empObj.reportingManager,
        "employeeId": this.empObj.employeeId,
        "email": this.empObj.email,
        "officialEmail": this.empObj.officialEmail,
        "personalMobileNo": this.empObj.personalMobileNo,
        "updatedBy": this.loggeduser,
        "image":this.empObj.image,
        "id": this.empObj.id
      }],
      "transactionType": "update"
    }



    console.log("ergh", card)
    this.hrms.updateempinfo(card).subscribe(res => {

      this.updateRes1 = res;

      console.log(this.updateRes1, "dfghjkvdl;dhgch btiofghvxgfyuegfdhgifdjhgv yudgvjhgfyuse");
      if (this.updateRes1.message == "Successfully record updated") {
        swal(this.updateRes1.message, "", "success");
      }
      if (res) {
        // this.getempdataa();
        this.getempdataa();
      }
    })
  }











  updateemployeeinfo(req) {
    var updateempreq =
    {

      "employeeInfo": [{

        "firstname": this.empinobj.firstname,
        "middlename": this.empinobj.middlename,
        "lastname": this.empinobj.lastname,
        "status": this.empinobj.status,
        "statusDate": this.empinobj.statusDate,
        "dob": this.empinobj.dob,
        "gender": this.empinobj.gender,
        "title": this.empinobj.title,
        "reportingManager": this.empinobj.reportingManager,
        "employeeId": this.empinobj.employeeId,
        "email": this.empinobj.email,
        "officialEmail": this.empinobj.officialEmail,
        "personalMobileNo": this.empinobj.personalMobileNo,
        "updatedBy": this.loggeduser,
        "id": this.empinobj.id

      }],
      "transactionType": "update"
    }



    this.hrms.updateempinfo(updateempreq).subscribe(res => {
      this.updateempdata = res;
      console.log("response of update", this.updateempdata)
      console.log('updateempdata.............................', this.updateempdata);
      console.log('empinobj..........', this.empinobj)
      if (this.updateempdata.message == "Successfully record updated") {
        swal(this.updateempdata.message, "", "success");
        this.getempdataa();

      }
    },

      error => {
        swal(this.updateempdata.message, "", "error");
        this.getempdataa();
      })



  }
  getbyIdbasicdata(empbasic: { id: any; }) {

    this.isUPDATEDBY = true;
    this.CREATEDBY = false;
    var empdataid = empbasic.id;
    var GetUpdatebasicInfo = {
      "employeeInfo": [{
        "id": empdataid
      }],
      "transactionType": "getById"

    }
    this.hrms.getbyIdempinfo(GetUpdatebasicInfo).subscribe(res => {
      this.basicInfobyid = res;
      console.log("kkkk", this.basicInfobyid)
      this.basicInfoDetails = this.basicInfobyid.employeeInfo;
      this.empinobj = this.basicInfoDetails[0];
      console.log("this.basicUnitObj", this.empinobj);
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
      console.log("Selected Gender data", this.empgenderinfo);
    })


  }


  getDesiginationData() {
    var request = {
      "designation": [

      ],
      "sessionId": "3121",
      "transactionType": "getall"
    }
    this.hrms.getEmployeeDesignation(request).subscribe(res => {
      this.empDesignationDetails = res;
      this.empDesignationlist = this.empDesignationDetails.listDesignation;
      console.log("Designation", this.empDesignationlist)
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
      console.log(this.employee_Status);
    })

  }
  getRole() {
    var request = {

      "transactionType": "getAll"
    }

    this.hrms.getRoleManagement(request).subscribe(res => {
      this.getRoleDetails = res;
      this.roleManagemenList = this.getRoleDetails.roleManagementList;
      console.log(this.getRoleDetails);
    })
  }
  // getEmpDesignation(){
  //     var request = {
  //       "designation":[

  //       ],
  //       "sessionId":"3121",
  //       "transactionType":"getall"
  //   }
  //      this.hrms.getEmployeeDesignation(request).subscribe(res =>{
  //       this.empDesignationDetails = res;
  //       console.log("Response : ",this.empDesignationDetails)
  //       this.empDesignationlist = this.empDesignationDetails.listDesignation;
  //       console.log("designation",this.empDesignationDetails);
  //      })
  //   }

  man: any;
  getempdataa() {
    var empinfo =
    {
      "employeeInfo": [{

      }],
      "transactionType": "getall"
    }

    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.empList = this.empbasic.employeeInfo;
      this.empObj = this.empList.filter(obj => obj.employeeId == this.eid)[0];
      console.log('Emp obj : **', this.empObj);
      this.gen = this.empObj.gender
      this.stat = this.empObj.status
      this.des = this.empObj.title

      for (let i in this.empgenderinfo) {
        if (this.empObj.gender == this.empgenderinfo[i].id) {
          this.empObj.gender = this.empgenderinfo[i].gender
        } else {
          continue
        }
      }
      for (let j in this.employee_statuslist) {
        if (this.empObj.status == this.employee_statuslist[j].id) {
          this.empObj.status = this.employee_statuslist[j].status
        }
        else {
          continue;
        }
      }
      for (let k in this.empDesignationlist) {
        if (this.empObj.title == this.empDesignationlist[k].id) {
          this.empObj.title = this.empDesignationlist[k].designation
        } else {
          continue
        }
      }

      this.username = this.empObj.firstname + " " + this.empObj.middlename + " " + this.empObj.lastname;

      this.manager = Array.from(new Set(this.empList.map(x => x.reportingManager)));
      this.employee = Array.from(new Set(this.empList.map(x => x.employeeId)));
      console.log(this.employee, "only employessssssssss........")
      console.log(this.manager, "only managers in employee info...................");
      for (let n = 0; n <= this.manager.length; n++) {
        for (let m = 0; m < this.employee.length; m++) {

          if (this.manager[n] == this.employee[m]) {
            this.managerdata.push(this.empList[m]);
            console.log("recent shivaaaaaaaaaaaaaaaa", this.managerdata)
          }
        }
      }
      // for(let l in this.managerdata){
      //   if(this.empObj.reportingManager==this.managerdata[l].employeeId){
      //     this.empObj.reportingManager=this.managerdata[l].firstname+' '+this.managerdata[l].lastname
      //   }else{
      //     continue
      //   }
      // }

    })

  }




}