import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { PsaService } from '../psa.service';

@Component({
  selector: 'app-interviewmode',
  templateUrl: './interviewmode.component.html',
  styleUrls: ['./interviewmode.component.scss']
})
export class InterviewmodeComponent implements OnInit {
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
  interviewModearr: any;
  interviewmodelist: any;
  interviewMode: string;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getInterviewMode();
  }
  //getall
  getInterviewMode(){


var Requestdata={
  "interviewmodeList" : [{
         
  }],
  "transactionType" : "getall"
}
console.log("success",Requestdata)
this.psa.getInterviewMode(Requestdata).subscribe(responce=>{
this.interviewmodelist=responce;

console.log("Get response",this.interviewmodelist)
console.log("Get response",this.interviewmodelist.interviewmodeList)
this.table=this.interviewmodelist.interviewmodeList;
})

}
//get all close

//save
setInterviewMode(s)
{
var reqData=
{
	"interviewmodeList":[{
		"interviewmodeId":this.sid,
		"interviewMode":s.addinterviewMode,
		"status":"True"
		
	}],
   "transactionType":"save"
		
}
console.log("success",reqData);

this.psa.setInterviewMode(reqData).subscribe((response:any)=>{
  this.interviewmodelist = response;
  console.log("Save response",this.interviewmodelist,this.interviewmodelist.message);
 
  if(this.interviewmodelist.message == "service details has saved successfully")
  {
  
    swal("Interview Mode details has saved successfully", "","success");
    this.getInterviewMode();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.interviewModearr = this.interviewmodelist.interviewmodeList;
  this.getInterviewMode();
 
});
this.id="",
this.interviewMode="",
this.value=false;

}
//save close

updateinterviewMode(upinterviewMode){
  
 // this.searchfield=false;

  console.log("updating value is",upinterviewMode);
  var updateRequestData = 
  {
	"interviewmodeList":[{
		"interviewmodeId":this.sid,
		"interviewMode":upinterviewMode.interviewMode,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}
console.log("request sent",updateRequestData)
this.addb=true;
  this.psa.updateInterviewMode(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList,res);
     if(this.masterList.message == "service details has updated successfully"){
       swal(this.masterList.message, "","success");
       this.getInterviewMode();
       this.noedit = false;
     }
     console.log("success update")
     
    },
    error => 
  {
    console.log("error")
  swal("Duplicates are not allowed","","error");
  this.getInterviewMode();
  this.noedit = false;
  })
  this.getInterviewMode();
  this.searchfield=false;
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
 this.getInterviewMode();
  }
  clear(){
   this.interviewMode="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getInterviewMode();
    }
}







