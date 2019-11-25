import { Component, OnInit } from '@angular/core';



import { HrmsService } from '../services/hrms.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-separationtype',
  templateUrl: './separationtype.component.html',
  styleUrls: ['./separationtype.component.scss']
})
export class SeparationtypeComponent implements OnInit {
  value: boolean = false;
  data;
  separation: any;
  separationType;
  sortedCollection: any[];

  separationtype: any;
  isEditable: boolean = false;
  reverse: boolean = false;
  order: string = 'separationType';
  private pageSize: number = 5;
  sid: any;



  constructor(private hrms: HrmsService) {

  }


  ngOnInit() {
    this.getSeparation();
  }


  //--------------Separation Starts------
  //---getSeparation-------------
  separationDetailsList: any;
  separationDetails: any;
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
      console.log("list of separation", this.separationDetailsList);
    })
  }

  //--Save Separation Type--------------------------------
  //value: boolean;
  //isEditable:boolean = false;
  //reverse: boolean = false;

  saveseparationReq: any;
  separationtypeid: any;
  setSeparation() {
    var requestsaveData =
    {
      "separationType": [
        {
          "separationTypeId": this.separationtypeid,
          "separationType": this.separationtype

        }
      ],
      "sessionId": "1234",
      "transactionType": "save"



    }
    this.hrms.saveSeperationType(requestsaveData).subscribe((response: any) => {
      this.saveseparationReq = response;
      console.log(this.saveseparationReq);

      if (this.saveseparationReq.message == " Record Saved Successfully") {
        swal(this.saveseparationReq.message, "", "success");
        this.getSeparation();
      }

    },
      error => {
        swal("Duplicates are not allowed", "", "error");
      })
    this.getSeparation();
    this.separationtype = "",
      this.value = false;
  }


  //--Update Separation Type--------------------------------
  updatedseparationRes: any;
  separationTypeListArr: any;
  noedit: boolean;
  searchfield=false;
  addb=true;
  edit(id) {
    this.sid = id;
    this.noedit = true;
    this.value=false;
    this.addb=false;
    this.searchfield=true;
  }
  cancel() {
    this.noedit = false;
    this.searchfield=false;
    this.addb=true;
    this.getSeparation();
  }
  updateSeparation(separation) {
    this.searchfield=false;
    var updateRequestData =
    {
      "separationType": [
        {
          "separationTypeId": this.sid,
          "separationType": separation.separationType

        }
      ],
      "sessionId": "1234",
      "transactionType": "update"


    }
    this.addb=true;
    this.hrms.updateSeperationType(updateRequestData).subscribe((res: any) => {
      this.updatedseparationRes = res;
      this.separationTypeListArr = this.updatedseparationRes.separationTypeList;
      console.log(this.updatedseparationRes);

      if (this.updatedseparationRes.message == "Record Updated Successfully") {
        this.noedit = false;
        swal(this.updatedseparationRes.message, "", "success");
        this.getSeparation();
      }
    },
      error => {
        this.noedit = false;
        swal("Duplicates are not allowed", "", "error");
        this.getSeparation();
      })
  }
  cancelbulist() {
    this.value = false;
  }
  clear() {
    this.separationtype = "";
  }

  //--End of Separation Type--------------------------------
}