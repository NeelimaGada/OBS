import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HrmsService } from '../services/hrms.service';
import { TimesheetService } from './tms_services/timesheet.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import swal from 'sweetalert';
@Component({
  selector: 'app-timesheetmanagement',
  templateUrl: './timesheetmanagement.component.html',
  styleUrls: ['./timesheetmanagement.component.scss']
})
export class TimeSheetManagementComponent {


  constructor(private week_form: FormBuilder, private hrms: HrmsService, private tms: TimesheetService, private toastr: ToastrManager) { }

  //declarations
  login: any
  eid: any
  r_name: any
  r_manager: any
  empJoiningDate: any
  dates: any = []
  len: any
  calender_date: any
  activities: any
  count: any = 0
  data: any
  tsrecords: any
  d: any
  reqEmp: any
  total_loggedhours: any = 0
  filename: any
  filedata: any
  maxdate: any
  teamdata: any
  holidays:any=['2019-11-4','2019-10-02']
  //for if conditions
  navbar: any = false
  card: any = false
  user: any = false
  userbtn: any = false
  tmstable: any = false
  p_week: any = true
  n_week: any = true
  addBtn: any = true
  saveBtn: any = false
  submitBtn: any = true
  pending: any = false
  approved: any = false
  rejected: any = false
  approveReject_status = true
  team: any = false
  managerbtn: any = false
  read: any = false
  closebtn:any=false
  //end declarations
 //days total calculation

 mon:any=0;
 tue:any=0;
 wed:any=0;
 thu:any=0;
 fri:any=0;
 sat:any=0;
 sun:any=0;

 //holiday color
 mh:any=null
 th:any=null
 wh:any=null
 thh:any=null
 fh:any=null
  //back to top

  isShow: boolean;
  topPosToStartShowing = 100;
  //Form for timesheets
  TimeSheets = new FormGroup({
    timesheetId: new FormControl,
    statusId: new FormControl,
    comments: new FormControl,
    fileName: new FormControl,
    attachment: new FormControl,
    week_ts: new FormArray([
      new FormGroup({
        activity: new FormControl('',[Validators.required]),
        total:new FormControl,
        monday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
        tuesday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
        wednesday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
        thursday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
        friday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
        saturday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
        sunday: new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
      })
    ])
  })
  ngOnInit() {
    this.role()
    this.maxdate = new Date();
  }

  //adding new activity 
  add_activity() {
    (this.TimeSheets.get('week_ts') as FormArray).push(this.week_form.group({
      activity: ['',Validators.required],
      total:new FormControl,
      monday: new FormGroup({
        recordId: new FormControl,
        loggedHours: new FormControl('', [Validators.max(24)]),
        projectId: new FormControl
      }),
      tuesday:
        new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
      wednesday:
        new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
      thursday:
        new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
      friday:
        new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
      saturday:
        new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
      sunday:
        new FormGroup({
          recordId: new FormControl,
          loggedHours: new FormControl('', [Validators.max(24)]),
          projectId: new FormControl
        }),
    }))
    console.log("Add activity : ", this.TimeSheets);
    this.saveBtn=false
    this.TimeSheets.controls.fileName.disable()
  }

