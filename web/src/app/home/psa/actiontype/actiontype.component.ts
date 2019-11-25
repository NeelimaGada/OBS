import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-actiontype',
  templateUrl: './actiontype.component.html',
  styleUrls: ['./actiontype.component.scss']
})
export class ActiontypeComponent implements OnInit {

  actiontypelist: any;
  table: any;
  id:any;
  actiontypeListarr:any;
  actiontype:string;
  value:boolean;
  addb=true;
  private pageSize: number = 5;
  sid:any;
  noedit:boolean;
  searchfield:boolean;
  status:any;

  constructor(private psa: PsaService) { }

  ngOnInit() {
    this.getActionType();

  }

//getAll
  getActionType() {
    var actionType =
    {
      "actionTypeList": [
        {


        }
      ],
      "transactionType": "getall"
    }


    this.psa.getActionType(actionType).subscribe(res => {

      this.actiontypelist = res;
      console.log("Get response", this.actiontypelist)
      console.log("Get response", this.actiontypelist.actionTypeList)
      this.table = this.actiontypelist.actionTypeList;

    }

    )
  }



  //save
setActionType()
{
  //console.log("s",s)
 
var actionTypereqData=
{
	"actionTypeList":[{
    
    
    "actiontype":this.actiontype,
		"status":true
		
	}],
   "transactionType":"save"
		
}
console.log("success",actionTypereqData);

this.psa.setActionType(actionTypereqData).subscribe((response:any)=>{
  this.actiontypelist = response;
  console.log("Save response",this.actiontypelist,this.actiontypelist.message);
 
  if(this.actiontypelist.message == "action type details saved successfully")
  {
  
    swal("action type details saved successfully", "","success");
    this.getActionType()
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.actiontypeListarr = this.actiontypelist.actionTypeList[0];
  this.getActionType()
 
});
this.id="",
this.actiontype="",
this.value=false;

}


// getById

edit(id, status) {
  console.log("edit", id)
  this.sid = id;
  this.noedit = true;
  this.value = false;
  this.status = status
  this.addb = false;
  this.searchfield = true;
}


//update Action Type

actionList:any;

updateActionType(actionTypeName){
  var updateActionreq={
    "actionTypeList": [
        {
            "id":this.sid,
            "actiontype": actionTypeName.actiontype,
            "status": true
        }
    ],
    "transactionType": "update"
}
this.addb = true;
this.psa.updateActionType(updateActionreq).subscribe(res=>{
  console.log(res)
this.actionList=res;

if (this.actionList.message == "action type has updated successfully") {
  swal("Action Type has been updated successfully", "", "success");
  this.getActionType();
  this.noedit = false;
}
console.log("success update")

},
error => {
  console.log("error")
  swal("Duplicates are not allowed", "", "error");
  this.getActionType();
  this.noedit = false;
})

this.searchfield = false;



}

cancelbulist() {
  this.value = false;
  this.addb = true;
  this.getActionType();
}


clear() {
  this.actiontype = "";
}


cancel() {
  this.noedit = false;
  this.searchfield = false;
  this.addb = true;
  this.getActionType();
}


}
