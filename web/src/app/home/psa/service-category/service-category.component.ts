import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { PsaService } from '../psa.service';

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.scss']
})
export class ServiceCategoryComponent implements OnInit {
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
  servicecategorylist: any;
  servicategoryName: string;
  serviceategoryName:any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getServiceCategory();
  }
  //getall
  getServiceCategory(){


var Requestdata={
  "servicecategoryList": [
      {

      }
  ],
  "transactionType": "getall"
}
console.log("success",Requestdata)
this.psa.getServiceCategory(Requestdata).subscribe(responce=>{
this.servicecategorylist=responce;

console.log("Get response",this.servicecategorylist)
console.log("Get response",this.servicecategorylist.servicecategoryList)
this.table=this.servicecategorylist.servicecategoryList;
})

}
//get all close 

//save
setServiceCategory()
{
 // console.log("s",s.addServiceCat)
var reqData=
{
	"servicecategoryList":[{
		"serviceategoryId":this.id,
		"serviceategoryName":this.serviceategoryName,
		"serviceStatus":true
		
	}],
   "transactionType":"save"
		
}
console.log("success",reqData);

this.psa.setServiceCategory(reqData).subscribe((response:any)=>{
  this.servicecategorylist = response;
  console.log("Save response",this.servicecategorylist,this.servicecategorylist.message);
 
  if(this.servicecategorylist.message == "service details has saved successfully")
  {
  
    swal("Service Category details has saved successfully", "","success");
    this.getServiceCategory();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.interviewModearr = this.interviewmodelist.interviewmodeList;
  this.getServiceCategory();
 
});
this.id="",
//this.serviceategoryName="",
this.value=false;

}
//save close

updateServiceCategory(serviceategoryName){
  
 // this.searchfield=false;

  console.log("updating value is",serviceategoryName);
  var updateRequestData = 
  {
	"servicecategoryList":[{
		"serviceategoryId":this.sid,
		"serviceategoryName":serviceategoryName.serviceategoryName,
		"serviceStatus":this.status
		
	}],
   "transactionType":"update"
		
}
console.log("request sent",updateRequestData)
this.addb=true;
  this.psa.updateServiceCategory(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList,res);
     if(this.masterList.message == "service details has updated successfully"){
      swal("Service Category details has updated successfully", "","success");
       this.getServiceCategory();
       this.noedit = false;
     }
     console.log("success update")
     
    },
    error => 
  {
    console.log("error")
  swal("Duplicates are not allowed","","error");
  this.getServiceCategory();
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
 this.getServiceCategory();
  }
  clear(){
   this.servicategoryName="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getServiceCategory();
    }
}
