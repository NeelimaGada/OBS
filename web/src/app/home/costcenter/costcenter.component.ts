import { Component, OnInit } from '@angular/core';
import { Costcenter } from './costcenter.model';
import { NgForm } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { HrmsService } from '../services/hrms.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-costcenter',
  templateUrl: './costcenter.component.html',
  styleUrls: ['./costcenter.component.scss']
})
export class CostcenterComponent implements OnInit {
  deletedDetails: any;
  id: any;
  costCenterCode: any;
  updateRes: any;
  coscentergetlist: any;
  costCenterList: any;
  costcenterRes: any;
  value:boolean;
  key:any;
  private pageSize: number = 5;

  role;
  hide;

  bulist: any;
  costCenterid: any;
  addbb=true;
  constructor(private hrms: HrmsService) {
  }

  ngOnInit() {
    this.getCostCenter();
    this.role = localStorage.getItem("Role");
    if (this.role == "ROLE_ADMIN") {
      this.hide = true;
    }
  
  }

   



  cancelbulist() {
    this.value = false;

  }
  clear() {
    this.costCenterCode = "";

    
  }


  setCostcenterData(a) {
    var requestData = {


      "costCenter": [{


        "costCenterCode": a.costCenterCode

      },
      ],

      "sessionId": "124",


      "transactionType": "save"

    }
    this.hrms.setCostcenter(requestData).subscribe((responce: any) => {
      this.costcenterRes = responce;
      console.log(this.costcenterRes);
      if (this.costcenterRes.message == "Successfully record added") {
        this.value = false;
        swal(this.costcenterRes.message, "", "success");
        this.getCostCenter();
      }
    },
      error => {
        swal("Duplicates are not allowed", "", "error");
        this.getCostCenter()
      })
    this.costCenterCode = "";
    this.value = false;
  }
  getCostCenter() {
    var request =
    {


      "costCenter": [{


      }],

      "sessionId": "124",


      "transactionType": "get"

    }
    this.hrms.getCostcenter(request).subscribe(res => {
      this.costCenterList = res;
      this.coscentergetlist = this.costCenterList.listOfCostCenter;
      console.log("id of costcenter",this.costCenterList);
    })
  }
  noedit: boolean;
  searchfield=false;
  edit(id){
this.costCenterid=id;
this.noedit = true;
this.value=false;
this.searchfield=true;
this.addbb=false;
  }

  cancel() {
    this.noedit=false;
    this.searchfield=false;
    this.getCostCenter();
    this.addbb=true;
      }

  saveUpdateValues(bulist) {
    console.log(bulist);
    this.searchfield=false;
    var updateRequestData = {
      "costCenter": [{
        "id": this.costCenterid,
        "costCenterCode": bulist.costCenterCode
      }],

      "sessionId": "123",
      "transactionType": "update"
    }

    this.hrms.updateCostCenter(updateRequestData).subscribe((res: any) => {
      this.updateRes = res;
    this.addbb=true;
      console.log(this.updateRes);
      if (this.updateRes.message == "Successfully record updated") {
        this.noedit = false;
        swal(this.updateRes.message, "", "success");
        this.getCostCenter();
       
      }
    },
      error => {
        this.noedit = false;
        swal("Record Already Exist", "", "error");
        this.getCostCenter();


      })
  
  }
  //   deleteCostCenter(bulist) {
  //   var deleteReq = {
  //     "costCenter" : {
  //              "id" : bulist.id,
  //              "costCenterCode" : bulist.costCenterCode
  //     },
  //     "sessionId" : "123",
  //             "transactionType" : "delete"
  // }
  // this.hrms.deleteCostCenter(deleteReq).subscribe(res =>{
  // this.deletedDetails = res;
  // console.log(this.deletedDetails);
  // if(this.deletedDetails.statusMessage == "Successfully record deleted"){
  // swal(this.deletedDetails.statusMessage, "","success");
  // this.getCostCenter();
  // }
  // })

  //   }

}
