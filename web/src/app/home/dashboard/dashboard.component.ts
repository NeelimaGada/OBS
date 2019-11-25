import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Color } from 'ng2-charts/ng2-charts';
import { HrmsService } from '../services/hrms.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { PsaService } from '../psa/psa.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userData: object

  loggeduser;
  projectData: any;
  dataProject: any;
  projectCon: any;
  projectContract: any;
  rev: any;
  contractstatus: any;
  custcontactresponse: any;
  emp;
  custcntctdata: any;

  constructor(private authService: AuthService, private hrms: HrmsService, private routerNavigate: Router, private psaService: PsaService) {
    this.loggeduser = localStorage.getItem('UserName');
    this.getAllProject();
    this.revenuedata();
    this.getAllCustomerContactInfos();
    this.getCustomerContactCount();
    this.getcustomercontactdata();
    this.getcustomerdata();
   this.getCustomercount();
   
   this.getContractDetails();
   this.getAllCustomer();
   this.getProjectInfo();

   this.getcustomercontract();
    
  }
  role: any;
  ngOnInit() {
    this.authService.getUserdata().then(data => {
      this.userData = data;
      // console.log(this.userData);
      this.role = localStorage.getItem('Role');
    })
    this.getAll();
    this.getStateListData();
    this.getEmpData();
    this.getOnboard();
    this.getProjectDetails();
    this.getResData();
    this.getgender();
    this.getempcount();


    this.getEmpexp();

  
  }
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  thisMonth = this.monthNames[(new Date()).getMonth()];
  thisMonthNumber = ((new Date()).getMonth() + 1);
  thisMonthNumber1 = ((new Date()).getMonth() + 1);
  lastMonth = this.monthNames[(new Date()).getMonth() - 1];
  lastMonthNumber = this.thisMonthNumber - 1;
  lastMonthNumber1 = this.thisMonthNumber1 - 1;


  //get states
  StateDetails;
  StateList11 = new Array();
  locationName = [];
  getStateListData() {
    var request = {

      "states":
        [],

      "sessionId": "1234",
      "transactionType": "getAll"

    }
    this.hrms.getStateListMaster(request).subscribe(res => {
      this.StateDetails = res;
      this.StateList11 = this.StateDetails.statesList;
      // console.log("states location", this.StateList11);
      // for(var i=0;i<this.StateList11.length;i++){

      //  // this.locationName.push(this.StateList11[i]);
      //  console.log("pushed ",this.locationName[i]);
      // }



    })

    if (this.thisMonthNumber == 1) {
      this.lastMonthNumber = 12;
      this.lastMonthNumber1 = 12;
      this.lastMonth = 'Dec';
    }
    console.log('pppppppppp', this.thisMonth);
    console.log('qqqqqqqqqq', this.lastMonth);
    console.log('wwwwwwwww', this.thisMonthNumber);
    console.log('aaaaaaaa', this.lastMonthNumber);
  }









  //line chart for Ticket Status
  public lineChartData2: ChartDataSets[] = [
    { data: [44, 59, 75, 81, 50, 65, 49], label: 'New' },
    { data: [44, 59, 75, 81, 50, 65, 49], label: 'Resolved' }
  ];
  public lineChartLabels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions2: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors2: Color[] = [
    {
      borderColor: '#9ED8F0',
      backgroundColor: 'rgb(206, 244, 235)',
    },
  ];
  public lineChartLegend2 = true;
  public lineChartType2 = 'line';

  //line chart for Ticket Status ends

  //line chart for Resolution Time
  public lineChartData3: ChartDataSets[] = [
    { data: [40, 59, 70, 79, 66, 55, 49], label: 'Resolved' },
  ];
  public lineChartLabels3 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions3: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors3: Color[] = [
    {
      borderColor: '#b2d3be',
      backgroundColor: 'rgb(255,255,240)',
    },
  ];
  public lineChartLegend3 = true;
  public lineChartType3 = 'line';

  //line chart  Resolution Time ends

  //line chart for Years In Service Distribution

  data: any
  empexpd: any
  below_one: any = 0
  one_three: any = 0
  three_five: any = 0
  five_seven: any = 0
  above_seven: any = 0
  expdate = []
  expdata = []
  public lineChartData4: ChartDataSets[] = [
    { data: [], label: 'No.Of Employees' },
  ];
  public lineChartLabels4 = ['<1', '1-3', '3-5', '5-7', '>7'];
  public lineChartOptions4: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors4: Color[] = [
    {
      borderColor: '#424242',
      backgroundColor: '#B5F8F8',
    },
  ];
  public lineChartLegend4 = true;
  public lineChartType4 = 'line';

  getEmpexp() {
    var empcount = {
      "employeeExperienceDetails": [{}],
      "transactionType": "getall"
    }
    this.hrms.getEmployeeExperienceDetails(empcount).subscribe(resp => {
      this.data = resp
      this.empexpd = this.data.employeeExperienceDetails
      // console.log("empexpdetails ",this.empexpd);
      // var joindates=this.empexpd.map(x=>x.joining_date);
      // console.log("joind date", joindates)
      for (let i in this.empexpd) {
        var exp = this.empexpd[i].experience;
        this.expdata.push(exp)
        if (exp < 1) {
          this.below_one++;
          continue;
        } else if (exp >= 1 && exp < 3) {
          this.one_three++;
          continue;
        } else if (exp >= 3 && exp < 5) {
          this.three_five++;
          continue;
        } else if (exp >= 5 && exp < 7) {
          this.five_seven++;
          continue;
        } else {
          this.above_seven++;
          continue;
        }
      }
      //  console.log("exp",this.expdata)
      //  console.log("below_one",this.below_one);
      //  console.log("one_three",this.one_three);
      //  console.log("three_five",this.three_five);
      //  console.log("five_seven",this.five_seven);
      //  console.log("above_seven",this.above_seven);
      this.expdate.push(this.below_one);
      this.expdate.push(this.one_three);
      this.expdate.push(this.three_five);
      this.expdate.push(this.five_seven);
      this.expdate.push(this.above_seven);
      this.lineChartData4 = this.expdate
    })
  }







  //line chart Years In Service Distribution ends







  //piecchart for gender starts
  empgender: any;
  empgenderinfo: any;
  gendInfo: any;
  chartLabel1: any;
  indexvalue: any;
  pieCt: any = 0;

  pieCount1: any;

  getgender() {

    var genderinfo = {

      "employeeInfo": [{

      }],

      "transactionType": "getall"
    }

    this.hrms.getempinfo(genderinfo).subscribe(res => {
      this.empgender = res;
      this.empgenderinfo = this.empgender.employeeInfo;
      this.gendInfo = this.empgenderinfo.map(x => x.gender);
      this.getallData();
    })
  }



  public pieChartLabels1: string[] = ['female', 'male', 'others'];
  public pieChartData1: number[] = new Array();
  public pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(0, 255, 191,0.9)',
        'rgba(0, 0, 255, 0.3)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ]

  public pieChartType1: string = 'pie';




  getallData() {
    this.chartLabel1 = Array.from(new Set(this.gendInfo));

    this.pieChartData1 = new Array(this.chartLabel1.length);
    this.pieChartLabels1 = this.chartLabel1;

    for (this.index in this.pieChartLabels1) {

      this.pieCount1 = 0;
      for (this.i in this.gendInfo) {

        if (this.gendInfo[this.i] == this.pieChartLabels1[this.index]) {

          this.pieCount1 = this.pieCount1 + 1;

        }
        this.pieChartData1[this.index] = this.pieCount1;

      }

    }

    //console.log("ghugfhsgfyusgaufguagf", this.pieChartLabels1);


  }

  //  piechart ends--------------------------------------------------------------



  // linechart
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  chartOptions = {
    responsive: true,
    fill: false,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }
  };




  monthData: number[] = new Array();
  dojData: number[] = new Array();
  dojData1: number[] = new Array();
  public barChartOptions5: ChartOptions = {
    responsive: true,
    fill: true,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }

  };
  public barChartType5: ChartType = 'bar';
  public barChartData5: ChartDataSets[] = [
    { data: this.monthData, label: 'Birthday' },
    { data: this.dojData1, label: 'Work Anniversary' }
  ];

  public barChartLabels5 = [this.lastMonth, this.thisMonth];
  //anniData = new Array();
  chartLables1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // chartLabels = [this.lastMonth, this.thisMonth];
  empbasic: any;
  employeeInfo: any[];
  empbasicinfo: any;
  dobArr: any[];

  i;
  count;
  first0;
  first1;
  second0;
  second1;
  getEmpData() {

    var empinfo =
    {
      "employeeInfo": [{}],
      "transactionType": "getall"
    }
    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.empbasicinfo = this.empbasic.employeeInfo;
      // console.log("Employee: ", this.empbasicinfo);
      this.dobArr = this.empbasicinfo.map(x => x.dob);
      //this.chartData = [];
      //console.log("DoB Array", this.dobArr)
      for (let month = 0; month < this.barChartLabels5.length; month++) {
        this.count = 0;
        for (this.i in this.dobArr) {
          let date = new Date(this.dobArr[this.i]);
          // console.log("Month", date.getMonth(), "Number", month)
          if (date.getMonth() == this.lastMonthNumber - 1) {
            this.count = this.count + 1;
          }
          // this.monthData[this.i] = this.count;
        }
        this.lastMonthNumber = this.thisMonthNumber;
        this.monthData.push(this.count)
      }
      // this.chartData[0].data = this.monthData;
      // console.log("Months: ", this.monthData)
      // console.log("Months data: ", this.monthData)
      this.first0 = this.monthData[0];
      this.first1 = this.monthData[1];
      // console.log("first0",this.first0);
      // console.log("first0",this.first1);
    })




    var employmentdetailss =
    {
      "employmentDetailsList": [{}],
      "transactionType": "getAll"

    }
    this.hrms.getonboardingdetails(employmentdetailss).subscribe(response => {
      this.employmentdetailsss = response;
      this.onboarding = this.employmentdetailsss.employmentDetailsList;

      this.dojArr = this.onboarding.map(x => x.joiningDate);

      // console.log("dojarrrrrrrrrrrrr",this.dojArr);
      for (let month = 0; month < this.barChartLabels5.length; month++) {

        this.count2 = 0;

        for (this.i in this.dojArr) {
          let dojDate = new Date(this.dojArr[this.i]);
          if (dojDate.getMonth() == this.lastMonthNumber1 - 1) {
            this.count2 = this.count2 + 1;
          }
        }
        this.lastMonthNumber1 = this.thisMonthNumber1;

        this.dojData1.push(this.count2);

      }
      // this.chartData[1].data = this.dojData1;
      this.second0 = this.dojData1[0];;
      this.second1 = this.dojData1[1];

      // console.log("second0",this.second0);
      // console.log("second1",this.second1);
    });






  }






  //linechart
  employmentdetailsss: any;
  onboarding: any;
  employmentDetailsList: any[];

  // public chartClicked(e: any): void {
  //  // console.log("abcfd");
  //  // console.log(e);
  // }

  // public chartHovered(e: any): void {
  //  // console.log(e);
  // }
  //anniCount;

  exitData: number[] = new Array();
  resData: number[] = new Array();
  public lineChartData: ChartDataSets[] = [
    { data: this.exitData, label: 'Joined Employees' },
    { data: this.resData, label: 'Resigned Employees' },
  ];
  public lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'sep', 'oct', 'nov', 'Dec'];
  public lineChartOptions: (ChartOptions & { annotation: any }); string = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#55B061',
    },
    {
      borderColor: '#003f5c',
      backgroundColor: '#F05959',
    }
  ];
  exitDatesArr;
  exitCount: number;
  exit;
  dojArr: any;
  getOnboard() {
    var employmentdetailss =
    {
      "employmentDetailsList": [{}],
      "transactionType": "getAll"

    }
    this.hrms.getonboardingdetails(employmentdetailss).subscribe(response => {
      this.employmentdetailsss = response;
      this.onboarding = this.employmentdetailsss.employmentDetailsList;
      // console.log("OnBoard response ", this.onboarding);
      this.dojArr = this.onboarding.map(x => x.joiningDate);
      this.exitDatesArr = this.onboarding.map(x => x.exitDate);
      // console.log("DoJ Array", this.dojArr);
      // console.log("Exit Date Array", this.exitDatesArr);

      for (let month = 0; month < this.chartLables1.length; month++) {
        this.count = 0;
        this.count1 = 0;
        this.count2 = 0;
        this.exitCount = 0;
        for (this.i in this.dojArr) {
          let dojDate = new Date(this.dojArr[this.i]);
          if (dojDate.getMonth() == month) {
            this.count = this.count + 1;
          }
        }




        for (this.exit in this.exitDatesArr) {
          let exitDate = new Date(this.exitDatesArr[this.exit]);
          if (exitDate.getMonth() == month) {
            // console.log("Month of exit: ", exitDate.getMonth())
            this.exitCount = this.exitCount + 1;
          }
        }
        // this.exitData[month] = this.exitCount;

        //this.anniData.push(this.anniCount);
        //this.lineChartData[0].data[month] = this.exitCount;

        this.dojData.push(this.count);

        this.exitData.push(this.count);
      }
      // this.chartData[1].data = this.dojData;
      // this.chartData[2].data=this.dojData;
      this.lineChartData[0].data = this.exitData;
      //console.log("DoJ data: ", this.chartData[1].data)
      //console.log("Exit data: ", this.lineChartData[0].data)

    });
  }


  resign;
  resemployeesdetails: any;
  dolArr: any;
  offboard: any;
  exitCount1: number;
  r;
  getResData() {
    var resInfo =
    {
      "resignation": [{}],
      "transactionType": "getAll"
    }
    this.hrms.getResignation(resInfo).subscribe(resresp => {
      this.resemployeesdetails = resresp;
      this.offboard = this.resemployeesdetails.resignationList;
      //console.log("resignation data", this.offboard);
      this.dolArr = this.offboard.map(x => x.leavingDate);
      //console.log("doarray daraalfakfla,f", this.dolArr)

      for (let month = 0; month < this.lineChartLabels.length; month++) {

        this.exitCount1 = 0;
        for (this.r in this.dolArr) {
          let dolDate = new Date(this.dolArr[this.r]);
          if (dolDate.getMonth() == month) {
            this.exitCount1 = this.exitCount1 + 1;
            //console.log("monthsdata", month)
          }
        }

        this.resData[month] = this.exitCount1;
        //this.anniData.push(this.anniCount);
        //this.lineChartData[0].data[month] = this.exitCount;
        this.resData.push(this.exitCount1);

      }

      this.lineChartData[1].data = this.resData;

      //console.log("RESIGNATION DATA dsgfgsdddddddddddddddddddddddddddsddgsdgsgsdgsdg", this.resData);


    });



  }



  clickLineData() {
    this.barChartData5 = this.barChartData5.slice();
    this.lineChartData = this.lineChartData.slice();
    // this.lineChartData1 = this.lineChartData1.slice();
  }



  //bar chart for employees count

  ecount: number[] = new Array();
  public barChartOptions2: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }

  };
  public barChartType2: ChartType = 'bar';
  public barChartData2: ChartDataSets[] = [
    { data: this.ecount, label: 'Employees Count' },

  ];

  totalCount = 0;
  public barChartLabels2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  employeecount: any;
  empcountinfo: any;
  dobArr1: any[];
  resigndummy: number[] = this.resData;
  dojArr1: any[];
  getempcount() {


    console.log("resigndummy", this.resigndummy)

    var empcount = {
      "employmentDetailsList": [{}],
      "transactionType": "getall"
    }

    this.hrms.getonboardingdetails(empcount).subscribe(res => {
      this.employeecount = res;
      //  console.log('fddfhd', this.employeecount);
      this.empcountinfo = this.employeecount.employmentDetailsList;
      // console.log("empcountinfo: ", this.empcountinfo);
      this.dobArr1 = this.empcountinfo.map(x => x.joiningDate);
      //this.chartData = [];
      //console.log("DoB Array values", this.dobArr1)
      for (let month = 0; month < this.barChartLabels2.length; month++) {
        this.count = 0;
        for (this.i in this.dobArr1) {
          let date = new Date(this.dobArr1[this.i]);
          // console.log("Month", date.getMonth(), "Number", month)
          if (date.getMonth() == month) {
            this.count = this.count + 1;
          }

          // this.monthData[this.i] = this.count;
        }
        this.totalCount = this.totalCount + this.count;
        this.totalCount = this.totalCount - this.resigndummy[month];
        console.log("totalCount:", this.totalCount);

        this.ecount.push(this.totalCount)
      }
      //console.log("ecount:", this.ecount);
      //console.log("rrrrrrrrrrrrrrrrrrrr",this.resigndummy)
      // for(let i=0; i < this.barChartLabels2.length; i++){
      //   this.ecount[i]=this.ecount[i]-this.resigndummy[i];
      //   console.log(this.ecount[i]);
      // }
      // console.log("this.ecount",this.ecount);
      this.barChartData2 = this.ecount;

    })
  }

  public barChartColors2: Color[] = [
    {
      borderColor: 'rgba(30, 169, 224, 0.8)',
      backgroundColor: 'rgba(30, 169, 224, 0.8)',
    },
  ];
  public barChartLegend2 = true;




  //bar chart ends

  //pie chart
  public pieChartLegend = true;
  user;
  proDet;
  projLocation = [];
  projEndDates;
  pieChartLabels2 = [];
  piestatedata = [];
  getProjectDetails() {

    var req =
    {
      "transactionType": "getAll"
    }

    this.hrms.getProjectDetails(req).subscribe(use => {
      // console.log("mmmmmmmmm", use)
      this.user = use;
      this.proDet = this.user.projectDetailsList;
      //this.projLocation = this.proDet.map(x => x.location);
      for (var i = 0; i < this.proDet.length; i++) {
        this.projLocation.push(this.proDet[i].location);

      }
      // console.log("454545", this.projLocation);
      //console.log("name location", this.StateList11);
      this.projEndDates = this.proDet.map(x => x.endDate);
      this.getData();
    })
  }



  index: any;
  pieCount: any = 0;
  chartLabel: any;
  one;
  // public labelLocation1=  this.projLocation[0];
  // labelLocation2=  this.projLocation[1];
  // labelLocation3=  this.projLocation[2];
  // labelLocation4=  this.projLocation[3];

  public pieChartLabels3: string[] = new Array();;
  public pieChartData: number[] = new Array();// = new Array(this.pieChartLabels.length);//[this.countPie1,this.countPie2, this.countPie3, this.countPie4, this.countPie5];
  public bidDistributionStatColors: {}[] = [{
    backgroundColor: ['lightgreen', 'orange', 'lightpink', 'lightblue', 'lightyellow', 'rgba(148,159,177,1)',
      'rgba(255, 0, 0)', 'rgba(255, 64, 0)', 'rgba(255, 128, 0)',
      'rgba(255, 191, 0)', 'rgba(255, 255, 0)', 'rgba(191, 255, 0)',
      'rgba(128, 255, 0)', 'rgba(64, 255, 0)', 'rgba(0, 255, 0)',
      'rgba(0, 255, 64)', 'rgba(0, 255, 128)', 'rgba(0, 255, 191)',
      'rgba(0, 255, 255)', 'rgba(0, 191, 255)', 'rgba(0, 128, 255)',
      'rgba(0, 64, 255)', 'rgba(0, 0, 255)', 'rgba(64, 0, 255)',
      'rgba(128, 0, 255)', 'rgba(191, 0, 255)', 'rgba(255, 0, 255)',
      'rgba(255, 0, 191)', 'rgba(255, 0, 128)', 'rgba(255, 0, 64)', 'rgba(255, 0, 0)']
  }];

  public pieChartType: string = 'pie';

  getData() {

    this.chartLabel = Array.from(new Set(this.projLocation));

    this.pieChartData = new Array(this.chartLabel.length);
    this.pieChartLabels3 = this.chartLabel;
    //console.log("locations2", this.chartLabel);
    for (this.index in this.chartLabel) {
      //console.log("Labels in loop : ", this.StateList11);


      this.pieCount = 0;
      for (this.i in this.projLocation) {

        if (this.projLocation[this.i] == this.chartLabel[this.index]) {

          this.pieCount = this.pieCount + 1;

        }

        this.pieChartData[this.index] = this.pieCount;

      }

    }

    for (this.index in this.pieChartLabels3) {
      for (this.i in this.StateList11) {

        // console.log("Inside project for loop1", this.pieChartLabels3[this.index]);
        if (this.StateList11[this.i].id == this.pieChartLabels3[this.index]) {

          this.pieChartLabels3[this.index] = this.StateList11[this.i].stateName;
          //console.log("Inside project for loop2", this.pieChartLabels3[this.index]);

        }
      }
      // this.pieChartLabels2.push(this.pieChartLabels[j]);
    }
    // console.log(this.pieChartData + " last data")
    // console.log("Final labels", this.pieChartLabels3)
    for (var i in this.pieChartLabels3) {
      this.pieChartLabels2.push(this.pieChartLabels3[i].charAt(0).toUpperCase() + this.pieChartLabels3[i].slice(1));
    }

  }















  //barchart
  empInfo: any;



  jancount0: any = 0;
  febcount0: any = 0;
  marcount0: any = 0;
  aprcount0: any = 0;
  maycount0: any = 0;
  juncount0: any = 0;
  julcount0: any = 0;
  augcount0: any = 0;
  sepcount0: any = 0;
  octcount0: any = 0;
  novcount0: any = 0;
  deccount0: any = 0;

  jancount1: any = 0;
  febcount1: any = 0;
  marcount1: any = 0;
  aprcount1: any = 0;
  maycount1: any = 0;
  juncount1: any = 0;
  julcount1: any = 0;
  augcount1: any = 0;
  sepcount1: any = 0;
  octcount1: any = 0;
  novcount1: any = 0;
  deccount1: any = 0;



  jancount2: any = 0;
  febcount2: any = 0;
  marcount2: any = 0;
  aprcount2: any = 0;
  maycount2: any = 0;
  juncount2: any = 0;
  julcount2: any = 0;
  augcount2: any = 0;
  sepcount2: any = 0;
  octcount2: any = 0;
  novcount2: any = 0;
  deccount2: any = 0;


  jancount3: any = 0;
  febcount3: any = 0;
  marcount3: any = 0;
  aprcount3: any = 0;
  maycount3: any = 0;
  juncount3: any = 0;
  julcount3: any = 0;
  augcount3: any = 0;
  sepcount3: any = 0;
  octcount3: any = 0;
  novcount3: any = 0;
  deccount3: any = 0;


  jancount4: any = 0;
  febcount4: any = 0;
  marcount4: any = 0;
  aprcount4: any = 0;
  maycount4: any = 0;
  juncount4: any = 0;
  julcount4: any = 0;
  augcount4: any = 0;
  sepcount4: any = 0;
  octcount4: any = 0;
  novcount4: any = 0;
  deccount4: any = 0;


  jancount5: any = 0;
  febcount5: any = 0;
  marcount5: any = 0;
  aprcount5: any = 0;
  maycount5: any = 0;
  juncount5: any = 0;
  julcount5: any = 0;
  augcount5: any = 0;
  sepcount5: any = 0;
  octcount5: any = 0;
  novcount5: any = 0;
  deccount5: any = 0;


  count1: any = 0;
  count2: any = 0;
  count3: any = 0;
  count4: any = 0;
  count5: any = 0;
  count6: any = 0
  loop1: any;
  loop2: any;
  da: any;
  month1: any;
  month2: any;
  month3: any;
  month4: any;
  month5: any;
  month6: any;
  month7: any;
  month8: any;
  month9: any;
  month10: any;
  month11: any;
  month12: any;
  getStatusActive: any;
  getDates: any; a: any;
  // getStatusInactive:any;
  vrble: any;


  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 1 } }] }

  };
  public options: any = {
    legend: { position: 'right' },
  };
  public barChartLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];


  colors = [
    {
      backgroundColor: 'lightgreen'
    },
    {
      backgroundColor: 'lightblue'
    },
    {
      backgroundColor: 'lightpink'
    },
    {
      backgroundColor: 'orange'
    },
    {
      backgroundColor: 'violet'
    }
  ]

  public barChartData: ChartDataSets[] = [
    { data: [this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1], label: 'Bench' },
    { data: [this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2], label: 'Training' },
    { data: [this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3], label: 'Internal_Project' },
    { data: [this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4], label: 'Client_Project' },
    { data: [this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5], label: 'Deployed' },
    { data: [this.count6, this.count6, this.count6, this.count6, this.count6, this.count6, this.count6, this.count6, this.count5, this.count6, this.count6, this.count6], label: 'Non-Technical' }

  ];
  users;
  getAll() {

    var req =
    {
      "employeeInfo": [{

      }],
      "transactionType": "getall"
    }

    this.hrms.getempinfo(req).subscribe(use => {
      this.users = use;
      // console.log("barchartlabels", this.users);
      this.empInfo = this.users.employeeInfo;
      //console.log(this.users);
      //console.log(this.users+"object");
      //console.log(this.empInfo+"list");
      //console.log(this.count1);
      this.getStatusActive = this.empInfo.map(x => x.status);
      var year = moment().year();


      //console.log(year, "rajeshhhhhhh");


      for (this.loop1 in this.empInfo) {
        //console.log(this.empInfo[this.loop1].employeeId+"empId")
        var stDate = moment(this.empInfo[this.loop1].statusDate);
        if (year == stDate.year()) {

          if (this.empInfo[this.loop1].status == 1) {
            var a = this.empInfo[this.loop1].statusDate.split("-");
            if (a[1] == "01") {
              this.jancount0++;
            }
            if (a[1] == "02") {
              this.febcount0++;
            }
            if (a[1] == "03") {
              this.marcount0++;
            }
            if (a[1] == "04") {
              this.aprcount0++;
            }
            if (a[1] == "05") {
              this.maycount0++;
            }
            if (a[1] == "06") {
              this.juncount0++;
            }
            if (a[1] == "07") {
              this.julcount0++;
            }
            if (a[1] == "08") {
              this.augcount0++;
            }
            if (a[1] == "09") {
              this.sepcount0++;
            }
            if (a[1] == "10") {
              this.octcount0++;
            }
            if (a[1] == "11") {
              this.novcount0++;
            }
            if (a[1] == "12") {
              this.deccount0++;
            }

          }


          if (this.empInfo[this.loop1].status == 2) {
            var a = this.empInfo[this.loop1].statusDate.split("-");
            if (a[1] == "01") {
              this.jancount1++;
            }
            if (a[1] == "02") {
              this.febcount1++;
            }
            if (a[1] == "03") {
              this.marcount1++;
            }
            if (a[1] == "04") {
              this.aprcount1++;
            }
            if (a[1] == "05") {
              this.maycount1++;
            }
            if (a[1] == "06") {
              this.juncount1++;
            }
            if (a[1] == "07") {
              this.julcount1++;
            }
            if (a[1] == "08") {
              this.augcount1++;
            }
            if (a[1] == "09") {
              this.sepcount1++;
            }
            if (a[1] == "10") {
              this.octcount1++;
            }
            if (a[1] == "11") {
              this.novcount1++;
            }
            if (a[1] == "12") {
              this.deccount1++;
            }

          }


          if (this.empInfo[this.loop1].status == 3) {
            var a = this.empInfo[this.loop1].statusDate.split("-");
            if (a[1] == "01") {
              this.jancount2++;
            }
            if (a[1] == "02") {
              this.febcount2++;
            }
            if (a[1] == "03") {
              this.marcount2++;
            }
            if (a[1] == "04") {
              this.aprcount2++;
            }
            if (a[1] == "05") {
              this.maycount2++;
            }
            if (a[1] == "06") {
              this.juncount2++;
            }
            if (a[1] == "07") {
              this.julcount2++;
            }
            if (a[1] == "08") {
              this.augcount2++;
            }
            if (a[1] == "09") {
              this.sepcount2++;
            }
            if (a[1] == "10") {
              this.octcount2++;
            }
            if (a[1] == "11") {
              this.novcount2++;
            }
            if (a[1] == "12") {
              this.deccount2++;
            }

          }


          if (this.empInfo[this.loop1].status == 4) {
            var a = this.empInfo[this.loop1].statusDate.split("-");
            if (a[1] == "01") {
              this.jancount3++;
            }
            if (a[1] == "02") {
              this.febcount3++;
            }
            if (a[1] == "03") {
              this.marcount3++;
            }
            if (a[1] == "04") {
              this.aprcount3++;
            }
            if (a[1] == "05") {
              this.maycount3++;
            }
            if (a[1] == "06") {
              this.juncount3++;
            }
            if (a[1] == "07") {
              this.julcount3++;
            }
            if (a[1] == "08") {
              this.augcount3++;
            }
            if (a[1] == "09") {
              this.sepcount3++;
            }
            if (a[1] == "10") {
              this.octcount3++;
            }
            if (a[1] == "11") {
              this.novcount3++;
            }
            if (a[1] == "12") {
              this.deccount3++;
            }

          }


          if (this.empInfo[this.loop1].status == 5) {
            var a = this.empInfo[this.loop1].statusDate.split("-");
            if (a[1] == "01") {
              this.jancount4++;
            }
            if (a[1] == "02") {
              this.febcount4++;
            }
            if (a[1] == "03") {
              this.marcount4++;
            }
            if (a[1] == "04") {
              this.aprcount4++;
            }
            if (a[1] == "05") {
              this.maycount4++;
            }
            if (a[1] == "06") {
              this.juncount4++;
            }
            if (a[1] == "07") {
              this.julcount4++;
            }
            if (a[1] == "08") {
              this.augcount4++;
            }
            if (a[1] == "09") {
              this.sepcount4++;
            }
            if (a[1] == "10") {
              this.octcount4++;
            }
            if (a[1] == "11") {
              this.novcount4++;
            }
            if (a[1] == "12") {
              this.deccount4++;
            }

          }
          if (this.empInfo[this.loop1].status == 6) {
            var a = this.empInfo[this.loop1].statusDate.split("-");
            if (a[1] == "01") {
              this.jancount5++;
            }
            if (a[1] == "02") {
              this.febcount5++;
            }
            if (a[1] == "03") {
              this.marcount5++;
            }
            if (a[1] == "04") {
              this.aprcount5++;
            }
            if (a[1] == "05") {
              this.maycount5++;
            }
            if (a[1] == "06") {
              this.juncount5++;
            }
            if (a[1] == "07") {
              this.julcount5++;
            }
            if (a[1] == "08") {
              this.augcount5++;
            }
            if (a[1] == "09") {
              this.sepcount5++;
            }
            if (a[1] == "10") {
              this.octcount5++;
            }
            if (a[1] == "11") {
              this.novcount5++;
            }
            if (a[1] == "12") {
              this.deccount5++;
            }

          }

        }

      }

      this.getDates = this.empInfo.map(x => x.statusDate);

      //console.log(this.getDates[0]+" 1 all dates   .......");
      //console.log(this.getDates[1]+" 1 all dates   .......");
      //console.log(this.getDates[2]+" 1 all dates   .......");
      //console.log(this.getDates[3]+" 1 all dates   .......");
      this.a = this.getDates[0].split("-");

      //console.log(this.a[1] +" dpa[ap");

      //console.log(this.getStatusActive+"fgfdgdgtyrty");

      // for (this.da in this.getDates) {


      // this.a = this.getDates[this.da].split("-");

      this.barChartData = [
        { data: [this.jancount0, this.febcount0, this.marcount0, this.aprcount0, this.maycount0, this.juncount0, this.julcount0, this.augcount0, this.sepcount0, this.octcount0, this.novcount0, this.deccount0], label: 'Bench' },
        { data: [this.jancount1, this.febcount1, this.marcount1, this.aprcount1, this.maycount1, this.juncount1, this.julcount1, this.augcount1, this.sepcount1, this.octcount1, this.novcount1, this.deccount1], label: 'Training' },
        { data: [this.jancount2, this.febcount2, this.marcount2, this.aprcount2, this.maycount2, this.juncount2, this.julcount2, this.augcount2, this.sepcount2, this.octcount2, this.novcount2, this.deccount2], label: 'Internal_Project' },
        { data: [this.jancount3, this.febcount3, this.marcount3, this.aprcount3, this.maycount3, this.juncount3, this.julcount3, this.augcount3, this.sepcount3, this.octcount3, this.novcount3, this.deccount3], label: 'Client_Project' },
        { data: [this.jancount4, this.febcount4, this.marcount4, this.aprcount4, this.maycount4, this.juncount4, this.julcount4, this.augcount4, this.sepcount4, this.octcount4, this.novcount4, this.deccount4], label: 'Deployed' },
        { data: [this.jancount5, this.febcount5, this.marcount5, this.aprcount5, this.maycount5, this.juncount5, this.julcount5, this.augcount5, this.sepcount5, this.octcount5, this.novcount5, this.deccount5], label: 'Non-Technical' }
      ];
      // this.barChartLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


      // }


      // console.log(this.empInfo);

      // this.barChartLabels = [, 'Feb', 'March', 'April', 'May', 'June','July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // console.log(this.barChartData);
    })





  }





  //   public barChartOptions: ChartOptions = {
  //     responsive: true,
  //   };
  //   public barChartLabels: Label[] = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
  //   public barChartType: ChartType = 'bar';
  //   public barChartLegend = true;
  //   public barChartPlugins = [];

  //   public barChartData: ChartDataSets[] = [
  //     { data: [10, 15, 3, 18, 6, 5, 4, 13, 15, 16, 5, 4], label: 'Internal' },
  //     { data: [2, 4, 15, 17, 16, 12, 19, 13, 15, 16, 5, 4], label: 'Client' },
  //     { data: [20, 14, 5, 7, 16, 10, 12, 13, 17, 9, 15, 14], label: 'Bench' }
  //   ];




  //   //piechart
  //   public pieChartOptions: ChartOptions = {
  //     responsive: true,
  //   };
  //   public pieChartLabels: Label[] = [['Status'], [' Location'], [' Board'],[' Age'],[' Skill'],'Attendence'];
  //   public pieChartData: SingleDataSet = [300, 500, 100,200,150,250];
  //   public pieChartType: ChartType = 'pie';
  //   public pieChartLegend = true;
  //   public pieChartPlugins = [];
  //   //linechart of Employees
  //   public lineChartData: ChartDataSets[] = [
  //     { data: [5,10,12,13,7,8,6,3,2,8,14,7], label: 'Internal Employees Count' },
  //     { data: [15,12,14,4,14,12,5,17,20,8,1,6], label: 'External Employees Count' }
  //   ];


  //   public lineChartLabels: Label[] = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
  //   public lineChartOptions: (ChartOptions & { annotation: any }) ;any = {
  //     responsive: true,
  //   };
  //   public lineChartColors: Color[] = [
  //     {
  //       borderColor: 'black',
  //       backgroundColor: 'rgba(255,0,0,0.3)',
  //     },
  //   ];
  //   public lineChartLegend = true;
  //   public lineChartType = 'line';
  //   public lineChartPlugins = [];


  // //line chart of Events

  //   chartData = [
  //     { data: [15, 5, 22, 14,10, 5, 2, 10,5, 8,4, 12], label: 'On-Board' },
  //     { data: [12, 5, 10, 13,12, 4, 10, 3,12, 4, 10, 5], label: 'Birthday' },
  //     { data: [4, 6, 5, 1,2, 6, 5, 2, 2,6, 5, 3], label: 'Anniversary' }
  //   ];

  //   chartLabels = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];




  //logout action

  logoutAction() {
    if (this.authService.logOutAction()) {
      this.routerNavigate.navigate(['login'])
    }
    localStorage.removeItem("setUserRole");
  }



  //project resource chart









  countProject;
  projectToShow: any = new Array();
  revenueCountProject: any = new Array();
  resourceCount: any = new Array();
  projectToshow;
  dates = []
  remainingDays = [];
  ennDate = new Date();
  pvalue = [];
  endDate: any;
  dateEnd: number;
  today: any;


  pcount: number[] = new Array();

  public barChartOptions15: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }

  };

  public barChartLabels15;


  public barChartOptions8: ChartOptions = {
    responsive: true,


  };
  public barChartOptions9: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }

  };
  public barChartLabels8;
  public barChartLabels9;


  getAllProject() {
    var getProject = {
      "projectInfo": {
      },
      "transactionType": "getall"
    }
    this.psaService.getAllProject(getProject).subscribe(response => {
      this.projectData = response;

      this.dataProject = this.projectData.projectList;


      for (var i = 0; i < this.dataProject.length; i++) {


        this.revenueCountProject.push(this.dataProject[i].projectRatecard.projectValue);
        this.projectToShow.push(this.dataProject[i].projectName);
        this.resourceCount.push(this.dataProject[i].projectResourceMapping.resourceCount);
        let days = moment(this.dataProject[i].endDate).diff(moment().format('YYYY-MM-DD'), 'days')
        this.remainingDays.push(days);
        this.pvalue.push(this.dataProject[i].projectName)


      }

      console.log("count project", this.projectToShow, this.revenueCountProject, this.resourceCount);

      this.barChartLabels8 = this.projectToShow;
      this.barChartLabels9 = this.projectToShow;
      this.barChartLabels15 = this.pvalue;

    })

  }




  currDate(arg0: string, currDate: any) {
    throw new Error("Method not implemented.");
  }




  public barChartType8: ChartType = 'bar';
  public barChartType9: ChartType = 'bar';

  public barChartLegend8 = true;

  public barChartLegend9 = true;

  public barChartPlugins8 = [];
  public barChartPlugins9 = [];


  public barChartData8: ChartDataSets[] = [
    { data: this.revenueCountProject, label: 'Revenue' },

  ];

  public barChartColors8: Color[] = [
    {
      borderColor: 'rgba(30, 169, 224, 0.8)',
      backgroundColor: 'rgba(30, 169, 224, 0.8)',
    },
  ];


  public barChartData9: ChartDataSets[] = [
    { data: this.resourceCount, label: 'Resource' },

  ];

  public barChartColors9: Color[] = [
    {
      borderColor: 'rgba(30, 169, 224, 0.8)',
      backgroundColor: 'rgba(30, 169, 224, 0.8)',
    },
  ];

  public barChartType15: ChartType = 'bar';

  public barChartLegend15 = true;



  public barChartPlugins15 = [];

  public barChartData15: ChartDataSets[] = [
    { data: this.remainingDays, label: 'Remaining Days' },

  ];

  public barChartColors15: Color[] = [
    {
      borderColor: 'rgba(30, 169, 224, 0.8)',
      backgroundColor: 'rgba(30, 169, 224, 0.8)',
    },
  ];

  cDate(arg0: string, cDate: any) {
    throw new Error("Method not implemented.");
  }













  //contract chart


  public barChartOptions19: ChartOptions = {
    responsive: true
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels19;
  public pieChartData21;

  //  =['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];




  nameArray: any;
  contractarray: any;
  countrevenue = [];
  contractnames = [];
  pending = 0;
  approved = 0;
  draft = 0;
  rejected = 0;
  revenuedata() {

    var countstatus = [];

    var revenuedata1 = {

      "customercontractdetailslist": [
        {}
      ],
      "transactiontype": "getall"
    }

    this.psaService.getAllContractdDetails(revenuedata1).subscribe((res) => {
      this.rev = res;
      this.contractarray = this.rev.customercontractdetailslist
      this.contractstatus = this.contractarray.map(x => x.contractStatus)
      console.log("contarct statussss", this.contractstatus)
      console.log("revenue dataaaa", this.rev);
      console.log("data", this.contractarray);
      for (let i in this.contractarray) {
        // console.log(this.contractarray[i].contractvalue);
        this.countrevenue.push(this.contractarray[i].contractvalue);

      }
      console.log("count", this.countrevenue);

      // this.rev_barChartData=countrevenue;

      for (let i in this.contractarray) {
        // console.log("contract namesssss",this.contractarray[i].contractname);
        this.contractnames.push(this.contractarray[i].contractname + '-' + this.contractarray[i].customerid);


      }
      for (let i in this.contractstatus) {
        console.log(this.contractstatus[i]);

        if (this.contractstatus[i] == "pending") {
          this.pending++;
        }
        if (this.contractstatus[i] == "approved") {
          this.approved++;
        }
        if (this.contractstatus[i] == "draft") {
          this.draft++;
        }
        if (this.contractstatus[i] == "rejected") {
          this.rejected++;
        }
      }


      countstatus.push(this.approved);
      countstatus.push(this.rejected);
      countstatus.push(this.draft);
      countstatus.push(this.pending);
      console.log("count", countstatus);
      this.barChartLabels19 = this.contractnames;
      console.log("contract names in loop", this.barChartLabels19);


    })
    
    this.pieChartData21 = countstatus;
  }




  public barChartType19: ChartType = 'bar';
  public barChartLegend19 = true;
  public barChartPlugins19 = [];





  public barChartData19: ChartDataSets[] = [
    { data: this.countrevenue, label: 'Revenue Contract Wise' },

  ];
  public barChartColors19: Color[] = [
    {
      borderColor: 'rgba(30, 169, 224, 0.8)',
      backgroundColor: 'rgba(30, 169, 224, 0.8)',
    },
  ];
  public pieChartstatuslabel21 = ['approved', 'rejected', 'draft', 'pending'];

  public bidDistributionStatColors21: {}[] = [{
    backgroundColor: ['lightgreen', 'orange', 'lightpink', 'lightblue']
  }];

  //contact Starts

  //Customer Contact Monthly count
  contactcountinfo:any;
  cnctcount:any;
  contactArr1:any;





  getCustomerContactCount() {

    //console.log("resigndummy",this.resigndummy)
    var count = []
    var jan = 0;
    var feb = 0;
    var mar = 0;
    var apr = 0;
    var may = 0;
    var jun = 0;
    var jul = 0;
    var aug = 0;
    var sep = 0;
    var oct = 0;
    var nov = 0;
    var dec = 0;

   var contactcount = {
      "customerContactInfo": [{
      }],
      "transactionType": "getall"
    }
    this.psaService.getCustomerContactInfo(contactcount).subscribe(res => {
      this.cnctcount = res;
      this.contactcountinfo = this.cnctcount.customerContactInfoList
      console.log("data ", this.contactcountinfo)

      for (let i in this.contactcountinfo) {
        if ( new Date(this.contactcountinfo[i].createdTime).getMonth() == 0) {
          jan++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 1) {
          feb++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 2) {
          mar++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 3) {
          apr++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 4) {
          may++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 5) {
          jun++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 6) {
          jul++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 7) {
          aug++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 8) {
          sep++;
        }
        if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 9) {
          oct++;
        } if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 10) {
          nov++;
        } if (new Date(this.contactcountinfo[i].createdTime).getMonth() == 11) {
          dec++;
        }

      }
      count.push(jan)
      count.push(feb)
      count.push(mar)
      count.push(apr)
      count.push(may)
      count.push(jun)
      count.push(jul)
      count.push(aug)
      count.push(sep)
      count.push(oct)
      count.push(nov)
      count.push(dec)
      this.barChartContactData = count;
    })
  }
  public barChartOptionsContact: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }
 
  };
  public barChartContactData: ChartDataSets[] = [
    { data: this.ecount, label: 'Monthly customer contacts' },
 
  ];

  //end

