import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { PsaService } from '../psa.service';

@Component({
  selector: 'app-servicetype',
  templateUrl: './servicetype.component.html',
  styleUrls: ['./servicetype.component.scss']
})
export class ServicetypeComponent implements OnInit {
  servicetypelist: any;
  value: boolean;
  table: any;
  id: any;
  serviceType: any;
  status: any;
  addb=true;
  masterList: any;
  noedit: boolean;
  searchfield: boolean;
  private pageSize: number = 5;
  sid: any;
  ServiceArr: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getServiceTypeInfo();
  }
  //getall
getServiceTypeInfo(){
//console.log("servicetype info function called");

var Requestdata={
  "servicetypeList" : [{
  
          
  }],
  "transactionType" : "getall"
}
console.log("success",Requestdata)
this.psa.getservicetype(Requestdata).subscribe(responce=>{
this.servicetypelist=responce;
//this.servicetypelist=this.servicetypelist.servicetypeList;
console.log("Get response",this.servicetypelist)
console.log("Get response",this.servicetypelist.servicetypeList)
this.table=this.servicetypelist.servicetypeList;
})
console.log("servicetype info function called");
}
//get all close

//save
setservicetype()
{
var reqData=
{
	"servicetypeList":[{
		"id":this.id,
		"serviceType":this.serviceType,
		"status":true
		
	}],
   "transactionType":"save"
		
}
console.log("success",reqData);

this.psa.setservicetype(reqData).subscribe((response:any)=>{
  this.servicetypelist = response;
  console.log("Save response",this.servicetypelist,this.servicetypelist.message);
 
  if(this.servicetypelist.message == "service details has saved successfully")
  {
  
    swal(this.servicetypelist.message, "","success");
    this.getServiceTypeInfo();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.ServiceArr = this.servicetypelist.servicetypeList;
  this.getServiceTypeInfo();
 
});
this.id="",
this.serviceType="",
this.value=false;

}
//save close

updateservicetype(servicetable){
  
 // this.searchfield=false;

  console.log("servicetable",servicetable);
  var updateRequestData = 
  {
	"servicetypeList":[{
		"id":this.sid,
		"serviceType":servicetable.serviceType,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}
console.log("success",updateRequestData)
this.addb=true;
  this.psa.updateservicetype(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "service details has updated successfully"){
       swal(this.masterList.message, "","success");
       this.getServiceTypeInfo;
       this.noedit = false;
     }
     this.getServiceTypeInfo();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getServiceTypeInfo();
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
 this.getServiceTypeInfo();
  }
  clear(){
   this.serviceType="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getServiceTypeInfo();
    }
}







