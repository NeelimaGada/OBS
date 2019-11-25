import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { PsaService } from '../psa.service';
@Component({
  selector: 'app-sezlocation',
  templateUrl: './sezlocation.component.html',
  styleUrls: ['./sezlocation.component.scss']
})
export class SezlocationComponent implements OnInit {

  
  value: boolean;
  table: any;
  id: any;
  status: any;
  addb=true;
  sezlocres: any;
  noedit: boolean;
  searchfield: boolean;
  private pageSize: number = 5;
  sid: any;
  sezlocationList: string;

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getSezLoc();
  }

  //getall
  getSezLoc(){


var Requestdata={
	"sezlocationList":[{

	}],	
	"transactionType":"getAll"
}
console.log("req data",Requestdata)
this.psa.getSezLoc(Requestdata).subscribe(responce=>{
this.sezlocres=responce;
console.log("Get response",this.sezlocres.sezlocationList)
this.table=this.sezlocres.sezlocationList;
})

}
//get all close

//save
setSezLoc(s)
{
  console.log("s",s)
var reqData=
{
	"sezlocationList":[{
		"sezlocationId":this.sid,
		"sezlocationName":s.addsezlocation,
		"status":true
		
	}],
   "transactionType":"save"
		
}


console.log("Requested",reqData);

this.psa.setSezLoc(reqData).subscribe((response:any)=>{
  this.sezlocres = response;
  console.log("Response",this.sezlocres);
 
  if(this.sezlocres.message == "service details has saved successfully")
  {
  
    swal("Sez Location has saved successfully", "","success");
    this.getSezLoc();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed edit","","error");
 
  this.getSezLoc();
 
});
this.id="",
this.sezlocationList="",
this.value=false;

}
//save close

updateSezLoc(sezlocTable){
  
 // this.searchfield=false;

  console.log("updating value ",sezlocTable);
  var updateRequestData = 
  {
	"sezlocationList":[{
		"sezlocationId":this.sid,
		"sezlocationName":sezlocTable.sezloc1,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}



console.log("Requested",updateRequestData)
this.addb=true;
  this.psa.updateSezLoc(updateRequestData).subscribe((res:any) =>{
    this.sezlocres = res;
    console.log(this.sezlocres);
     if(this.sezlocres.message == "service details has updated successfully"){
       swal("Sez Location has updated successfully", "","success");
       this.getSezLoc;
       this.noedit = false;
     }
     
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getSezLoc();
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
 this.getSezLoc();
  }
  clear(){
   this.sezlocationList="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getSezLoc();
    }
}



