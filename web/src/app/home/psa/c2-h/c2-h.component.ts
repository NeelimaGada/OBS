import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-c2-h',
  templateUrl: './c2-h.component.html',
  styleUrls: ['./c2-h.component.scss']
})
export class C2HComponent implements OnInit {

  
  
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
  c2hstatus:any;
  c2harr: any;
  

  c2hres: any;
  

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this.getC2H();
  }
  //getall
  getC2H(){
console.log("getc2H called");


var Requestdata={
  "c2hstatuslist": [
      {
      }
  ],
  "transactionType": "getall"
}



console.log("req data",Requestdata)
this.psa.getC2H(Requestdata).subscribe(responce=>{
this.c2hres=responce;

console.log("Get response",this.c2hres)
console.log("Get response",this.c2hres.c2hstatuslist)
this.table=this.c2hres.c2hstatuslist;
})

}
//get all close

//save
setC2H()
{
  // console.log("s",s)
var reqData=
{
	"c2hstatuslist":[{
		"c2hstatusId":this.id,
		"c2hstatus":this.c2hstatus,
		"status":true
		
	}],
   "transactionType":"save"
		
}

console.log("reqdata",reqData);

this.psa.setC2H(reqData).subscribe((response:any)=>{
  this.c2hres = response;
  console.log("Save response",this.c2hres);
 
  if(this.c2hres.message == "C2HStatus has saved successfully")
  {
  
    swal("C2H status has saved successfully", "","success");
    this.getC2H();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.c2harr = this.c2hres.c2hstatuslist;
  console.log(this.c2harr,"array")
  this.getC2H();
 
});
this.id="",
this.c2hstatus="",
this.value=false;

}
//save close

updateC2H(c2hStatusname){
  
 // this.searchfield=false;

  console.log("c2hstatus",c2hStatusname);
  var updateRequestData = 
  {
	"c2hstatuslist":[{
		"c2hstatusId":this.sid,
		"c2hstatus":c2hStatusname.c2hstatus,
		"status":this.status
		
	}],
   "transactionType":"update"
		
}




console.log("success",updateRequestData)
this.addb=true;
  this.psa.updateC2H(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "C2HStatus has updated successfully"){
       swal("C2H status has updated successfully", "","success");
       this.getC2H;
       this.noedit = false;
     }
     this.getC2H();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getC2H();
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
 this.getC2H();
  }
  clear(){
   this.c2hstatus="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getC2H();
    }
}