import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-ratetype',
  templateUrl: './ratetype.component.html',
  styleUrls: ['./ratetype.component.scss']
})
export class RatetypeComponent implements OnInit {

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
  rateTypelistArr: any;
  billingTypelist: any;
  rateType: string;
  rateTypelist: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getRatetype();
  }
  //getall
  getRatetype(){


var Requestdata={
	"rateType":[{
    
	}],	
	"transactionType":"getall"
}
  
console.log("success",Requestdata)
this.psa.getRatetype(Requestdata).subscribe(responce=>{
this.rateTypelist=responce;

console.log("Get response",this.rateTypelist)
console.log("Get response",this.rateTypelist.rateTypeList)
this.table=this.rateTypelist.rateTypeList;
})

}
//get all close 

//save
setRatetype()
{
 // console.log("s",s.addrateType)
var reqData=
{
	"rateType":[{
		"id":this.id,
		"rateType":this.rateType,
		"status":true
		
	}],
   "transactionType":"save"
		
}
console.log("success",reqData);

this.psa.setRatetype(reqData).subscribe((response:any)=>{
  this.rateTypelist = response;
  console.log("Save response",this.rateTypelist,this.rateTypelist.message);
 
  if(this.rateTypelist.message == "RateType  saved successfully")
  {
  
    swal("Rate type has saved successfully", "","success");
    this.getRatetype();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.rateTypelistArr = this.rateTypelist.rateTypeList;
  this.getRatetype();
 
});
this.id="",
this.rateType="",
this.value=false;

}
//save close

updateRatetype(ratetypename){
  
 // this.searchfield=false;

  console.log("updating value is",ratetypename);
  var updateRequestData = 
  {
	"rateType":[{
		"id":this.sid,
		"rateType":ratetypename.rateType,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}
console.log("request sent",updateRequestData)
this.addb=true;
  this.psa.updateRatetype(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList,res);
     if(this.masterList.message == "RateType has updated successfully"){
      swal("Rate type has updated successfully", "","success");
       this.getRatetype();
       this.noedit = false;
     }
     console.log("success update")
     
    },
    error => 
  {
    console.log("error")
  swal("Duplicates are not allowed","","error");
  this.getRatetype();
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
 this.getRatetype();
  }
  clear(){
   this.rateType="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getRatetype();
    }
}