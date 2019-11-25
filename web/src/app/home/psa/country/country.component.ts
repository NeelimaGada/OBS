import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

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
  
  countrytypearr: any;
  country: string;
  countrylist:any;
  countrytypeTable:any;
 countrytype:any

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this. GetCountry();
  }
  //getall
  GetCountry(){
console.log("getproject called");


var Requestdata={
  "countrylist":[{
      
  }],
  "transactionType":"getall"
}
console.log("success",Requestdata)
this.psa. GetCountry(Requestdata).subscribe(responce=>{
this. countrytype=responce;

console.log("Get response",this. countrytype)
console.log("Get response",this.countrytype.body.countrylist)
this.table=this.countrytype.body.countrylist;
})

}
//get all close

//save
SetCountry()
{
  
var reqData=
{
  "countrylist":[{
  "country":this.country,
  "status":true
  }],
  "transactionType":"save"
}






console.log("reqdata",reqData);

this.psa.SetCountry(reqData).subscribe((response:any)=>{
  this. countrytype= response;
  console.log("Save response",this.countrytype);
 
  if(this.countrytype.message == "record saved successfully")
  {
  
    swal("country has saved successfully", "","success");
    this. GetCountry();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  if(this.countrytype.message == "record saved successfully")
  this. countrytypearr = this. countrytype.countrylist;
  this. GetCountry();
 
});
this.id="sid",
this.country="",
this.value=false;

}
//save close

UpdateCountry(countrytypeTable){
  
 // this.searchfield=false;

  console.log("ratetypeTable",countrytypeTable);
  var updateRequestData = 
  {
    "countrylist":[{
        "id":this.sid,
    "country":countrytypeTable.country,
    "status":true
    }],
    "transactionType":"update"
}

console.log("success",updateRequestData)
this.addb=true;
  this.psa.UpdateCountry(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "updated successfully"){
       swal("country has updated successfully", "","success");
       this.GetCountry();
       this.noedit = false;
     }
     this.GetCountry();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.GetCountry();
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
 this.GetCountry();
  }
  clear(){
   this.country="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.GetCountry();
    }
}