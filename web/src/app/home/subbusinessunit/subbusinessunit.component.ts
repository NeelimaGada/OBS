import { Component, OnInit } from '@angular/core';
import { Businessunit } from './subbusinessunit.model';
import { NgForm } from '@angular/forms';
import { Costcenter } from './subbusinessunit.model';
import { HrmsService } from '../services/hrms.service';
import swal from 'sweetalert';
import { clearTemplate } from '@syncfusion/ej2-angular-base';

@Component({
  selector: 'app-subbusinessunit',
  templateUrl: './subbusinessunit.component.html',
  styleUrls: ['./subbusinessunit.component.scss']
})
export class SubbusinessunitComponent implements OnInit {
  updateSubbusinessDetails: any;
  costCenterId: any;
  businessUnitId: any;
  coscentergetlist: any;
  costCenterList: any;
  businessUnitList: any = [];
  businessunitDetails: any;
  subBusinessUnitlist: any;
  subbusinessunitDetails: any;
  subbusinessunitRes: any;
  subbusinessunit: any;
  businessunit: any;
  costcenter: any;
  requestData: { "businessUnit": any; "costCenter": any; "subbusinessUnit": any; "sbuHead":any; };
  value: boolean;
  getSubbusinessinfo: any;
  id: any;
  private pageSize: number = 5;
  isEditable: boolean = false;
  reverse: boolean = false;
  selectedBusinessunit: any;
  savesbu: any;
  businessUnitName: any;
  getbusinessname: any;
  sid: any;
  sbuHead: string;
  empList: any;
  empId: {}[];
  sbuids: {}[];
  empbasic: any;

  constructor(private hrms: HrmsService) {
    this.getBusinessunit();
    this.getSubBusinessUnit();
    this. getempdata();
  }

  ngOnInit() {

  }
  cancelbulist() {
    this.value = false;
    
  }
  clear() {

    this.subbusinessunit = "";
    this.businessUnitName = "";
    this.costCenterId = "";
    this.sbuHead="";
  }

  savebu: any;
  
  setSubbusinessunit(sbu) {
    
    var requestData = {
      "subBusinessUnitModel": [{
        "businessUnitId": this.businessUnitId,
        "name": this.subbusinessunit,
        "sbuHead":sbu.firstname
      }],

      "transactionType": "save"
    }
    this.hrms.setSubbusinessunit(requestData).subscribe((response: any) => {
      this.subbusinessunitRes = response;
      console.log(this.subbusinessunitRes);

      if (this.subbusinessunitRes.message == "Successfully record added") {
        swal(this.subbusinessunitRes.message, "", "success");
        this.getSubBusinessUnit();
      }
    },
      error => {
        swal("Please enter valid data", "", "error");
        this.getSubBusinessUnit();

      })

    this.value = false;

    this.costCenterId = "",
      this.businessUnitId = "",
      this.subbusinessunit = "",
      this.sbuHead=""
  }

  getSubBusinessUnit() {
    var request = {
      "subBusinessUnitModel": [
        {
        }
      ],
      "transactionType": "getAll"
    }
    this.hrms.getSubbusinessUnit(request).subscribe(res => {
      this.subbusinessunitDetails = res;
      this.subBusinessUnitlist = this.subbusinessunitDetails.subBusinessUnitList;
      console.log("subulistttttttt", this.subBusinessUnitlist);

      for (let i = 0; i <= this.subBusinessUnitlist.length; i++) {

       
        let bu = this.businessUnitList.find(bul => bul.id == this.subBusinessUnitlist[i].businessUnitId)
        this.subBusinessUnitlist[i].businessUnitId = bu.businessUnitName;

       
      }


    })
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
      console.log("businessUnitListiiiiiiiiiiiiii", this.businessUnitList);
    })
  }

  getCostCenter() {
    var request = {
      "costCenter": [{
      }],
      "sessionId": "123",

      "transactionType": "get"
    }
    this.hrms.getCostcenter(request).subscribe(res => {
      this.costCenterList = res;
      this.coscentergetlist = this.costCenterList.listOfCostCenter;
      console.log(this.costCenterList);
    })
  }
  noedit: boolean;
  addb=true;
  searchfield=false;
  edit(i) {
    this.sid = i;
    this.noedit = true;
    this.value=false;
    this.searchfield=true;
    this.addb=false;

  }
  cancel() {
    this.noedit=false;
    this.searchfield=false;
this.addb=true;
    this.getCostCenter();
    this.getBusinessunit();
    this.getSubBusinessUnit();
      }
  saveUpdatedValues(bulist) {
    this.searchfield=false;

    var request = {
      "subBusinessUnitModel": [{

        "id": this.sid,
        "name": bulist.name,
        "businessUnitId": bulist.businessUnitId,
        "sbuHead":bulist.firstname
      }],
      "sessionId": "123",
      "transactionType": "update"

    }

    console.log("req of sbu", request);
    this.addb=true;
    this.hrms.updateSubbusinessUnit(request).subscribe((res: any) => {
      this.updateSubbusinessDetails = res;
      console.log(this.updateSubbusinessDetails);
      if (this.updateSubbusinessDetails.message == "Successfully record updated") {
        this.noedit = false;

        swal(this.updateSubbusinessDetails.message, "", "success");
        this.searchfield=false;

        this.getSubBusinessUnit();

      }
    },
      error => {
        this.noedit = false;
        swal("Duplicates are not allowed", "", "error");
        this.getSubBusinessUnit();
      })
  }

  onSelectCostId(event: any) {
    this.selectedBusinessunit = event;
    console.log(this.selectedBusinessunit);

  }
  employeeInfo:Object;
  sbuHeadData = [];
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
this.sbuids = Array.from(new Set(this.subBusinessUnitlist.map(x => x.sbuHead)));
console.log("sbuHeadidslist",this.sbuids);

      for (let n = 0; n <= this.empId.length; n++) {
        for (let m = 0; m < this.sbuids.length; m++) {
          if (this.empId[n] == this.sbuids[m]) {
            this.sbuHeadData.push(this.empList[m]);
           
          }
        }
      }
      console.log("empbaisdata",this.sbuHeadData);
})
  }
}