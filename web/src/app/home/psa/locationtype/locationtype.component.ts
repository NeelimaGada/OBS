import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { PsaService } from '../psa.service';

@Component({
  selector: 'app-locationtype',
  templateUrl: './locationtype.component.html',
  styleUrls: ['./locationtype.component.scss']
})
export class LocationtypeComponent implements OnInit {

 
  
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
  locationtype: any;
  locationtypearr: any;
  locationTypeList: string;
  locationType: string;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getlocationType();
  }
  //getall
  getlocationType(){
console.log("getlocation called");


var Requestdata={
  "locationTypeList": [
      {
        
      }
  ],
  "transactionType": "getall"
}
console.log("success",Requestdata)
this.psa.getlocationType(Requestdata).subscribe(responce=>{
this.locationtype=responce;

console.log("Get response",this.locationtype)
console.log("Get response",this.locationtype.locationTypeList)
this.table=this.locationtype.locationTypeList;
})

}
//get all close

//save
setlocationType(s)
{
  console.log("s",s)
var reqData=
{
	"locationTypeList":[{
		"locationtypeId":this.sid,
		"locationType":s.addlocationtype,
		"status":true
		
	}],
   "transactionType":"save"
		
}



console.log("reqdata",reqData);

this.psa.setlocationType(reqData).subscribe((response:any)=>{
  this.locationtype = response;
  console.log("Save response",this.locationtype);
 
  if(this.locationtype.message == "service details has saved successfully")
  {
  
    swal("Locationlist has saved successfully", "","success");
    this.getlocationType();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.locationtypearr = this.locationtype.locationTypeList;
  this.getlocationType();
 
});
this.id="",
this.locationTypeList="",
this.value=false;

}
//save close

updatelocationType(locationtypeTable){
  
 // this.searchfield=false;

  console.log("locationtypeTable",locationtypeTable);
  var updateRequestData = 
  {
	"locationTypeList":[{
		"locationtypeId":this.sid,
		"locationType":locationtypeTable.locationType1,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}



console.log("success",updateRequestData)
this.addb=true;
  this.psa.updatelocationType(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "service details has updated successfully"){
       swal("Location List has updated successfully", "","success");
       this.getlocationType;
       this.noedit = false;
     }
     this.getlocationType();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getlocationType();
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
 this.getlocationType();
  }
  clear(){
   this.locationType="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getlocationType();
    }
}



