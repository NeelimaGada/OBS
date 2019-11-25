import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets,Chart } from 'chart.js';
import { Color, } from 'ng2-charts';
import { HrmsService } from '../services/hrms.service';
import * as moment from 'moment';


@Component({
  selector: 'app-hr-role',
  templateUrl: './hr-role.component.html',
  styleUrls: ['./hr-role.component.scss']
})
export class HrRoleComponent {
  constructor(private hrms: HrmsService) { }
  ngOnInit() {
    this.getAll();
    this.getEmpData();
    this.getOnboard();
    this.getProjectDetails();
  }
 /*  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 56, 34, 23, 45, 67], label: 'Intrenal' },
    { data: [28, 48, 40, 19, 86, 27, 90, 56, 78, 45, 34, 45], label: 'client' },
    { data: [28, 48, 40, 19, 86, 27, 90, 45, 67, 23, 78, 67], label: 'customer' },

  ]; */
 /*  public pieChartOptions: ChartOptions = {
    //  responsive: true,
    legend: { position: "left" }
  };
  public pieChartLabels: Label[] = [['Hyderabad'], ['Pune'], ['Chennai'], ['Banglore'], ['Mumbai']];
  public pieChartData: SingleDataSet = [100, 100, 100, 55, 34];
  public pieChartType: ChartType = 'pie';
  

  public pieChartPlugins = []; */
public pieChartLegend = true;

 
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  chartOptions = {
    responsive: true,
    fill:false
  };

  
 
 
  monthData: number[]= new Array();
  dojData: number[] = new Array();

  public chartData : ChartDataSets[]= [
    { data: this.monthData , label:'Birthday'},
   // { data: this.anniData, label: 'Anniversary' },
    { data: this.dojData, label: 'OnBoard' }
  ];
  //anniData = new Array();
  
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  empbasic: any;
  employeeInfo: any[];
  empbasicinfo: any;
  dobArr: any[];
  dojArr: any[];
  i;
  count;
  getEmpData() {
    var empinfo =
    {
      "employeeInfo": [{}],
      "transactionType": "getall"
    }
    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.empbasicinfo = this.empbasic.employeeInfo;
      console.log("Employee: ", this.empbasicinfo);
      this.dobArr = this.empbasicinfo.map(x => x.dob);
      //this.chartData = [];
      console.log("DoB Array", this.dobArr)
      for (let month = 0; month < this.chartLabels.length; month++) {
        this.count = 0;
        for (this.i in this.dobArr) {
          let date = new Date(this.dobArr[this.i]);
         // console.log("Month", date.getMonth(), "Number", month)
          if(date.getMonth() == month+1) {
            this.count = this.count+1;
          }
         // this.monthData[this.i] = this.count;
        }
        this.monthData.push(this.count)
      }
      this.chartData[0].data=this.monthData;
      console.log("Months: ", this.chartData[0].data)
     // console.log("Months data: ", this.monthData)

    
    })
  }
 
  employmentdetailsss: any;
  onboarding: any;
  employmentDetailsList: any[];

  public chartClicked(e:any):void {
    console.log("abcfd");
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  //anniCount;

  exitData: number[] = new Array();
  public lineChartData: ChartDataSets[] = [
    { data: this.exitData, label: 'Exit Employees' },
    { data: [5, 6, 7, 6, 4, 6, 4, 7, 5, 3, 12, 4], label: 'Internal Employees' },
  ];
  public lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'sep', 'oct', 'nov', 'Dec'];
  public lineChartOptions: (ChartOptions & { annotation: any }); string = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    }
  ];
  exitDatesArr;
  exitCount: number;
  exit;
  getOnboard() {
    var employmentdetailss =
    {
      "employmentDetails": [{
        //  "employeeId": this.eid
      }],
      "transactionType": "getAll"

    }
    this.hrms.getonboardingdetails(employmentdetailss).subscribe(response => {
      this.employmentdetailsss = response;
      this.onboarding = this.employmentdetailsss.employmentDetailsList;
      console.log("OnBoard response ", this.onboarding);
      this.dojArr = this.onboarding.map(x => x.joiningDate);
      this.exitDatesArr = this.onboarding.map(x => x.exitDate);
      console.log("DoJ Array", this.dojArr);
      console.log("Exit Date Array", this.exitDatesArr);
    
      for (let month = 0; month < this.chartLabels.length; month++) {
        this.count = 0;
        this.exitCount = 0;
        for (this.i in this.dojArr) {
          let dojDate = new Date(this.dojArr[this.i]);
            if(dojDate.getMonth() == month) {
            this.count = this.count+1;
          }
        }
          for (this.exit in this.exitDatesArr) {
            let exitDate = new Date(this.exitDatesArr[this.exit]);
            if(exitDate.getMonth() == month+1) {
              console.log("Month of exit: ", exitDate.getMonth())
              this.exitCount = this.exitCount+1;
            }
          }
        this.exitData[month] = this.exitCount;
        //this.anniData.push(this.anniCount);
        //this.lineChartData[0].data[month] = this.exitCount;
        this.dojData.push(this.count);
      }
      this.chartData[1].data=this.dojData;
     // this.chartData[2].data=this.dojData;
      this.lineChartData[0].data=this.exitData;
      console.log("DoJ data: ", this.chartData[1].data)
      console.log("Exit data: ",  this.lineChartData[0].data)

    });
  }

