import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-interviewresult',
  templateUrl: './interviewresult.component.html',
  styleUrls: ['./interviewresult.component.scss']
})
export class InterviewresultComponent implements OnInit {
  InterviewResultList: any;
  value: boolean;
  table: any;
  id: any;
  //serviceType: any;
  status: any;
  addb=true;
  masterList: any;
  noedit: boolean;
  searchfield: boolean;
  private pageSize: number = 5;
  sid: any;
  //ServiceArr: any;
  InterviewResultType: string;
  InterviewResultArr: any;
  InterviewResult: any;
  interviewResult: string;
  // sartypeList: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getInterviewResultInfo();
   console.log("ngOnInit");
   
  }
  //getall
getInterviewResultInfo(){
//console.log("servicetype info function called");

var Requestdata={

  "interviewresultList":[{
  
  
  }], 
  "transactionType":"getall"
  }
console.log("success",Requestdata)
this.psa.getInterviewResults(Requestdata).subscribe(responce=>{
this.InterviewResult=responce;
//this.sarstatusList=this.sarstatusList.servicetypeList;
console.log("Get response",this.InterviewResultList)
console.log("Get response",this.InterviewResult.interviewresultList)
this.table=this.InterviewResult.interviewresultList;
})
console.log("InterviewResult info function called");
}
//get all close

//save
setInterviewResult()
{
  // console.log("s",s.addResult);
var reqData=
{

  "interviewresultList":[{
    "interviewResult":this.interviewResult,
    "status":true
    
  
  }], 
  "transactionType":"save"
    
}
console.log("success",reqData);

this.psa.setInterviewResults(reqData).subscribe((response:any)=>{
  this.InterviewResultList = response;
  console.log("Save response",this.InterviewResultList,this.InterviewResultList.message);
 
  if(this.InterviewResultList.message == "service details has saved successfully")
  {
  
    swal("Interview result has saved successfully", "","success");
    this.getInterviewResultInfo();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.InterviewResultArr = this.InterviewResultList.interviewresultList;
  this.getInterviewResultInfo();
 
});
this.id="",
this.interviewResult="",
this.value=false;

}
//save close

updateInterviewResult(InterviewResulttable){
  
 // this.searchfield=false;

  console.log("InterviewResulttable",InterviewResulttable);
  var updateRequestData = 
  {
    "interviewresultList":[{
      "interviewresultId":this.sid,
      "interviewResult":InterviewResulttable.interviewResult,
      "status":this.status
      
    
    }], 
    "transactionType":"update"
    
}
console.log("success",updateRequestData)
this.addb=true;
  this.psa.updatInterviewResults(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "service details has updated successfully"){
       swal("Interview Result has updated succesfully", "","success");
       this.getInterviewResultInfo;
       this.noedit = false;
     }
     this.getInterviewResultInfo();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getInterviewResultInfo();
  this.noedit = false;
  })
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
 this.getInterviewResultInfo();
  }
  clear(){
   this.interviewResult="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getInterviewResultInfo();
    }
}