import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  value: boolean;
  table: any;
  id: any;
  status: any;
  addb=true;
  masterList: any;
  noedit: boolean;
  searchfield: boolean;
  private pageSize: number = 5;
  sid: any;
  
  ActionOwner: any;
  
  actionOwnerList:any;
  actionOwnerlist:any;
  setActionOwner: any;
  budget: string;
  
  textfield:any
  constructor(private psa:PsaService) { }


  ngOnInit() {
    this.getActionOwner()
  
  }
  //get all//
  getActionOwner() {

    var Requestdata={
      
        actionOwnerList:[{
          
        
        
        }],	
        "transactionType":"getall"
    }
    console.log("success",Requestdata)
    this.psa.getactionOwner(Requestdata).subscribe(responce=>{
    this.actionOwnerlist=responce;
    
    console.log("Get response",this. actionOwnerlist)
    console.log("Get response",this. actionOwnerlist. actionOwnerList)
    this.table=this.actionOwnerlist. actionOwnerList;
    })
    
    }
  

  //save//
  
  setActionowner(a)
{
var reqData=
{
	"actionOwnerList":[{
		"actionowner":a.actionowner,
		"status":"true"

	
	}],	
	"transactionType":"save"
}
console.log("success",reqData);

this.psa.setActionOwner(reqData).subscribe((response:any)=>{
  this.actionOwnerlist = response;
  console.log("Save response",this.actionOwnerlist,this.actionOwnerlist.message);
 
  if(this.actionOwnerlist.message == "action owner details saved successfully")
  {
  
    swal("actionowner details has saved successfully", "","success");
    this. getActionOwner();
    this.value=false;
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.actionOwnerlist = this.actionOwnerlist.actionOwnerlist;
  this. getActionOwner();
 
});

 }

updateactionowner(actionowner){
  
  // this.searchfield=false;
 
   console.log("updating value is",this.textfield);
   var updateRequestData = 
   {
    "actionOwnerList":[
      {
      "actionownerId":this.sid,
      "actionowner":actionowner,
      "status":"true"
  
    
    }],	
    "transactionType":"update"
  }
 console.log("request sent",updateRequestData)
 this.addb=true;
   this.psa.updateactionowner(updateRequestData).subscribe(res =>{
     this.masterList = res;
     console.log(this.masterList);
     this.getActionOwner();
      console.log("success update")
      swal('',this.masterList.message,'success')
     },
     error => 
   {
     console.log("error",error)
  //  swal("Duplicates are not allowed","","error");
  //  this. getActionOwner();
  //  this.noedit = false;
   })
  //  this. getActionOwner();
  //  this.searchfield=false;
   }

   edit(id,status){
    console.log("edit",id)
    this.sid=id;
    this.noedit = true;
    this.value=false;
    this.status=status
    this.addb=false;
    this.searchfield=true;
    }
    cancelbulist(){
      this.value=false;
      this.addb=true;
     this.getActionOwner();
      }
      clear(){
       this.budget="";
     }
     cancel() {
      this.noedit=false;
      this.searchfield=false;
      this.addb=true;
      this.getActionOwner();
        }




  }