//BDM Wise contact


bdmrole:number[]=[];
 contactdatatype2: any=[];
 bdm1;

  getAllCustomerContactInfos() {
    //this.getname();
    this.data = []
    var bdmcount = []
    
    var bdm2 = 0;
    var getallReq = {
      "customerContactInfo": [{

      }],
      "transactionType": "getall"
    }
    this.psaService.getCustomerContactInfo(getallReq).subscribe(res => {
      console.log("customerContactInfo res", res)
      this.custcontactresponse = res;

      this.custcntctdata = this.custcontactresponse.customerContactInfoList;
      console.log("length", this.custcntctdata.length);
     // this.contactchartdata1 = this.custcntctdata.length;

//another function data
var empinfo =
  {

    "employeeInfo": [{
      

    }],
    "transactionType": "getall"
  }
  this.hrms.getempinfo(empinfo).subscribe(res => {
  console.log("data",res);
  this.emp=res;
 
  for(let i in this.emp.employeeInfo){
  if(this.emp.employeeInfo[i].title==20){
    console.log(this.emp.employeeInfo[i].firstname);
    this.bdmrole.push(this.emp.employeeInfo[i].firstname)
  }
  }

  console.log("bdm names",this.bdmrole);
   
  for(var j=0;j<this.bdmrole.length;j++){
    this.bdm1=0;
        for (var i=0;i<this.custcntctdata.length;i++) {
           
           
          if (this.custcntctdata[i].bdm == this.bdmrole[j]) {
            console.log("data loop",this.custcntctdata[i].bdm,this.bdmrole[j]);   
          this.bdm1++;
          }
         
          }
          if(this.bdm1!=0){
            this.contactdatatype2.push(this.bdm1);
          }
  }
console.log("array",this.contactdatatype2);
 //this.barChartData6=this.contactdatatype2;
 
this.barChartLabels6=this.bdmrole
console.log(this.barChartLabels6,"labels");



  });
  

//another func data ends

     
console.log(this.bdmrole,"bdmrole from");

     
    });

  }
  public barChartLabels6 = [];
