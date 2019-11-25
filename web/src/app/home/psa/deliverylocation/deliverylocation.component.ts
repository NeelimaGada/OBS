import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-deliverylocation',
  templateUrl: './deliverylocation.component.html',
  styleUrls: ['./deliverylocation.component.scss']
})
export class DeliverylocationComponent implements OnInit {

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
  deliveryLocarr: any;
  deliveryLoclist: any;
  deliverylocationName: string;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getdeliverylocation();
  }
  //getall
  getdeliverylocation(){


var Requestdata={
  "deliverylocationList":[{
  
    
  
  
    }],	
    "transactionType":"getall"
  }
  
console.log("success",Requestdata)
this.psa.getdeliverylocation(Requestdata).subscribe(responce=>{
this.deliveryLoclist=responce;

console.log("Get response",this.deliveryLoclist)
console.log("Get response",this.deliveryLoclist.deliverylocationList)
this.table=this.deliveryLoclist.deliverylocationList;
})

}
//get all close 

//save
setdeliverylocation()
{
  // console.log("s",s.addDeliveryloc)
var reqData=
{
	"deliverylocationList":[{
		"deliverylocationId":this.id,
		"deliverylocationName":this.deliverylocationName,
		"status":true
		
	}],
   "transactionType":"save"
		
}
console.log("success",reqData);

this.psa.setdeliverylocation(reqData).subscribe((response:any)=>{
  this.deliveryLoclist = response;
  console.log("Save response",this.deliveryLoclist,this.deliveryLoclist.message);
 
  if(this.deliveryLoclist.message == "service details has saved successfully")
  {
  
    swal("Delivery Location has saved successfully", "","success");
    this.getdeliverylocation();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.deliveryLocarr = this.deliveryLoclist.deliverylocationList;
  this.getdeliverylocation();
 
});
this.id="",
this.deliverylocationName="",
this.value=false;

}
//save close

updatedeliverylocation(deliverylocation){
  
 // this.searchfield=false;

  console.log("updating value is",deliverylocation);
  var updateRequestData = 
  {
	"deliverylocationList":[{
		"deliverylocationId":this.sid,
		"deliverylocationName":deliverylocation.deliverylocationName,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}
console.log("request sent",updateRequestData)
this.addb=true;
  this.psa.updatedeliverylocation(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList,res);
     if(this.masterList.message == "service details has updated successfully"){
      swal("Delivery Location has updated successfully", "","success");
       this.getdeliverylocation();
       this.noedit = false;
     }
     console.log("success update")
     
    },
    error => 
  {
    console.log("error")
  swal("Duplicates are not allowed","","error");
  this.getdeliverylocation();
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
 this.getdeliverylocation();
  }
  clear(){
   this.deliverylocationName="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getdeliverylocation();
    }
}