clickLineData(){
    this.chartData = this.chartData.slice();
    this.lineChartData = this.lineChartData.slice();
    }

//Pie Chart
user;
proDet;
projLocation;
projEndDates;
getProjectDetails() {


  var req =
  {
    "transactionType": "getAll"
  }

  this.hrms.getProjectDetails(req).subscribe(use => {
    this.user = use;
    this.proDet = this.user.projectDetailsList;
    this.projLocation = this.proDet.map(x => x.location);
    this.projEndDates= this.proDet.map(x => x.endDate);
    console.log(this.projLocation + "  all lcoatuions ");
    this.getData();
  })
}



index: any;
pieCount: any = 0;
chartLabel: any;
public pieChartLabels: string[]=new Array();//= Array.from(new Set(this.projLocation));// = ['mumbai', 'chennai', 'hyderabad', 'pune', 'banglore'];
public pieChartData: number[]=new Array();// = new Array(this.pieChartLabels.length);//[this.countPie1,this.countPie2, this.countPie3, this.countPie4, this.countPie5];
public bidDistributionStatColors:  {}[]          = [ { backgroundColor: ['lightgreen', 'orange', 'lightpink','lightblue','lightyellow', 'rgba(148,159,177,1)',
                'rgba(255, 0, 0)','rgba(255, 64, 0)','rgba(255, 128, 0)',
                'rgba(255, 191, 0)','rgba(255, 255, 0)','rgba(191, 255, 0)',
                'rgba(128, 255, 0)','rgba(64, 255, 0)','rgba(0, 255, 0)',
                'rgba(0, 255, 64)','rgba(0, 255, 128)','rgba(0, 255, 191)',
                'rgba(0, 255, 255)','rgba(0, 191, 255)','rgba(0, 128, 255)',
                'rgba(0, 64, 255)','rgba(0, 0, 255)','rgba(64, 0, 255)',
                'rgba(128, 0, 255)','rgba(191, 0, 255)','rgba(255, 0, 255)',
                'rgba(255, 0, 191)','rgba(255, 0, 128)','rgba(255, 0, 64)','rgba(255, 0, 0)'] } ];


public pieChartType: string = 'pie';

getData() {
  this.chartLabel = Array.from(new Set(this.projLocation));
  this.pieChartData = new Array(this.chartLabel.length);
  this.pieChartLabels = this.chartLabel;
  for (this.index in this.chartLabel) {

    this.pieCount = 0;
    for (this.i in this.projLocation) {

      if (this.projLocation[this.i].toLowerCase() == this.pieChartLabels[this.index].toLowerCase()) {
     
        this.pieCount = this.pieCount + 1;

      }
      this.pieChartData[this.index] = this.pieCount;

    }

  }

  console.log(this.pieChartData+" last data")
  console.log(this.pieChartLabels, "Final labels")
}




empInfo:any;



jancount0:any=0;
febcount0:any=0;
marcount0:any=0;
aprcount0:any=0;
maycount0:any=0;
juncount0:any=0;
julcount0:any=0;
augcount0:any=0;
sepcount0:any=0;
octcount0:any=0;
novcount0:any=0;
deccount0:any=0;

jancount1:any=0;
febcount1:any=0;
marcount1:any=0;
aprcount1:any=0;
maycount1:any=0;
juncount1:any=0;
julcount1:any=0;
augcount1:any=0;
sepcount1:any=0;
octcount1:any=0;
novcount1:any=0;
deccount1:any=0;



jancount2:any=0;
febcount2:any=0;
marcount2:any=0;
aprcount2:any=0;
maycount2:any=0;
juncount2:any=0;
julcount2:any=0;
augcount2:any=0;
sepcount2:any=0;
octcount2:any=0;
novcount2:any=0;
deccount2:any=0;


jancount3:any=0;
febcount3:any=0;
marcount3:any=0;
aprcount3:any=0;
maycount3:any=0;
juncount3:any=0;
julcount3:any=0;
augcount3:any=0;
sepcount3:any=0;
octcount3:any=0;
novcount3:any=0;
deccount3:any=0;


