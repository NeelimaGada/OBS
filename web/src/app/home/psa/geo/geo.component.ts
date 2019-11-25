import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnInit {

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
  
projecttype:any;
  locationTypeList: string;
  locationtypearr: any;
  location: any;
  locationtype:any;
  locationtypeTable:any
  geo: string;
 

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.  GetGeo();
  }
  
  //getall
  GetGeo(){
console.log("getLocation ");


var Requestdata={
  "geoList": [
      {
          
      }
  ],
  "transactionType": "getall"
}
console.log("success",Requestdata)
this.psa.GetGeo(Requestdata).subscribe(responce=>{
this.locationtype=responce;

console.log("Get response",this.locationtype)
console.log("Get response",this.locationtype.geoList)
this.table=this.locationtype.geoList;
})

}
//get all close

//save
SetGeo()
{
  
var reqData=
{
  "geoList":[{


  "geo":this.geo,
  "status":true


  
  }],    
  "transactionType":"save"
}





console.log("reqdata",reqData);

this.psa.SetGeo(reqData).subscribe((response:any)=>{
  this. locationtype= response;
  console.log("Save response",this. locationtype);
 
  if(this. locationtype.message == "Geo details has saved successfully")
  {
  
    swal("Geo Location has saved successfully", "","success");
    this. GetGeo();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  if(this.locationtype.message == "service details has saved successfully")
  this.locationtypearr = this. locationtype.locationTypeList;
  this. GetGeo();
 
});
this.id="",
this.location="",
this.value=false;

}
//save close

UpdateGeo(locationtypeTable){
  
 // this.searchfield=false;

  console.log("ratetypeTable",locationtypeTable);
  var updateRequestData = 
  {
    "geoList":[{
    "geoId":this.sid,
    "geo":locationtypeTable.geo,
    "status":this.status


    
    }],    
    "transactionType":"update"
}
console.log("success",updateRequestData)
this.addb=true;
  this.psa.UpdateGeo(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "Geo details has updated successfully"){
       swal("Geo location has updated successfully", "","success");
       this.GetGeo();
       this.noedit = false;
     }
     this.GetGeo();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.GetGeo();
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
 this.GetGeo();
  }
  clear(){
   this.geo="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.GetGeo();
    }
  
}