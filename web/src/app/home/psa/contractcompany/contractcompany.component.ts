import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-contractcompany',
  templateUrl: './contractcompany.component.html',
  styleUrls: ['./contractcompany.component.scss']
})
export class ContractcompanyComponent implements OnInit {
  comcontdata: any;
  comcontlistdata: any;
  comcontabledata:any;
  concomlist: any;
  concomArr: any;
  contcomstatusdata: any;
  value1: boolean;
  btnhide: boolean=true;
  cid: any;
  cvalue:any;
  updateconcomList: any;
  noedit: boolean;
  searchfield: boolean;
  private pageSize:number=5;
  value: any;
  contractCompany: string;


  constructor(private psa:PsaService) { }

  ngOnInit() {
    this.getcomcontract();

  }
  comcontable(comcontable: any) {
    throw new Error("Method not implemented.");
  }


  getcomcontract(){

    var comconreq={
      "companyList":[{

       }],
      "transactionType":"getall"
  }
   console.log(comconreq,"swatg7")
    
    this.psa.getcomcon(comconreq).subscribe(res=>{
      this.comcontdata=res;
      this.comcontlistdata = this.comcontdata.comapnayList;
      console.log("NARAYANA",this.comcontlistdata); 
      this.comcontabledata=this.comcontlistdata;
      console.log(this.comcontabledata,"bfhdafghagj");
      
    
    })
    
  }


  setcontractcom(c)
{
var contcomreqData=
{
    "companyList":[{
        "contractCompany":c.addcontcom,
        "value":"true"
       
    }],
    "transactionType":"save"
}

console.log("success",contcomreqData);

this.psa.savecomcon(contcomreqData).subscribe(respon=>{
  this.concomlist = respon;
  console.log("Save response",this.concomlist,this.concomlist.message);
 
 
  swal(this.concomlist.message, "","success");
    this.getcomcontract();
 
  
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  this.concomArr = this.concomlist.companyList;
  this.getcomcontract();
 
});
this.contcomstatusdata="";
this.value1=false;

}
updatecompanycontract(comcontable){
  
   var updateconcomRequestData = 
   {
   "companyList":[{
     "id":this.cid,
     "contractCompany":comcontable.contcomstatusdata,
     "value":this.cvalue
     
   }],
    "transactionType":"update"
     
 }
 console.log("success",updateconcomRequestData)


 this.btnhide=true;
   this.psa.updatecomcon(updateconcomRequestData).subscribe(res =>{
     this.updateconcomList=res;
     
  swal(this.updateconcomList.message, "","success");
         this.getcomcontract;
        this.noedit = false;
      
      this.getcomcontract();
     },
     error => 
   {
   swal("Duplicates are not allowed","","error");
   this.getcomcontract();
   this.noedit = false;
   })
   this.searchfield=false;
   }


  clear(){
    this.contractCompany="";
  }

  edit(id,value){
    console.log("edit",id)
    this.cid=id;
    this.noedit = true;
    this.cvalue=value;
    this.value1=false;
    this.btnhide=false;
    this.searchfield=true;
    }


cancelsavelist(){
  this.value1=false;
  this.btnhide=true;
 this.getcomcontract();
  }
  cancel() {
    this.noedit=false;
    this.searchfield=false;
    this.btnhide=true;
    this.getcomcontract();
      }



}
