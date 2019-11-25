import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from '../services';
import { HrmsService } from '../services/hrms.service';
import { HttpClient } from '@angular/common/http';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-org-structure',
  templateUrl: './org-structure.component.html',
  styleUrls: ['./org-structure.component.scss']
})
export class OrgStructureComponent implements OnInit {
  //public localData;
  
  public localData = new Array();//[{ id: '', name: '', hasChild: '', expanded: '', eimg: ''}];
     
  userlogged:any;
  field: Object;
  contactDetails;
  public cssClass: string = 'custom';
  empbasic: any;
  empbasicinfo: any;
  employeeInfo: any = [];
  txt: boolean;
  pic1: boolean;
  img: string;
  empName: any;
  subbusinessunitDetails: Object;
  subBusinessUnitlist: any;
  subList: any;
  onboarding: any;
  employmentdetailsss: any;
  domainName: any;
  sbuids: unknown[];
  onboradID: unknown[];
 
 
  constructor(private hrms: HrmsService, private ht: HttpClient) { }

  image;
  employee;
  clicked:boolean = false;
  empContact;

   pic:any;
  profilepic:any;
  profilepic1:any;
  dpText;
  noImage:boolean;
  icon;
  getNode(e) {
    this.clicked = true;
  //var i;
    this.noImage = false;
    let eid = e.node.dataset.uid;
    this.employee = this.localData.find(i => i.id == eid);
    
    this.empContact = this.empbasicinfo.find(con => con.employeeId == eid);
    console.log('Emp Contact Info : ',this.empContact);
    this.image = this.employee.eimg;
    console.log("Eid : ", this.image);
    console.log('Emp Role', this.employee.job);

    if(this.employee.eimg == "data:image/jpeg;base64,null" && this.empContact.gender == 1) {
      
      this.noImage = true;
      this.icon = 'male.png';
      console.log('Male user and no image : ', this.icon);
    } else if(this.employee.eimg == "data:image/jpeg;base64,null" && this.empContact.gender == 2) {
      this.noImage = true;
      this.icon = 'female.png';
      console.log('Female user and no image : ', this.icon);
    }
    
    /* this.empName = this.employee.name;
    console.log("Name : ",this.empName);
    
    let  fullname =this.empName.split(" ");
    console.log("Splited Name : ", fullname);
    this.dpText = fullname[0].charAt(0).toUpperCase() + fullname[1].charAt(0).toUpperCase();
    console.log("DP text : ", this.dpText); */
    
    
    //let last = this.empName.split("");

    
    /* for (let i of this.locData) {
      console.log('Loop data', i.id);
      
      
    } */
  }


  getNodeToShow() {
    this.clicked = true;
  //var i;
    this.noImage = false;
    let eid = this.userlogged;
    this.employee = this.localData.find(i => i.id == eid);
    
    this.empContact = this.empbasicinfo.find(con => con.employeeId == eid);
    console.log('Emp Contact Info : ',this.empContact);
    this.image = this.employee.eimg;
    console.log("Eid : ", this.image);
    console.log('Emp Role', this.employee.job);

    if(this.employee.eimg == "data:image/jpeg;base64,null" && this.empContact.gender == 1) {
      
      this.noImage = true;
      this.icon = 'male.png';
      console.log('Male user and no image : ', this.icon);
    } else if(this.employee.eimg == "data:image/jpeg;base64,null" && this.empContact.gender == 2) {
      this.noImage = true;
      this.icon = 'female.png';
      console.log('Female user and no image : ', this.icon);
    }
    
    /* this.empName = this.employee.name;
    console.log("Name : ",this.empName);
    
    let  fullname =this.empName.split(" ");
    console.log("Splited Name : ", fullname);
    this.dpText = fullname[0].charAt(0).toUpperCase() + fullname[1].charAt(0).toUpperCase();
    console.log("DP text : ", this.dpText); */
    
    
    //let last = this.empName.split("");

    
    /* for (let i of this.locData) {
      console.log('Loop data', i.id);
      
      
    } */
  }

 
contactInfo;
  // pics = ['download.jpg', 'images.jpg', 'download1.jpg', 'download2.jpg', 'download5.jpg', 'images1.jpg', 'download 3.jpg', 'download4.jpg',
  //   'download5.jpg', 'images.jpg', 'images1.jpg', 'download1.jpg', 'download2.jpg', 'download 3.jpg', 'download4.jpg'];
  
    empinfo = {"employeeInfo": [{  }],
    "transactionType": "getall"
  };
contactReq = {
    'empInfo' : [
      
      ],
    // tslint:disable-next-line: quotemark
    "transactionType" : "getAll"
  };
  