public barChartType6: ChartType = 'bar';
public barChartLegend6 = true;
public barChartPlugins6 = [];

public barChartData6: ChartDataSets[] = [
  { data:this.contactdatatype2, label: 'No. of Customer contacts' },
 
];
public barChartOptions6 = {
  responsive: true,
  fill: false,
  scales: { yAxes: [{ ticks: { min: 0, stepSize: 5 } }] }
};
  //bdm contact wise


  customercount: any;
  customercountinfo: any;
  dobArr2: any[];
  chart:number[]=this.resData;
  dojArr2: any[];
  customerinfoList:any;
  

  public barChartOptionsCustomer: ChartOptions = {
    responsive: true,
  };
  public barChartLabels3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType3: ChartType = 'bar';
  public barChartLegendCustomer = true;


  public barChartCustomerData: ChartDataSets[] = [
    { data: [], label: 'Customer count'}
  
  ];
  
  getCustomercount(){
    var count=[]
    var jan=0;
    var feb=0;
    var mar=0;
    var apr=0;
    var may=0;
    var jun=0;
    var jul=0;
    var aug=0;
    var sep=0;
    var oct=0;
    var nov=0;
    var dec=0;

    var customercount =
    {
      "customerList":
      {


      },



      "transactionType": "getall"
    }
console.log("data",customercount)
    this.psaService.getAllCustomer(customercount).subscribe(res => {
      this.customercount = res;
    
      this.customercountinfo = this.customercount.customerList
       console.log("data",res)
       console.log("data1",this.customercountinfo)
       
       for(let i in  this.customercountinfo){
         if(new Date(this.customercountinfo[i].createddate).getMonth()==0){
           jan++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==1){
           feb++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==2){
           mar++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==3){
           apr++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==4){
           may++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==5){
           jun++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==6){
           jul++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==7){
           aug++;
         }
         if(new Date(this.customercountinfo[i].createddate).getMonth()==8){
           sep++;
         }
          if(new Date(this.customercountinfo[i].createddate).getMonth()==9){
           oct++;
         } if(new Date(this.customercountinfo[i].createddate).getMonth()==10){
           nov++;
         } if(new Date(this.customercountinfo[i].createddate).getMonth()==11){
           dec++;
         }

       }
       count.push(jan)
       count.push(feb)
       count.push(mar)
       count.push(apr)
       count.push(may)
       count.push(jun)
       count.push(jul)
       count.push(aug)
       count.push(sep)
       count.push(oct)
       count.push(nov)
       count.push(dec)
      this.barChartCustomerData = count;

    })
  }


