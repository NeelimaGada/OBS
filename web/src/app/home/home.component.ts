import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { HrmsService } from './services/hrms.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: any;
  role: any = [];
  role0: any = [];
  role1: any = [];
  role2: any = [];
  role3: any = [];
  changerole: string;
  loggeduser;
  idofemp: any;
  empbid: any;
  profilepicimg:any;
  constructor(private authService: AuthService, private routerNavigate: Router, private dataservice: DataService, private hrms: HrmsService) {
    this.loggeduser = localStorage.getItem('UserName');
    // this.eid = this.dataservice.paramId;
    console.log("logged userid is", this.loggeduser);

  }

  logoutAction() {
    if (this.authService.logOutAction()) {
      this.routerNavigate.navigate(['login'])
    }
    localStorage.removeItem("setUserRole");
  }
  changeRole() {
    if (this.role == 'ROLE_ADMIN') {
      this.changerole = localStorage.getItem('Role');

      console.log(this.changerole)
      this.role = this.changerole[0][0]
    }

    else if (this.role == 'ROLE_HR') {
      this.changerole = localStorage.getItem('Role1');

      console.log(this.changerole)
      this.role = this.changerole[0][1]
    }
    else if (this.role == 'ROLE_USER') {
      this.changerole = localStorage.getItem('Role2');

      console.log(this.changerole)
      this.role = this.changerole[0][2]
    }
    else if (this.role == 'ROLE_MANAGER') {
      this.changerole = localStorage.getItem('Role3');

      console.log(this.changerole)
      this.role = this.changerole[0][3]
    }
    else if (this.role == 'ROLE_SALES') {
      this.changerole = localStorage.getItem('Role4');

      console.log(this.changerole)
      this.role = this.changerole[0][4]
    }
  }

  ngOnInit() {
    this.username = localStorage.getItem('UserName');
    this.role = localStorage.getItem('Role');
    this.getImage();
    //  this.role0=localStorage.getItem('Role0');
    // this.role1=localStorage.getItem('Role1');
    //  this.role2=localStorage.getItem('Role2');

    $(document).ready(function () {
      $(".push_menu").click(function () {
        $(".wrapper").toggleClass("active");
      });


      (function () {
        "use strict";

        var treeviewMenu = $('.app-menu');

        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function (event) {
          event.preventDefault();
          $('.app').toggleClass('sidenav-toggled');
        });

        // Activate sidebar treeview toggle
        $("[data-toggle='treeview']").click(function (event) {
          event.preventDefault();
          if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
          }
          $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

        //Activate bootstrip tooltips
        $("[data-toggle='tooltip']").tooltip();

      })();

    });
  }


  //to display rolemanager user
  
  
  managerRole2() {
    localStorage.removeItem("setUserRole");
}
managerRole3() {
  localStorage.setItem("setUserRole","true");
}



  // EmployeeInfo 
  empbasic: any;
  empbasicinfo: any;
  pic: any;
  profilepic: any;
  fName: any;
  lName: any;
  initials: any;
  userlogo: any;

  pic1: any;
  txt: any;


  //  setDefaultPic() {
  //   this.pic = "./assets/usericon.png";
  // }

  uesrLogo() {

    //this.userlogo = "./assets/userlogo.jpg";

  }

  getImage() {
    console.log(this.loggeduser);

    var empinfo =
    {

      "employeeInfo": [{
        "employeeId": this.loggeduser

      }],
      "transactionType": "getbyid"

    }
    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.empbasicinfo = this.empbasic.employeeInfo;
      console.log("Frstname lastname", this.empbasicinfo);

      this.empbid = this.empbasicinfo[0].id;
      localStorage.setItem("IdEmp", this.empbid);



      console.log("Getbyid Employee Info Object :", this.empbasicinfo[0].id);
      this.pic = this.empbasicinfo.map(_ => _.image);
      console.log("image pic ", this.pic[0])

      if (this.pic[0] != null) {
        this.profilepic = "data:image/jpeg;base64," + this.pic;
        this.pic1 = true;
        console.log("Image Data:", this.profilepic);
      } else {

        this.fName = this.empbasicinfo.map(_ => _.firstname);
        this.lName = this.empbasicinfo.map(_ => _.lastname);
        const f = this.fName[0];
        const l = this.lName[0];
        this.initials = f[0].toUpperCase() + l[0].toUpperCase();
        this.txt = true;

        console.log("The First Letter of Fitst Name : ", f[0]);
        console.log("The First Letter of Last Name : ", l[0]);
        console.log("First and Last initails letters: ", this.initials);
      }

      //  if(this.pic != "null"){
      //  this.profilepic = "data:image/jpeg;base64,"+ this.pic;
      //  this.pic1=true;
      //  console.log("Image Data:", this.profilepic);
      // }else{

      //   this.fName= this.empbasicinfo.map(_=>_.firstname);
      //   this.lName= this.empbasicinfo.map(_=>_.lastname);
      //   const f = this.fName[0];
      //   const l = this.lName[0];
      //   this.initials = f[0]+l[0];
      //   this.txt =true;

      //   console.log("The First Letter of Fitst Name : ",f[0]);
      //   console.log("The First Letter of Last Name : ",l[0]);
      //   console.log("First and Last initails letters: ",this.initials);
      // }


    });
  }



  onSelectFile($event){
    var files = $event.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();
  
      reader.onload =this.handleFile.bind(this);
  
      reader.readAsBinaryString(file);
  }
  }
  
  
  base64textString;
  handleFile(event) {
   var binaryString = event.target.result;
          this.base64textString= btoa(binaryString);
         
          console.log(btoa(binaryString),"this is for profile");
          this.profilepicimg=btoa(binaryString);
          console.log("thid",this.profilepicimg)
  this.profilePicUpdation();
  }
  profilePicUpdation(){
  
  
  var request =
      {
        "employeeInfo": [{
  
          "firstname": this.empbasicinfo[0].firstname,
          "middlename": this.empbasicinfo[0].middlename,
          "lastname": this.empbasicinfo[0].lastname,
          "status": this.empbasicinfo[0].status,
          "dob": this.empbasicinfo[0].dob,
          "gender": this.empbasicinfo[0].gender,
          "title": this.empbasicinfo[0].title,
          "reportingManager": this.empbasicinfo[0].reportingManager,
          "statusDate": this.empbasicinfo[0].statusDate,
          "employeeId": this.empbasicinfo[0].employeeId,
          "createdBy": "",
          "createdOn":"",
          "email": this.empbasicinfo[0].email,
          "officialEmail": this.empbasicinfo[0].officialEmail,
          "personalMobileNo": this.empbasicinfo[0].personalMobileNo,
          "image":this.profilepicimg,
          "flag":"true",
          "role":" ",
          "updatedBy":this.empbasicinfo[0].updatedBy,
          "password":"",
          "updatedOn":this.empbasicinfo[0].updatedOn,
         "id":this.empbasicinfo[0].id
        }],
        "transactionType": "update"
      }
      console.log(request,"for request object")
      this.hrms.updateProfilepic(request).subscribe(res => {console.log("this updation",res)
   
   if(res){
     this.getImage();
   } })
  }


}