    ngOnInit() {

      this.userlogged=localStorage.getItem("UserName");

      const roleReq = {
        // tslint:disable-next-line: quotemark
        "designation":[

        ],

        "sessionId":"3121",
        "transactionType":"getall"
    }



      //this.getContact();
    console.log('Roles : ', this.roleList);

    
    var empData: Object[] = new Array();
    this.hrms.getEmployeeDesignation(roleReq).subscribe(resp => {
      this.roleResp = resp;
      this.roleList = this.roleResp.listDesignation;
      console.log('Role Response',  this.roleList);
      if(resp) {
    this.hrms.getempinfo(this.empinfo).subscribe(res => {
      if (res) {
        this.empbasic = res;
        /*       console.log("empbasic");
           console.log(this.empbasic); */
        this.empbasicinfo = this.empbasic.employeeInfo;
        // console.log(this.empbasic.employeeInfo)
        console.log("basic info");
        console.log(this.empbasicinfo);
        for (let i = 0; i < this.empbasicinfo.length; i++) {
          let hasChild = false;
          let select = false;
          let expand = false;
          let nodeClick = false;
       
          for (let j = 0; j < this.empbasicinfo.length; j++) {

            if (this.empbasicinfo[i].employeeId === this.empbasicinfo[j].reportingManager) {
              hasChild = true;
            }
            if(this.empbasicinfo[i].employeeId == this.userlogged){
              select = true;
              expand = true;
              nodeClick = true;


            }
          }

          let empId = parseInt(this.empbasicinfo[i].employeeId, 10);
          let manager = parseInt(this.empbasicinfo[i].reportingManager, 10);
          if (empId == manager) {
            let name = this.empbasicinfo[i].firstname + ' ' + this.empbasicinfo[i].lastname;
            console.log("Full Name :", name);

            // if(this.empbasicinfo[i].image == null){
            
            //   this.txt = true;
            // let fname = this.empbasicinfo[i].firstname;
            // let lname = this.empbasicinfo[i].lastname;
            // let f = fname[0].toUpperCase();
            // let l =lname[0].toUpperCase();
            // let initails = f + l;
            // console.log("Text Data : ", initails);
            // const img = initails;
            // let erole = this.roleList.find(r => r.id == this.empbasicinfo[i].title);
            // let emp: Object = { 'id': empId, 'name': name, 'hasChild': hasChild, job: erole.designation, expanded: true, eimg: img };
            // this.localData.push(emp);
            // } 
            //else {
              const img = "data:image/jpeg;base64,"+ this.empbasicinfo[i].image;
              this.pic1=true;
            let erole = this.roleList.find(r => r.id == this.empbasicinfo[i].title);
            let domainname = this.subList.find(d => d.id == this.onboarding[i].sbuId)
            let emp: Object = { 'id': empId, 'name': name, 'hasChild': hasChild, job: erole.designation, expanded: true, eimg: img, domain:domainname.name,selected: select,nodeClicked: nodeClick};
            this.localData.push(emp);
          //}
          } else {
            // if(this.empbasicinfo[i].image == null){
            
            //   this.txt = true;
            //   let fname = this.empbasicinfo[i].firstname;
            //   let lname = this.empbasicinfo[i].lastname;
            //   let f = fname[0].toUpperCase();
            //   let l =lname[0].toUpperCase();
            //   let initails = f + l;
            //   console.log("Text Data1 : ", initails);
            //   const img = initails;
            //   let name = this.empbasicinfo[i].firstname + ' ' + this.empbasicinfo[i].lastname;
            //   let pid = this.empbasicinfo[i].reportingManager;
            //   let erole = this.roleList.find(r => r.id == this.empbasicinfo[i].title);
            //   let emp: Object = { 'id': empId, 'pid': pid, 'name': name, 'hasChild': hasChild, job: erole.designation, eimg: img }           
            //   this.localData.push(emp);
            //   } else 
            //{

              const img = "data:image/jpeg;base64,"+ this.empbasicinfo[i].image;
              this.pic1 = true;
            let name = this.empbasicinfo[i].firstname + ' ' + this.empbasicinfo[i].lastname;
            let pid = this.empbasicinfo[i].reportingManager;
            let erole = this.roleList.find(r => r.id == this.empbasicinfo[i].title);
            let domainname = this.subList.find(d => d.id == this.onboarding[i].sbuId)
            let emp: Object = { 'id': empId, 'pid': pid, 'name': name, 'hasChild': hasChild, job: erole.designation, eimg: img, domain:domainname.name,expanded: true,selected: select,nodeClicked: nodeClick}           
            this.localData.push(emp);
           //}
          }
        }
        console.log("empData");
        console.log(this.localData);
        this.field = { dataSource: this.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        
        console.log(this.field);
        this.getNodeToShow();
      }
    }
    );}
  }
    );
    this.getSBU();
   this.getemploymentdetails();
  }

    /*   this.ht.get("http://localhost:3000/users").subscribe(res=>
      
      {console.log(res);
        
        this.localData=res;
      if(res)
      {
        this.field= { dataSource: this.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        console.log(this.localData);
        console.log(this.field);
      }
      }
      
      
      ) */

      getContact() {
        this.hrms.getContactInfo(this.contactReq).subscribe(resp => {
          this.contactDetails = resp;
          this.contactInfo = this.contactDetails.empContacts;
          console.log('Contact Info : ', this.contactInfo);
  
        }
      );
      }


      roleList;
      roleResp;
      getRole() {
       const roleReq = {
          "designation":[
                 
          ],
          "sessionId":"3121",
          "transactionType":"getall"
      }
      let roles;
        this.hrms.getEmployeeDesignation(roleReq).subscribe(res => {
          this.roleResp = res;
          roles = this.roleResp.listDesignation;
          console.log('Role Response', roles);
          
        });
        return roles;
      }


      getSBU(){
        var request = {
             "subBusinessUnitModel": [
             {
             }
        ],
            "transactionType" : "getAll"
    }
         this.hrms.getSubbusinessUnit(request).subscribe(res =>{
          this.subbusinessunitDetails = res;
          this.subBusinessUnitlist = this.subbusinessunitDetails;
          this.subList=this.subBusinessUnitlist.subBusinessUnitList;
         console.log("subusList details :", this.subList);
             
         });
      }


      getemploymentdetails() {
        var employmentdetailss =
        {
          "employmentDetails": [{
          
          }],
          "transactionType": "getAll"
        }
        this.hrms.getonboardingdetails(employmentdetailss).subscribe(response => {
          this.employmentdetailsss = response;
          this.onboarding = this.employmentdetailsss.employmentDetailsList;
          console.log("Employeement details :", this.onboarding);
          
      

        });
      }

  }
