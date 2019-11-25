import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-billingtype',
  templateUrl: './billingtype.component.html',
  styleUrls: ['./billingtype.component.scss']
})
export class BillingtypeComponent implements OnInit {
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
  billingTypearr: any;
  billingTypelist: any;
  billingname: string;
  name: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getbillingtype();
  }
  //getall
  getbillingtype(){


var Requestdata={
	"billingList" :[{

	}],
	"transactionType" :"getall"
}
  
console.log("success",Requestdata)
this.psa.getbillingtype(Requestdata).subscribe(responce=>{
this.billingTypelist=responce;

console.log("Get response",this.billingTypelist)
console.log("Get response",this.billingTypelist.billingList)
this.table=this.billingTypelist.billingList;
})

}
//get all close 

//save
setbillingtype()
{
  // console.log("s",s.addBillingType)
var reqData=
{
	"billingList":[{
		"id":this.id,
		"name":this.name,
		"value":true
		
	}],
   "transactionType":"save"
		
}
console.log("success",reqData);

this.psa.setbillingtype(reqData).subscribe((response:any)=>{
  this.billingTypelist = response;
  console.log("Save response",this.billingTypelist,this.billingTypelist.message);
 
  if(this.billingTypelist.message == "record saved successfully")
  {
  
    swal("Billing type has saved successfully", "","success");
    this.getbillingtype();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.billingTypearr = this.billingTypelist.deliverylocationList;
  this.getbillingtype();
 
});
this.id="",
this.name="",
this.value=false;

}
//save close

updatebillingtype(billingname){
  
 // this.searchfield=false;

  console.log("updating value is",billingname);
  var updateRequestData = 
  {
	"billingList":[{
		"id":this.sid,
		"name":billingname.name,
		"value":this.status
		
	}],
   "transactionType":"update"
		
}
console.log("request sent",updateRequestData)
this.addb=true;
  this.psa.updatebillingtype(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList,res);
     if(this.masterList.message == "updated successfully"){
      swal("Billing Type has updated successfully", "","success");
       this.getbillingtype();
       this.noedit = false;
     }
     console.log("success update")
     
    },
    error => 
  {
    console.log("error")
  swal("Duplicates are not allowed","","error");
  this.getbillingtype();
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
 this.getbillingtype();
  }
  clear(){
   this.name="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getbillingtype();
    }
}