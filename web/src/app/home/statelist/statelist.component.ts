import { Component, OnInit } from '@angular/core';
import { Statelist } from './statelist.model';
import { OrderPipe } from 'ngx-order-pipe';
import { HrmsService } from '../services/hrms.service';
import swal from 'sweetalert';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss']
})
export class StatelistComponent implements OnInit {


  deleteStateRes: any;
  updateRes: any;
  statelist: any;
  StateList: any;
  StateDetails: any;
  StateRes: any;
  value: boolean;
  private pageSize: number = 5;
  stateId: any;
  constructor(private hrms: HrmsService) {

  }

  ngOnInit() {
    this.getStateListData();
  }
  getStateListData() {
    var request = {

      "states":
        [],

      "sessionId": "1234",
      "transactionType": "getAll"

    }
    this.hrms.getStateListMaster(request).subscribe(res => {
      this.StateDetails = res;
      this.StateList = this.StateDetails.statesList;
      console.log("ststelistgetAll", this.StateDetails);
    })
  }
  noedit: boolean;
  searchfield=false;
  addb=true;
  edit(id) {
    this.searchfield=true;
    this.stateId = id;
    this.noedit = true;
    this.value=false;
    this.addb=false;
  }
  cancel() {
this.noedit=false;
this.searchfield=false;
this.addb=true;
this.getStateListData();
  }
  updateStateData(state) {
    this.searchfield=false;

    var requestData = {

      "states":
        [{
          "stateName": state.stateName,
          "id": this.stateId
        }],

      "sessionId": "1234",
      "transactionType": "update"

    }
    this.hrms.updateStateListMaster(requestData).subscribe(response => {
      this.StateRes = response;
      this.addb=true;
      console.log("satauslistupdate", this.StateRes);
      if (this.StateRes.message == "Successfully record updated") {
        this.value = false;
        this.noedit = false;
        swal(this.StateRes.message, "", "success");
        this.getStateListData();
      }
    },
      error => {
        swal("Duplicates are not allowed", "", "error");
        this.getStateListData();
        this.noedit = false;
      })
  }


  stateName: any;
  cancelstatelist() {

    this.value = false;
  }
  clear() {
    this.statelist = "";
  }

  setState(aa) {
    var requestData = {

      "states":
        [{
          "stateName": aa.statelist,
        }],
      "transactionType": "save"

    }

    this.hrms.saveStateListMaster(requestData).subscribe((response: any) => {
      this.StateRes = response;
      console.log("ststeListsave", this.StateRes);
      if (this.StateRes.message == "Successfully record added") {
        this.value = false;
        swal("Record Added", "", "success");
        this.getStateListData();
      }
    },
      error => {
        swal("Record is Already Exists", "", "error");

        this.statelist = ""
        this.getStateListData();
      })
    this.statelist = ""
    this.value = false
  }




  deleteSate(state) {
    var deleteRequest = {
      "states": {
        "id": state.id,
        "stateName": state.stateName
      },
      "transactionType": "delete",
      "sessionId": "132"
    }
    this.hrms.deleteStateList(deleteRequest).subscribe(data => {
      this.deleteStateRes = data;
      if (this.deleteStateRes.statusMessage == "Successfully record deleted") {
        swal(this.deleteStateRes.statusMessage, "", "success");
        // this.getStatus();
      }
    })

  }


}
