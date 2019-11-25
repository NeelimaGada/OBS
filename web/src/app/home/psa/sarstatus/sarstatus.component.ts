import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-sarstatus',
  templateUrl: './sarstatus.component.html',
  styleUrls: ['./sarstatus.component.scss']
})
export class SarstatusComponent implements OnInit {
  sartypeList: any;
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
  sarType: string;
  SarArr: any;
  sarStatus: any;
  // sartypeList: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getSarTypeInfo();
  }
  //getall
getSarTypeInfo(){
console.log("servicetype info function called");

var Requestdata={
  "sarstatusList":[{
    
  
  }], 
  "transactionType":"getall"
}
console.log("req data",Requestdata)
this.psa.getsarstaustype(Requestdata).subscribe(responce=>{
this.sartypeList=responce;
//this.sarstatusList=this.sarstatusList.servicetypeList;
console.log("Get response",this.sartypeList)
console.log("Get response",this.sartypeList.sarstatusList)
this.table=this.sartypeList.sarstatusList;
})
console.log("sartype info function called");
}
//get all close

//save

setsarstaustype()
{

  // this.setsarstaustype=s.reset();
  //console.log("s",s.addsarStatus);
var reqData=
{

    "sarstatusList":[{
    "sarStatus":this.sarStatus,
    "status":true
  
    
    }], 
    "transactionType":"save"
    
}
console.log("success",reqData);

this.psa.setsarstaustype(reqData).subscribe((response:any)=>{
  this.sartypeList = response;
  console.log("Save response",this.sartypeList,this.sartypeList.message);

  if(this.sartypeList.message == "service details has saved successfully")
  {
  
    swal("Sar Status has saved successfully", "","success");
    this.getSarTypeInfo();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.SarArr = this.sartypeList.sartypeList;
  this.getSarTypeInfo();
 
});
this.id="",
this.sarStatus="",
this.value=false;

}
//save close

updatesarstatustype(sarStatustable){
  
 // this.searchfield=false;

  console.log("sarStatustable",sarStatustable);
  var updateRequestData = 
  {
    "sarstatusList":[{
      "sarstatusId":this.sid,
    "sarStatus":sarStatustable.sarStatus,
    "status":false
  
    
    }], 
    "transactionType":"update"
    
}
console.log("success",updateRequestData)
this.addb=true;
  this.psa.updatesarstatustype(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "service details has updated successfully"){
       swal("Sar Status updated succesfully", "","success");
       this.getSarTypeInfo;
       this.noedit = false;
     }
     this.getSarTypeInfo();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getSarTypeInfo();
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
 this.getSarTypeInfo();
  }
  clear(){
   this.sarStatus="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getSarTypeInfo();
    }
}