  //funtion for delete activity
  delete_activity(e) {
    if (e >= this.activities) {
      console.log(e)
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this activity!",
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            (this.TimeSheets.get('week_ts') as FormArray).removeAt(e);
            this.toastr.successToastr('Activity successfully deleted', 'Success', {
              animate: 'slideFromRight',
              showCloseButton: true,
            });
          }
        });
    } else {
      this.toastr.errorToastr('You can not delete saved data', 'Error', {
        animate: 'slideFromRight',
        showCloseButton: true,
      });
    }

  }

  role() {
    let role = localStorage.getItem("Role")
    this.login = localStorage.getItem("UserName")
    if (role == "ROLE_USER") {
      this.closebtn=false
      this.card = true
      this.user = true
      this.userbtn = true
      this.tmstable = true
      this.read = false
      this.reqEmp = this.login
      this.getempinfo()
      this.getEmpOnBoarding()
      this.get_Timesheetdates()
      this.getTimesheetsdetails();

    }
    if (role == "ROLE_MANAGER") {
      this.navbar = true
      this.mysheet()
    }

    if (role == "ROLE_HR") {
      this.closebtn=false
      this.card = true
      this.user = true
      this.userbtn = true
      this.tmstable = true
      this.team = false
      this.managerbtn = false
      this.read = false
      this.reqEmp = this.login
      this.getempinfo()
      this.getEmpOnBoarding()
      this.get_Timesheetdates()
      this.getTimesheetsdetails();
    }
    if (role == "ROLE_ADMIN") {
      this.closebtn=false
      this.card = true
      this.user = true
      this.userbtn = true
      this.tmstable = true
      this.team = false
      this.managerbtn = false
      this.read = false
      this.reqEmp = this.login
      this.getempinfo()
      this.getEmpOnBoarding()
      this.get_Timesheetdates()
      this.getTimesheetsdetails();
    }
  }


  mysheet() {
    this.count = 0
    console.log("count", this.count)
    this.card = true
    this.closebtn=false
    this.user = true
    this.userbtn = true
    this.tmstable = true
    this.team = false
    this.managerbtn = false
    this.read = false
    this.reqEmp = this.login
    this.getempinfo()
    this.getEmpOnBoarding()
    this.get_Timesheetdates()
    this.getTimesheetsdetails();
  }
  teamsheet() {
    this.closebtn=false
    this.team = true
    this.card = false
    this.user = false
    this.tmstable = false
    this.reqEmp = this.login
    this.getemployeeList(this.reqEmp)
  }
  getteamsheet(e) {
    console.log("data", e)
    this.count = 1
    console.log("count", this.count)
    this.closebtn=true
    this.team = false
    this.managerbtn = true
    this.card = true
    this.user = true
    this.userbtn = false
    this.tmstable = true
    this.reqEmp = e
    this.getempinfo()
    this.getEmpOnBoarding()
    this.get_Timesheetdates()
    this.getTimesheetsdetails();
    if (this.count == 1) {
      this.addBtn = false
      this.read = true;
    }
  }
  close(){
    this.teamsheet()
  }
  getempinfo() {
    var empinfo =
    {

      "employeeInfo": [{
        "employeeId": this.reqEmp
      }],
      "transactionType": "getbyid"
    }
    let emp_info
    this.hrms.getempinfo(empinfo).subscribe(res => {
      emp_info = res
      let emp_data = emp_info.employeeInfo
      this.eid = emp_data[0].employeeId
      this.r_manager = emp_data[0].reportingManager
      this.getreportingmanager(this.r_manager)

    })
  }
  getreportingmanager(e) {
    var obj = {
      "employeeInfo": [{
        "employeeId": e
      }],
      "transactionType": "getbyid"
    }
    let data
    this.hrms.getempinfo(obj).subscribe(res => {
      data = res
      console.log(data, "hello")
      var fs = data.employeeInfo[0].firstname
      var ls = data.employeeInfo[0].lastname
      this.r_name = fs[0].toUpperCase() + fs.slice(1) + " " + ls[0].toUpperCase() + ls.slice(1)
      console.log("one", this.r_name)
    })
  }


  getEmpOnBoarding() {
    var requestobj =
    {
      "employmentDetails": [{
        "employeeId": this.reqEmp
      }],
      "transactionType": "getAll"
    }
    let empOnboarding
    this.hrms.getonboardingdetails(requestobj).subscribe(res => {
      console.log("onboarding details", res)
      empOnboarding = res
      this.empJoiningDate = empOnboarding.employmentDetailsList[0].joiningDate
      console.log("Employee Joining Date", this.empJoiningDate)
    })
  }

  //getting timesheets function
  get_Timesheetdates() {
    this.mh=null
    this.th=null
    this.wh=null
    this.thh=null
    this.fh=null
    this.dates = []
    var date = new Date();
    var today = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDay()
    var n = 1;
    while (n <= 7) {
      var from = new Date(year, month, today - (day - n))
      this.dates.push(from)
      n++;
    }
    console.log("dates", this.dates)
    this.len = this.dates.length
    this.n_week = false
    for(let i in this.holidays){
      for(let j in this.dates){
        if(this.holidays[i]==this.formatDate(this.dates[j])){
            console.log("holiday",this.holidays[i])
            if(this.dates[j].getDay()==1)
            this.mh="#F5DEB3"
            if(this.dates[j].getDay()==2)
            this.th="#F5DEB3"
            if(this.dates[j].getDay()==3)
            this.wh="#F5DEB3"
            if(this.dates[j].getDay()==4)
            this.thh="#F5DEB3"
            if(this.dates[j].getDay()==5)
            this.fh="#F5DEB3"
        }
      }
    }
    //this.timesheet_details_status = false;
  }
  //end getting timesheets function


  //get calender date
  getcalender_dates() {
    this.mh=null
    this.th=null
    this.wh=null
    this.thh=null
    this.fh=null
    this.dates = []
    this.n_week = true
    this.p_week = true
    var currentDate = new Date();
    console.log("input date", this.calender_date);
    var date = new Date(this.calender_date)
    console.log("calender date", date);
    var today = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDay()
    var n = 1;
    while (n <= 7) {
      var from = new Date(year, month, today - (day - n))
      this.dates.push(from)
      n++;
    }
    console.log("dates", this.dates)
    this.len = this.dates.length
    for (let i in this.dates) {
      if (this.empJoiningDate== this.formatDate(this.dates[i])) {
        this.p_week = false
        this.n_week = true
        console.log("true dates are equal joining")
      }
    }
    for (let i in this.dates) {
      if (this.formatDate(currentDate) == this.formatDate(this.dates[i])) {
        this.n_week = false
        this.p_week = true
        console.log("true dates are equal current")
      }
    }
    for(let i in this.holidays){
      for(let j in this.dates){
        if(this.holidays[i]==this.formatDate(this.dates[j])){
            console.log("holiday",this.holidays[i])
            if(this.dates[j].getDay()==1)
            this.mh="#F5DEB3"
            if(this.dates[j].getDay()==2)
            this.th="#F5DEB3"
            if(this.dates[j].getDay()==3)
            this.wh="#F5DEB3"
            if(this.dates[j].getDay()==4)
            this.thh="#F5DEB3"
            if(this.dates[j].getDay()==5)
            this.fh="#F5DEB3"
        }
      }
    }
    this.clearTimeSheets();
    this.getTimesheetsdetails();
    if (this.count == 1) {
      console.log("count", this.count)
      this.read = true
      this.addBtn = false
    }

  }


  // previous week_timesheets
  previous_week() {
    this.mh=null
    this.th=null
    this.wh=null
    this.thh=null
    this.fh=null
    this.calender_date = null
    this.n_week = true
    var today = this.dates[0].getDate() - 7
    console.log("calender date", today);
    var month = this.dates[0].getMonth();
    var year = this.dates[0].getFullYear();
    var day = this.dates[0].getDay()
    this.dates = []
    var n = 1;
    while (n <= 7) {
      var from = new Date(year, month, today - (day - n))
      this.dates.push(from)
      n++;
    }
    console.log("dates", this.dates)
    this.len = this.dates.length
    for (let i in this.dates) {
      if (this.empJoiningDate == this.formatDate(this.dates[i])) {
        this.p_week = false
        console.log("true dates are equal")
      }
    }
    for(let i in this.holidays){
      for(let j in this.dates){
        if(this.holidays[i]==this.formatDate(this.dates[j])){
            console.log("holiday",this.holidays[i])
            if(this.dates[j].getDay()==1)
            this.mh="#F5DEB3"
            if(this.dates[j].getDay()==2)
            this.th="#F5DEB3"
            if(this.dates[j].getDay()==3)
            this.wh="#F5DEB3"
            if(this.dates[j].getDay()==4)
            this.thh="#F5DEB3"
            if(this.dates[j].getDay()==5)
            this.fh="#F5DEB3"
        }
      }
    }
    //this.timesheet_details_status = false;
    this.clearTimeSheets();
    this.getTimesheetsdetails();
    if (this.count == 1) {
      console.log("count", this.count)
      this.read = true
      this.addBtn = false
    }

  }
  next_week() {
    this.mh=null
    this.th=null
    this.wh=null
    this.thh=null
    this.fh=null
    this.calender_date = null
    this.p_week = true
    var currentDate = new Date();
    var today = this.dates[0].getDate() + 7
    console.log("calender date", today);
    var month = this.dates[0].getMonth();
    var year = this.dates[0].getFullYear();
    var day = this.dates[0].getDay()
    this.dates = []
    var n = 1;
    while (n <= 7) {
      var from = new Date(year, month, today - (day - n))
      this.dates.push(from)
      n++;
    }
    console.log("dates", this.dates)
    this.len = this.dates.length
    this.clearTimeSheets();
    this.getTimesheetsdetails();
    if (this.count == 1) {
      console.log("count", this.count)
      this.read = true
      this.addBtn = false
    }
    for (let i in this.dates) {
      if (this.formatDate(currentDate) == this.formatDate(this.dates[i])) {
        this.n_week = false
        console.log("true dates are equal")
      }
    }
    for(let i in this.holidays){
      for(let j in this.dates){
        if(this.holidays[i]==this.formatDate(this.dates[j])){
            console.log("holiday",this.holidays[i])
            if(this.dates[j].getDay()==1)
            this.mh="#F5DEB3"
            if(this.dates[j].getDay()==2)
            this.th="#F5DEB3"
            if(this.dates[j].getDay()==3)
            this.wh="#F5DEB3"
            if(this.dates[j].getDay()==4)
            this.thh="#F5DEB3"
            if(this.dates[j].getDay()==5)
            this.fh="#F5DEB3"
        }
      }
    }
  }
  //clear timesheets function

  clearTimeSheets() {
    this.TimeSheets.reset()
    let array = <FormArray>this.TimeSheets.get('week_ts')
    while (array.length) {
      array.removeAt(array.length - 1);
    }
    this.activities = 0
    this.add_activity();
  }

  getTimesheetsdetails() {
    this.mon=0
    this.tue=0
    this.wed=0
    this.thu=0
    this.fri=0
    this.sat=0
    this.sun=0
    this.clearTimeSheets()
    this.addBtn = true
    this.saveBtn = false
    this.submitBtn = true
    this.pending = false
    this.approved = false
    this.rejected = false
    this.read = false
    let error
    this.approveReject_status = true
    this.TimeSheets.controls.fileName.enable()
    console.log("getting dates", this.dates)
    this.activities = 0
    var requestobj = {
      "sheet":
      {
        "employeeId": this.reqEmp,
        "timeSheetStartDate": this.formatDate(this.dates[0])
      },
      "transactionType": "getByEmpId"
    }
    console.log("get request object",requestobj)
    this.tms.getTimesheets(requestobj).subscribe(res => {
      this.data = res
      console.log("get timesheets", this.data)
      this.d = this.TimeSheets.get('week_ts')
      for (let i in this.data.timesheetList) {
        this.tsrecords = this.data.timesheetList[i].record
        console.log("records", this.tsrecords)
        let set = new Set();
        for (let j in this.tsrecords) {
          set.add(this.tsrecords[j].activityType)
        }
        console.log("common activities", set)
        var activityarr = Array.from(set);
        var len = activityarr.length
        this.activities = len;
        console.log("number of activities", len)
        var c = 0;
        var activityTotal
        for (let b in activityarr) {
          
          if (c == 0 && c < len) {
            activityTotal=0
            for (let l in this.tsrecords) {
              for (let a in this.dates) {
                if ((this.formatDate(new Date(this.tsrecords[l].date))) == (this.formatDate(this.dates[a])) && this.tsrecords[l].activityType == activityarr[b]) {
                  console.log("detes are equal")
                  var day = this.dates[a].getDay()
                  if (day == 1) {
                    this.d.controls[c].get('monday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.mon=this.mon+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('monday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('monday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                  else if (day == 2) {
                    this.d.controls[c].get('tuesday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.tue=this.tue+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('tuesday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('tuesday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);

                  }
                  else if (day == 3) {
                    this.d.controls[c].get('wednesday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.wed=this.wed+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('wednesday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('wednesday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);

                  }
                  else if (day == 4) {
                    this.d.controls[c].get('thursday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.thu=this.thu+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('thursday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('thursday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);

                  }
                  else if (day == 5) {
                    this.d.controls[c].get('friday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.fri=this.fri+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('friday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('friday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                  else if (day == 6) {
                    this.d.controls[c].get('saturday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.sat=this.sat+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('saturday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('saturday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                  else if (day == 0) {
                    this.d.controls[c].get('sunday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.sun=this.sun+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('sunday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('sunday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                }
              }
              console.log('total',activityTotal)
              this.d.controls[c].get('total').setValue(activityTotal);
            }
            c++;
          }
          else if (c > 0 && c < len) {
            activityTotal=0
            this.add_activity();
            console.log("activity added in get method")
            for (let l in this.tsrecords) {
              for (let a in this.dates) {
                if ((this.formatDate(new Date(this.tsrecords[l].date))) == (this.formatDate(this.dates[a])) && this.tsrecords[l].activityType == activityarr[b]) {
                  var day = this.dates[a].getDay()
                  if (day == 1) {
                    this.d.controls[c].get('monday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.mon=this.mon+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('monday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('monday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                  else if (day == 2) {
                    this.d.controls[c].get('tuesday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.tue=this.tue+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('tuesday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('tuesday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);

                  }
                  else if (day == 3) {
                    this.d.controls[c].get('wednesday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.wed=this.wed+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('wednesday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('wednesday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);

                  }
                  else if (day == 4) {
                    this.d.controls[c].get('thursday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.thu=this.thu+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('thursday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('thursday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);

                  }
                  else if (day == 5) {
                    this.d.controls[c].get('friday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.fri=this.fri+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('friday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('friday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                  else if (day == 6) {
                    this.d.controls[c].get('saturday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.sat=this.sat+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('saturday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('saturday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                  else if (day == 0) {
                    this.d.controls[c].get('sunday').controls.loggedHours.setValue(this.tsrecords[l].hoursLogged);
                    this.sun=this.sun+this.tsrecords[l].hoursLogged
                    activityTotal=activityTotal+this.tsrecords[l].hoursLogged
                    this.d.controls[c].get('sunday').controls.recordId.setValue(this.tsrecords[l].recordId);
                    this.d.controls[c].get('sunday').controls.projectId.setValue(this.tsrecords[l].projectId);
                    this.d.controls[c].get('activity').setValue(this.tsrecords[l].activityType);
                  }
                }
              }
              console.log('total',activityTotal)
              this.d.controls[c].get('total').setValue(activityTotal);
            }
            c++;
          }
        }
        this.TimeSheets.controls.timesheetId.setValue(this.data.timesheetList[i].timeSheetID)
        this.TimeSheets.controls.statusId.setValue(this.data.timesheetList[i].timesheet_status.statusId)
        this.TimeSheets.controls.comments.setValue(this.data.timesheetList[i].timesheet_status.comment)
        if (this.data.timesheetList[i].timesheet_status.submissionState == 1) {
          this.addBtn = false
          this.saveBtn = true
          this.submitBtn = true
          this.approveReject_status = false
          this.TimeSheets.get('week_ts').disable()
          this.pending = true
          this.TimeSheets.controls.fileName.disable()
        }
        else if (this.data.timesheetList[i].timesheet_status.submissionState == 2) {
          this.addBtn = false
          this.saveBtn = true
          this.submitBtn = true
          this.approveReject_status = true
          this.TimeSheets.get('week_ts').disable()
          this.approved = true
          this.TimeSheets.controls.fileName.disable()
        }
        else if (this.data.timesheetList[i].timesheet_status.submissionState == 3) {
          this.addBtn = true
          this.saveBtn = false
          this.submitBtn = true
          this.approveReject_status = true
          this.TimeSheets.get('week_ts').enable()
          this.rejected = true
          this.TimeSheets.controls.fileName.disable()
          if (this.count == 1) {
            this.addBtn = false
          }
        } else {
          this.submitBtn = false
          this.saveBtn=true
          this.pending = false
          this.approved = false
          this.rejected = false
          this.TimeSheets.controls.fileName.enable()
        }
      }
      console.log("Final timesheets", this.TimeSheets)
    },
      err => {
        error = err
        this.TimeSheets.controls.fileName.disable()
        this.toastr.infoToastr(error.error.message + " from " + this.formatDate(this.dates[0]) + " to " + this.formatDate(this.dates[this.len - 1]), 'Info', {
          animate: 'slideFromRight',
          toastTimeout: 3000,
          showCloseButton: true,
        });
      })
  }

  //save data function

  save_timesheets(e) {
    console.log("Form object : ", e);
    var array = []

    var d = e.get('week_ts').value
    this.total_loggedhours = 0
    console.log(d)
    for (let i in d) {
      for (let j in this.dates) {
        var day = new Date(this.dates[j]).getDay();
        if (day == 1 && d[i].monday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].monday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].monday.recordId
          }
          array.push(obj)
        }
        if (day == 2 && d[i].tuesday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].tuesday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].tuesday.recordId
          }
          array.push(obj)
        }
        if (day == 3 && d[i].wednesday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].wednesday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].wednesday.recordId
          }
          array.push(obj)
        }
        if (day == 4 && d[i].thursday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].thursday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].thursday.recordId
          }
          array.push(obj)
        }
        if (day == 5 && d[i].friday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].friday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].friday.recordId
          }
          array.push(obj)
        }
        if (day == 6 && d[i].saturday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].saturday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].saturday.recordId
          }
          array.push(obj)
        }
        if (day == 0 && d[i].sunday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].sunday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].sunday.recordId
          }
          array.push(obj)
        }

      }
    }
    console.log("final object", array)
    for (let i in array) {
      if (array[i].hoursLogged == ""||null) {
        this.total_loggedhours = this.total_loggedhours + 0
      }
      else {
        this.total_loggedhours = this.total_loggedhours + Number(array[i].hoursLogged)
      }
    }
    console.log("total logged hours", this.total_loggedhours)
    if (array.length == 0) {
      this.toastr.infoToastr('You can not save empty timesheet', 'Alert!', {
        animate: 'slideFromRight',
        showCloseButton: true,
      });
    } else {
      var requestobj = {
        "recordsList": array,
        "sheet":
        {
          "employeeId": this.reqEmp,
          "timeSheetID": this.TimeSheets.value.timesheetId,
          "timeSheetStartDate": this.formatDate(this.dates[0]),
          "totalHoursLogged": this.total_loggedhours
        },
        "status": {
          "statusId": this.TimeSheets.value.statusId,
          "submissionState": "",
          "approverId": ""
        },
        "transactionType": "save"
      }
      console.log("request obj", requestobj)
      let data
      this.tms.saveTimesheet(requestobj).subscribe(res => {
        console.log("response getted", res)
        data = res
        // swal('', data.message, 'success')
        this.toastr.successToastr(data.message, 'Success', {
          animate: 'slideFromRight',
          showCloseButton: true,
        });
        this.clearTimeSheets();
        this.getTimesheetsdetails();
      })
    }
  }


  submit_timesheet(e) {
    console.log("Form object : ", e);
    var array = []
    var d = e.get('week_ts').value
    this.total_loggedhours = 0
    console.log(d)
    for (let i in d) {
      for (let j in this.dates) {
        var day = new Date(this.dates[j]).getDay();
        if (day == 1 && d[i].monday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].monday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].monday.recordId
          }
          array.push(obj)
        }
        if (day == 2 && d[i].tuesday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].tuesday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].tuesday.recordId
          }
          array.push(obj)
        }
        if (day == 3 && d[i].wednesday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].wednesday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].wednesday.recordId
          }
          array.push(obj)
        }
        if (day == 4 && d[i].thursday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].thursday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].thursday.recordId
          }
          array.push(obj)
        }
        if (day == 5 && d[i].friday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].friday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].friday.recordId
          }
          array.push(obj)
        }
        if (day == 6 && d[i].saturday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].saturday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].saturday.recordId
          }
          array.push(obj)
        }
        if (day == 0 && d[i].sunday.loggedHours != ""||null) {
          var obj =
          {
            "date": this.formatDate(this.dates[j]),
            "hoursLogged": d[i].sunday.loggedHours,
            "activityType": d[i].activity,
            "projectId": "1",
            "recordId": d[i].sunday.recordId
          }
          array.push(obj)
        }

      }
    }
    console.log("final object", array)
    for (let i in array) {
      if (array[i].hoursLogged == ""||null) {
        this.total_loggedhours = this.total_loggedhours + 0
      }
      else {
        this.total_loggedhours = this.total_loggedhours + array[i].hoursLogged
      }
    }
    var requestobj = {
      "recordsList": array,
      "sheet":
      {
        "employeeId": this.reqEmp,
        "timeSheetID": this.TimeSheets.value.timesheetId,
        "timeSheetStartDate": this.formatDate(this.dates[0]),
        "totalHoursLogged": this.total_loggedhours,
        "fileName": this.filename,
        "attachment": this.TimeSheets.value.attachment,
        "reportingMngr": this.r_manager

      },
      "status": {
        "statusId": this.TimeSheets.value.statusId,
        "submissionState": "1",
        "approverId": ""
      },
      "transactionType": "submit"
    }
    console.log("request obj", requestobj)
    let data
    swal({
      title: "Are you sure?",
      text: "Once submitted, you will not be able to edit this timesheet!",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    })
      .then((willsubmit) => {
        if (willsubmit) {
          this.tms.saveTimesheet(requestobj).subscribe(res => {
            console.log("submitted", res)
            data = res
            // swal("", data.message, "success")
            this.toastr.successToastr(data.message, 'Success', {
              animate: 'slideFromRight',
              showCloseButton: true,
            });
            this.clearTimeSheets();
            this.getTimesheetsdetails();
          })
        }
      });

  }

  number(e) {
    this.submitBtn = true
    console.log(e)
    var key = e.keyCode
    if (key >= 48 && key <= 57) {
      return true
    } else
      return false
  }

  fileSelected(evt) {
    //this.submitBtn = false
    var files = evt.target.files;
    var file = files[0];
    console.log("filename", file.name)
    this.filename = file.name
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  handleReaderLoaded(readerEvt) {
    console.log(readerEvt)
    var binaryString = readerEvt.target.result;
    this.filedata = btoa(binaryString);
    console.log(this.filedata);
    this.TimeSheets.controls.attachment.setValue(this.filedata)
    console.log("timesheets", this.TimeSheets)
  }

  downloadFile() {
    console.log("timesheetid", this.TimeSheets.value.timesheetId)
    var requestobj = {
      "sheet":
      {
        "timeSheetID": this.TimeSheets.value.timesheetId
      },
      "transactionType": "getFile"
    }
    let data
    this.tms.getfile(requestobj).subscribe(res => {
      data = res
      console.log("file getting", data.timesheetList[0].attachment)
      var filepdf = 'data:image/jpeg;base64,' + data.timesheetList[0].attachment;
      let a = document.createElement('a');
      a.href = filepdf;
      a.download = 'timesheetfile';
      a.click();
    },
      err => {
        data = err
        console.log("error", data)
        this.toastr.infoToastr(data.error.message + " for this timesheet", 'Error', {
          animate: 'slideFromRight',
          showCloseButton: true,
        });
      })
  }


  approvetms(e) {
    console.log("approve tms", e);
    var requestobj = {
      "sheet":
      {
        "timeSheetID": e.value.timesheetId,
        "employeeId": this.reqEmp,
        "reportingMngr": this.r_manager

      },
      "status": {
        "statusId": e.value.statusId,
        "submissionState": "2",
        "approverId": this.r_manager,
        "comment": e.value.comments
      },
      "transactionType": "update"
    }
    console.log("approve ", requestobj)
    this.tms.updateTMSStatus(requestobj).subscribe(res => {
      console.log("approved", res)
      this.toastr.successToastr('Timesheet approved', 'Success', {
        animate: 'slideFromRight',
        showCloseButton: true,
      });
      this.clearTimeSheets();
      this.getTimesheetsdetails()
    })
  }

  rejecttms(e) {
    console.log("reject tms", e);
    var requestobj = {
      "sheet":
      {
        "timeSheetID": e.value.timesheetId,
        "employeeId": this.reqEmp,
        "reportingMngr": this.r_manager

      },
      "status": {
        "statusId": e.value.statusId,
        "submissionState": "3",
        "approverId": this.r_manager,
        "comment": e.value.comments
      },
      "transactionType": "update"
    }
    console.log("reject ", requestobj)
    this.tms.updateTMSStatus(requestobj).subscribe(res => {

      console.log("approved", res)
      this.toastr.successToastr('Timesheet has been rejected', 'Success', {
        animate: 'slideFromRight',
        showCloseButton: true,
      });
      this.clearTimeSheets();
      this.getTimesheetsdetails()
    })
  }


  getemployeeList(e) {
    console.log("in get", e)
    var requestobj = {
      "employeeInfo": [{
        "reportingManager": e
      }],
      "transactionType": "getreporties"
    }
    let data
    this.tms.getemployees(requestobj).subscribe(res => {
      data = res
      this.teamdata = data.employeeInfo
      console.log("teamdata", this.teamdata)
    })
  }



  //date convertion 

 formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
}
  //back to top functionality



  @HostListener('window:scroll')
  checkScroll() {
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

  calculate(e){
    console.log(e)
    var activitytotal=0
    this.mon=0
    this.tue=0
    this.wed=0
    this.thu=0
    this.fri=0
    this.sat=0
    this.sun=0
    this.saveBtn=false
    this.TimeSheets.controls.fileName.disable()
    let val=e.value.week_ts
    for(let i in val){
      activitytotal=0
      this.mon=this.mon+Number(val[i].monday.loggedHours)
      this.tue=this.tue+Number(val[i].tuesday.loggedHours)
      this.wed=this.wed+Number(val[i].wednesday.loggedHours)
      this.thu=this.thu+Number(val[i].thursday.loggedHours)
      this.fri=this.fri+Number(val[i].friday.loggedHours)
      this.sat=this.sat+Number(val[i].saturday.loggedHours)
      this.sun=this.sun+Number(val[i].sunday.loggedHours)
      activitytotal=Number(val[i].monday.loggedHours)+Number(val[i].tuesday.loggedHours)+Number(val[i].wednesday.loggedHours)+Number(val[i].thursday.loggedHours)+Number(val[i].friday.loggedHours)+Number(val[i].saturday.loggedHours)+Number(val[i].sunday.loggedHours)
      console.log("total",activitytotal);
      (this.TimeSheets.get('week_ts') as FormArray).controls[i].controls.total.setValue(activitytotal)   
    }
  }
}