//contact 2

name=[]
countdata=[]
custdata
contactdata
public barChartOption78: ChartOptions = {
  responsive: true,
};
public barChartLabels78 ;
public barChartType78: ChartType = 'bar';
public barChartLegend78 = true;
public barChartPlugins78 = [];

public barChartData78: ChartDataSets[] = [ { data:[], label: 'Customer' }
];


getcustomercontactdata() {
  this.name=[]
var custlist
  var request = {
    "transactionType": "getAll"
  }

  this.psaService.getallListiofCustomer(request).subscribe(res => {
    custlist=res
    this.custdata=custlist.customerList
    console.log("customer1", this.custdata)
    for(let i in this.custdata){
      this.name.push(this.custdata[i].customerName)
    }
    console.log("names",this.name);
    this.barChartLabels78=this.name
  }
  );
}

getcustomerdata(){
  this.countdata=[]
  var contact
  var cuscontactcount = {
    "customerContactInfo": [{
    }],
    "transactionType": "getall"
  }


  this.psaService.getCustomerContactInfo(cuscontactcount).subscribe(res => {
    console.log("contact",res)
    contact=res
    this.contactdata=contact.customerContactInfoList
    for(let i in this.custdata){
      var c=0
      for(let j in this.contactdata){
        
        if(this.custdata[i].customerId==this.contactdata[j].customerId){
          console.log("contact count",this.custdata[i].customerName);
            c++;
        } 
      }
      this.countdata.push(c);
      
    }
    console.log("final count",this.countdata)
    this.barChartData78=this.countdata
  })
}