jancount4:any=0;
febcount4:any=0;
marcount4:any=0;
aprcount4:any=0;
maycount4:any=0;
juncount4:any=0;
julcount4:any=0;
augcount4:any=0;
sepcount4:any=0;
octcount4:any=0;
novcount4:any=0;
deccount4:any=0;


count1:any=0;
count2:any=0;
count3:any=0;
count4:any=0;
count5:any=0;
loop1:any;
loop2:any;
da:any;
month1:any;
month2:any;
month3:any;
month4:any;
month5:any;
month6:any;
month7:any;
month8:any;
month9:any;
month10:any;
month11:any;
month12:any;
getStatusActive:any;
getDates:any;a:any;
// getStatusInactive:any;
vrble:any;


public barChartOptions: ChartOptions = {
  responsive: true,
  scales : { yAxes: [{ ticks: { min: 0, stepSize :1 } }] }
 
  };
  public options: any = {
    legend: {position: 'left'},
    };
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
  { data: [this.count1, this.count1, this.count1, this.count1, this.count1, this.count1, this.count1,this.count1,this.count1,this.count1,this.count1,this.count1], label: 'Bench' },
  { data: [this.count2, this.count2, this.count2, this.count2, this.count2, this.count2, this.count2,this.count2,this.count2,this.count2,this.count2,this.count2], label: 'Training' },
  { data: [this.count3, this.count3, this.count3, this.count3, this.count3, this.count3, this.count3,this.count3,this.count3,this.count3,this.count3,this.count3], label: 'Internal_Project'},
  { data: [this.count4, this.count4, this.count4, this.count4, this.count4, this.count4, this.count4,this.count4,this.count4,this.count4,this.count4,this.count4], label: 'Client_Project'},
  { data: [this.count5, this.count5, this.count5, this.count5, this.count5, this.count5, this.count5,this.count5,this.count5,this.count5,this.count5,this.count5], label: 'Deployed'},
  ];
