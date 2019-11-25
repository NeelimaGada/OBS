import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-gstlocation',
  templateUrl: './gstlocation.component.html',
  styleUrls: ['./gstlocation.component.scss']
})
export class GstlocationComponent implements OnInit {

  gstLocationTypeList: any;
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
  gstLocationType: string;
  gstLocationArr: any;
  gstCode: string;
  gstlocationName: any;
  // gstLocationTypeList: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getGstLocationInfo();
  }
  //getall
  getGstLocationInfo(){
//console.log("servicetype info function called");

var Requestdata={
  "gstlocationList":[{

  
  

  }], 
  "transactionType":"getAll"
}
console.log("req data",Requestdata)
this.psa. getGstLocation(Requestdata).subscribe(responce=>{
this.gstLocationTypeList=responce;
//this.gstLocationList=this.gstLocationList.servicetypeList;
console.log("Get response",this.gstLocationTypeList)
console.log("Get response",this.gstLocationTypeList.gstlocationList)
this.table=this.gstLocationTypeList.gstlocationList;
})
console.log("sartype info function called");
}
//get all close

//save

setgstLocationtype(s)
{

  // this.setgstLocationtype=s.reset();
  console.log("s",s);
var reqData=
{

  "gstlocationList":[{

   
    "gstlocationName":s.addgstLocation,
    "gstcode":s.addgstLocation1,
    "status":true
  
    }], 
    "transactionType":"save"
    
}
console.log("success",reqData);

this.psa.setGstLocation(reqData).subscribe((response:any)=>{
  this.gstLocationTypeList = response;
  console.log("Save response",this.gstLocationTypeList,this.gstLocationTypeList.message);

  if(this.gstLocationTypeList.message == "service details has saved successfully")
  {
  
    swal("GST Status has saved successfully", "","success");
    this.getGstLocationInfo();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.gstLocationArr = this.gstLocationTypeList.gstLocationTypeList;
  this.getGstLocationInfo();
 
});
this.id="",
this.gstLocationType="",
this.gstCode="",
this.value=false;

}
//save close

updategstLocationtype(gstLocationtable){
  
 // this.searchfield=false;

  console.log("gstLocationtable",gstLocationtable);
  var updateRequestData = 
  {
    "gstlocationList":[{

      "gstlocationId":this.sid,
    "gstlocationName":gstLocationtable.gstLocation_type,
    "gstcode":gstLocationtable.gstLocation_type1,
    "status":this.status
  
    }], 
    "transactionType":"update"
    
}
console.log("success",updateRequestData)
this.addb=true;
  this.psa. updateGstLocation(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "service details has updated successfully"){
       swal("GST Details updated succesfully", "","success");
       this.getGstLocationInfo;
       this.noedit = false;
     }
     this.getGstLocationInfo();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getGstLocationInfo();
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
 this.getGstLocationInfo();
  }
  clear(){
   this.gstLocationType="";
   this.gstCode="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getGstLocationInfo();
    }
}