//project  sreekanth

contractInfo;
  contractResp;
  customerResp;
  customerList;
  projectDetails: any;
  projectInfos: any;
  arrayProjectContract: any = [];
  arrayProject: any = [];
  countpr: any = [];
  countpr1: any = [];
  barChartLabels111: any[]
  barChartLabels112: any[];





public barChartOptions11: ChartOptions = {
  responsive: true,
  scales: { yAxes: [{ ticks: { min: 0, stepSize: 1 } }] }



};
public options11: any = {
  legend: { position: 'right' },
};
public barChartLabels11 = [];
public barChartType11: ChartType = 'bar';
public barChartLegend11 = true;
public barChartPlugins11 = [];
public barChartData11: ChartDataSets[] = [
  { data: [], label: 'Customer' },
];





public barChartOptions12: ChartOptions = {
  responsive: true,
  scales: { yAxes: [{ ticks: { min: 0, stepSize: 1 } }] }

};
public options12: any = {
  legend: { position: 'right' },
};
public barChartLabels12 = [];
public barChartType12: ChartType = 'bar';
public barChartLegend12 = true;
public barChartPlugins12 = [];
public barChartData12: ChartDataSets[] = [
  { data: [], label: 'Contract' },

];


colors1 = [
  {
    backgroundColor: 'lightgreen'
  },
  {
    backgroundColor: 'lightblue'
  }
]

