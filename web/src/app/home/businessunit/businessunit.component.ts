import { Component, OnInit } from '@angular/core';
import { Businessunit } from './businessunit.model';
import { NgForm } from '@angular/forms';
import { Costcenter } from './businessunit.model'
import { HrmsService } from '../services/hrms.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-businessunit',
  templateUrl: './businessunit.component.html',
  styleUrls: ['./businessunit.component.scss']
})
export class BusinessunitComponent implements OnInit {
  BudeleteDetails: any;
  buupdateDetails: any;
  id: any;
  value: boolean;
  coscentergetlist: any;
  costCenterList: any;
  costCenterId: any;
  businessUnitName: any;
  businessUnitList: any;
  businessUnitlist: any;
  businessunitDetails: any;
  businessunitRes: any;
  addbb=true;
  private pageSize: number = 5;
  buId: any;
  buHead: any;
  empbasic: any;
  empbasicin: any;
  empList: any;
  empId: {}[];
  buids: {}[];

  constructor(private hrms: HrmsService) {
    this.getCostCenter();
  }

  role;
  hide: boolean;
  ngOnInit() {
    this.getBusinessunit();
   this.getempdata();

    this.role = localStorage.getItem("Role");
    if (this.role == "ROLE_ADMIN") {
      this.hide = true;
    }
  }


  cancelbulist() {
    this.value = false;

  }
  clear() {
    this.businessUnitName = "";
    this.costCenterId = "";
    this.buHead = "";
  }

  setBusinessunit(bu) {
    var requestData =  {
  	"businessUnit" :[{
    
    	"businessUnitName":this.businessUnitName,
    	"costCenterId":this.costCenterId,
    	"buHead":bu.firstname
  	}],
  
   
      "transactionType": "save"
    }


    this.hrms.setBusinessunit(requestData).subscribe((response: any) => {
      this.businessunitRes = response;
      console.log(this.businessunitRes);
      if (this.businessunitRes.message == "Successfully record added") {

        swal(this.businessunitRes.message, "", "success");
        this.getBusinessunit();
      }
    },
      error => {
        swal("Record Already Exists", "", "error");
        this.getBusinessunit();
      })
    this.businessUnitName = "",
      this.costCenterId = "",
      this.buHead="",
      this.value = false;
  }

  getBusinessunit() {
    var request = {
      "businessUnit": [{

      }],
      "transactionType": "getAll"
    }

    this.hrms.getBusinesinfo(request).subscribe(res => {
      this.businessunitDetails = res;
      this.businessUnitList = this.businessunitDetails.businessUnitList;
      console.log("BU Details : ", this.businessUnitList);

      console.log("Cost center list : ", this.coscentergetlist);
      for (let i in this.businessUnitList) {

        let cost = this.coscentergetlist.find(cst => cst.id == this.businessUnitList[i].costCenterId);
        console.log("costCenterId",cost);
        this.businessUnitList[i].costCenterId = cost.costCenterCode;
      }
    })
  }

  getCostCenter() {
    var request = {


      "costCenter": [{


      }],

      "sessionId": "124",


      "transactionType": "get"

    }

    this.hrms.getCostcenter(request).subscribe(res => {
      this.costCenterList = res;
      this.coscentergetlist = this.costCenterList.listOfCostCenter;
      console.log(this.costCenterList);
    })
  }
  noedit: boolean;
  searchfield=false;
  edit(d) {
    this.buId = d.id;
    this.noedit = true;
    this.value=false;
    this.addbb=false;
    this.searchfield=true;
  }
  cancel() {
    this.noedit = false;
    this.searchfield=false;
    this.addbb=true;
    this.getBusinessunit();
  }
  saveUpdatedBuData(bulist) {
    this.searchfield=false;
    var burequest = {
      "businessUnit": [{
        "id": this.buId,
        "businessUnitName": bulist.businessUnitName,
        "costCenterId": bulist.costCenterId,
        "buHead":bulist.firstname
      }],
      "transactionType": "update",
      "sessionId": "132"
    }
    console.log("BU update Request : ", burequest);
this.addbb=true;
    this.hrms.updateBusinessunit(burequest).subscribe((res: any) => {
      this.buupdateDetails = res;
      console.log(this.buupdateDetails);
      if (this.buupdateDetails.message == "Successfully record updated") {
        this.noedit = false;
        swal(this.buupdateDetails.message, "", "success");
        this.getBusinessunit();
      }

    },
      error => {
        this.noedit = false;
        swal("Record Already Exists", "", "error");
        this.getBusinessunit();
      })

  }
  deleteBuData(bulist) {
    var budeletereq = {
      "businessUnit": {
        "id": bulist.id,
        "businessUnitName": bulist.businessUnitName,
        "costCenterId": bulist.costCenterId,
        "buHead":bulist.buHead
      
      },
      "transactionType": "delete",
      "sessionId": "132"
    }
    this.hrms.deleteBusiness(budeletereq).subscribe(res => {
      this.BudeleteDetails = res;
      console.log(this.BudeleteDetails);
      if (this.BudeleteDetails.statusMessage == "Success fully record deleted") {

        this.getBusinessunit();
      }
    })
  }
  employeeInfo:Object;
buHeadData = [];
  getempdata() {
  
    var empinfo =
    {
      "employeeInfo": [{

      }],
      "transactionType": "getall"
    }

    this.hrms.getempinfo(empinfo).subscribe(res => {
      this.empbasic = res;
      this.empList=this.empbasic.employeeInfo
      console.log("empdata",this.empList);
this.empId = Array.from(new Set(this.empList.map(x => x.employeeId)));
console.log("empIds",this.empId)
this.buids = Array.from(new Set(this.businessUnitList.map(x => x.buHead)));
console.log("buHeadidslist",this.buids);

      for (let n = 0; n <= this.empId.length; n++) {
        for (let m = 0; m < this.buids.length; m++) {
          if (this.empId[n] == this.buids[m]) {
            this.buHeadData.push(this.empList[m]);
           
          }
        }
      }
      console.log("empbaisdata",this.buHeadData);
})
  }



}