users;
  getAll() {

    var req=
    {
            "employeeInfo" :[{
    
            }],
            "transactionType" : "getall"
    }

this.hrms.getempinfo(req).subscribe(use=>{
this.users=use;
this.empInfo=this.users.employeeInfo;
//console.log(this.users);
//console.log(this.users+"object");
//console.log(this.empInfo+"list");
//console.log(this.count1);
this.getStatusActive=this.empInfo.map(x=>x.status);
var year = moment().year();


//console.log(year, "rajeshhhhhhh");


for(this.loop1 in this.empInfo){
  //console.log(this.empInfo[this.loop1].employeeId+"empId")
  var stDate = moment(this.empInfo[this.loop1].statusDate);
if(year == stDate.year()){

  if(this.empInfo[this.loop1].status==1){
    var a=this.empInfo[this.loop1].statusDate.split("-");
    if( a[1]=="01"){
        this.jancount0++;
    }
      if( a[1]=="02"){
      this.febcount0++;
    }
     if( a[1]=="03"){
    this.marcount0++;
   }
if( a[1]=="04"){
  this.aprcount0++;
}
if( a[1]=="05"){
  this.maycount0++;
}
if( a[1]=="06"){
  this.juncount0++;
}
if( a[1]=="07"){
  this.julcount0++;
}
if( a[1]=="08"){
  this.augcount0++;
}
if( a[1]=="09"){
  this.sepcount0++;
}
if( a[1]=="10"){
  this.octcount0++;
}
if( a[1]=="11"){
  this.novcount0++;
}
if( a[1]=="12"){
  this.deccount0++;
}
  
  }


  if(this.empInfo[this.loop1].status==2){
    var a=this.empInfo[this.loop1].statusDate.split("-");
    if( a[1]=="01"){
        this.jancount1++;
    }
      if( a[1]=="02"){
      this.febcount1++;
    }
     if( a[1]=="03"){
    this.marcount1++;
   }
if( a[1]=="04"){
  this.aprcount1++;
}
if( a[1]=="05"){
  this.maycount1++;
}
if( a[1]=="06"){
  this.juncount1++;
}
if( a[1]=="07"){
  this.julcount1++;
}
if( a[1]=="08"){
  this.augcount1++;
}
if( a[1]=="09"){
  this.sepcount1++;
}
if( a[1]=="10"){
  this.octcount1++;
}
if( a[1]=="11"){
  this.novcount1++;
}
if( a[1]=="12"){
  this.deccount1++;
}
  
  }


  if(this.empInfo[this.loop1].status==3){
    var a=this.empInfo[this.loop1].statusDate.split("-");
    if( a[1]=="01"){
        this.jancount2++;
    }
      if( a[1]=="02"){
      this.febcount2++;
    }
     if( a[1]=="03"){
    this.marcount2++;
   }
if( a[1]=="04"){
  this.aprcount2++;
}
if( a[1]=="05"){
  this.maycount2++;
}
if( a[1]=="06"){
  this.juncount2++;
}
if( a[1]=="07"){
  this.julcount2++;
}
if( a[1]=="08"){
  this.augcount2++;
}
if( a[1]=="09"){
  this.sepcount2++;
}
if( a[1]=="10"){
  this.octcount2++;
}
if( a[1]=="11"){
  this.novcount2++;
}
if( a[1]=="12"){
  this.deccount2++;
}
  
  }


  if(this.empInfo[this.loop1].status==4){
    var a=this.empInfo[this.loop1].statusDate.split("-");
    if( a[1]=="01"){
        this.jancount3++;
    }
      if( a[1]=="02"){
      this.febcount3++;
    }
     if( a[1]=="03"){
    this.marcount3++;
   }
if( a[1]=="04"){
  this.aprcount3++;
}
if( a[1]=="05"){
  this.maycount3++;
}
if( a[1]=="06"){
  this.juncount3++;
}
if( a[1]=="07"){
  this.julcount3++;
}
if( a[1]=="08"){
  this.augcount3++;
}
if( a[1]=="09"){
  this.sepcount3++;
}
if( a[1]=="10"){
  this.octcount3++;
}
if( a[1]=="11"){
  this.novcount3++;
}
if( a[1]=="12"){
  this.deccount3++;
}
  
  }


  if(this.empInfo[this.loop1].status==5){
    var a=this.empInfo[this.loop1].statusDate.split("-");
    if( a[1]=="01"){
        this.jancount4++;
    }
      if( a[1]=="02"){
      this.febcount4++;
    }
     if( a[1]=="03"){
    this.marcount4++;
   }
if( a[1]=="04"){
  this.aprcount4++;
}
if( a[1]=="05"){
  this.maycount4++;
}
if( a[1]=="06"){
  this.juncount4++;
}
if( a[1]=="07"){
  this.julcount4++;
}
if( a[1]=="08"){
  this.augcount4++;
}
if( a[1]=="09"){
  this.sepcount4++;
}
if( a[1]=="10"){
  this.octcount4++;
}
if( a[1]=="11"){
  this.novcount4++;
}
if( a[1]=="12"){
  this.deccount4++;
}
  
  }

}

}

this.getDates=this.empInfo.map(x=>x.statusDate);

//console.log(this.getDates[0]+" 1 all dates   .......");
//console.log(this.getDates[1]+" 1 all dates   .......");
//console.log(this.getDates[2]+" 1 all dates   .......");
//console.log(this.getDates[3]+" 1 all dates   .......");
this.a=this.getDates[0].split("-");
//console.log(this.a[1] +" dpa[ap");

//console.log(this.getStatusActive+"fgfdgdgtyrty");
debugger;
for(this.da in this.getDates) {

 
  this.a=this.getDates[this.da].split("-");

    this.barChartData = [
      { data: [this.jancount0, this.febcount0, this.marcount0, this.aprcount0, this.maycount0, this.juncount0, this.julcount0,this.augcount0,this.sepcount0,this.octcount0,this.novcount0,this.deccount0], label: 'Bench' },
      { data: [this.jancount1, this.febcount1, this.marcount1, this.aprcount1, this.maycount1, this.juncount1, this.julcount1,this.augcount1,this.sepcount1,this.octcount1,this.novcount1,this.deccount1], label: 'Training' },
      { data: [this.jancount2, this.febcount2, this.marcount2, this.aprcount2, this.maycount2, this.juncount2, this.julcount2,this.augcount2,this.sepcount2,this.octcount2,this.novcount2,this.deccount2], label: 'Internal_Project'},
      { data: [this.jancount3, this.febcount3, this.marcount3, this.aprcount3, this.maycount3, this.juncount3, this.julcount3,this.augcount3,this.sepcount3,this.octcount3,this.novcount3,this.deccount3], label: 'Client_Project'},
      { data: [this.jancount4, this.febcount4, this.marcount4, this.aprcount4, this.maycount4, this.juncount4, this.julcount4,this.augcount4,this.sepcount4,this.octcount4,this.novcount4,this.deccount4], label: 'Deployed'},
      ];
      this.barChartLabels =['Jan', 'Feb', 'March', 'April', 'May', 'June','July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
  
    }
   
  
    console.log(this.empInfo);

   // this.barChartLabels = [, 'Feb', 'March', 'April', 'May', 'June','July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
   console.log(this.barChartData);
})

  }


}