getContractDetails() {
  let req = {
    "customercontractdetailslist": [
      {}],
    "transactiontype": "getall"
  }
  this.psaService.getAllContractdDetails(req).subscribe(resp => {
    this.contractResp = resp;
    this.contractInfo = this.contractResp.customercontractdetailslist;
    console.log("abcdefg",this.contractInfo)
  })
}


getAllCustomer() {
  let req =
  {
    "customerList":
    {
    },
    "transactionType": "getAll"
  }

  this.psaService.getAllCustomer(req).subscribe(resp => {
    this.customerResp = resp;
    this.customerList = this.customerResp.customerList;
    console.log('Conract resp :', this.customerList);
  })
}

getProjectInfo() {
 
  var req =
  {
    "projectInfo": {
    },
    "transactionType": "getall"
  }

  this.psaService.getAllProject(req).subscribe(res => {
    this.projectDetails = res;
    console.log("project count", this.projectDetails)

    this.projectInfos = this.projectDetails.projectList;
    console.log("projectppppppp", this.projectInfos)

    //let customers = this.proDet.map(x => x.location);
    let customers = this.projectInfos.map(x => x.customerId);
    this.barChartLabels111 = Array.from(new Set(customers));

    let contracts = this.projectInfos.map(x => x.contractId);
    this.barChartLabels112 = Array.from(new Set(contracts));
    console.log('Cntract Ids :', this.barChartLabels112);
    let contractNames=[];
    let customerNames = [];
    let customerCount;
    let contractCount;
    for (let i = 0; i < this.barChartLabels112.length; i++) {
      let con;
      console.log('All Contracts:', this.contractInfo);
      console.log('Contractid :', this.barChartLabels112[i]);
      for (let a in this.contractInfo) {
        if (this.barChartLabels111[i] == this.contractInfo[a].contractid) {
          con = this.contractInfo[i];
        }
      }console.log('Find Customer:', con);
     // contractNames.push(con.contractname);
      contractCount = 0;
      for (let j = 0; j < this.projectInfos.length; j++) {
        if (this.barChartLabels112[i] == this.projectInfos[j].contractId) {
          contractCount++;
        }
      }
      this.countpr.push(contractCount);
    }

    //customerrrrrrrrrrrr

    for (let m = 0; m < this.barChartLabels111.length; m++) {
      let cust;
      console.log('All Customers:', this.customerList);
      console.log('CustomerId :', this.barChartLabels111[m]);

      for (let a in this.customerList) {
        if (this.barChartLabels111[m] == this.customerList[a].customerId) {
          cust = this.customerList[m];
        }
      }
      console.log('Find Customer:', cust);
      customerNames.push(cust.customerName);
      customerCount = 0;
      for (let n = 0; n < this.projectInfos.length; n++) {
        if (this.barChartLabels111[m] == this.projectInfos[n].customerId) {
          customerCount++;
        }
      }
      this.countpr1.push(customerCount);
    }

    for (let k = 0; k < customerNames.length; k++) {
      this.barChartLabels11.push(customerNames[k]);
    }
    console.log('Customer Labels :', this.barChartLabels11);

    for (let l = 0; l < this.barChartLabels112.length; l++) {
      this.barChartLabels12.push(this.barChartLabels112[l]);
    }
    console.log('Contract Labels :', this.countpr);
    
    this.barChartData11 = [
      { data: this.countpr1 }];
    this.barChartData12 = [
      { data: this.countpr }];
   
  })
}



  //barchart for customer contract month wise
  cucount: number[] = new Array();
  cucount1: number[] = new Array();
  public barChartOptions88: ChartOptions = {
    responsive: true,
  };
  totalCount1 = 0;
  public barChartLabels88 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType88: ChartType = 'bar';
  public barChartLegend88 = true;
  getcont: any;
  customercount88: any;
  cuarray: any[];
  cuarray1: any[];
  jan: any = 0;
  feb: any = 0;
  mar: any = 0;
  april: any = 0;
  may: any = 0;
  june: any = 0;
  july: any = 0;
  aug: any = 0;
  sep: any = 0;
  oct: any = 0;
  nov: any = 0;
  dec: any = 0;

  public barChartData88: ChartDataSets[] = [
    { data: [], label: 'Monthwise Count' },

    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  getcustomercontract() {

    var req = {

      "customercontractdetailslist": [{}],
      "transactiontype": "getall"

    }

    this.psaService.getAllContractdDetails(req).subscribe(res => {
      this.getcont = res;
      console.log(this.getcont, "customer contact");

      this.customercount88 = this.getcont.customercontractdetailslist;
      console.log(this.customercount88, "fnfjihfjsndifns");

      this.cuarray = this.customercount88.map(c => c.startdate);
      this.cuarray1 = this.customercount88.map(c => c.createdby);

      console.log(this.cuarray1, "chadagdagfafygayufga");


      console.log(this.cuarray, "monthwise");


      for (let i in this.customercount88) {
        if (new Date(this.customercount88[i].startdate).getMonth() == 0) {
          this.jan++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 1) {
          this.feb++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 2) {
          this.mar++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 3) {
          this.april++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 4) {
          this.may++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 5) {
          this.june++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 6) {
          this.july++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 7) {
          this.aug++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 8) {
          this.sep++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 9) {
          this.oct++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 10) {
          this.nov++;
        }
        if (new Date(this.customercount88[i].startdate).getMonth() == 11) {
          this.dec++;
        }

      }

      this.cucount.push(this.jan);
      this.cucount.push(this.feb);
      this.cucount.push(this.mar);
      this.cucount.push(this.april);
      this.cucount.push(this.may);
      this.cucount.push(this.june);
      this.cucount.push(this.july);
      this.cucount.push(this.aug);
      this.cucount.push(this.sep);
      this.cucount.push(this.oct);
      this.cucount.push(this.nov);
      this.cucount.push(this.dec);

      console.log("basha", this.cucount);

      this.barChartData88 = this.cucount



    })

  }
  public barChartColors88: Color[] = [
    {
      borderColor: 'rgba(30, 169, 224, 0.8)',
      backgroundColor: 'rgba(30, 169, 224, 0.8)',
    },
  ];





  //barchart for customer contract monthwise ends

}
