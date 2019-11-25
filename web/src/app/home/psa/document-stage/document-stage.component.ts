import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-document-stage',
  templateUrl: './document-stage.component.html',
  styleUrls: ['./document-stage.component.scss']
})
export class DocumentStageComponent implements OnInit {

  

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
    
  
    documentTypeList: string;
    documenttypearr: any;
  
    documenttypeTable: any;
   documenttype:any
  
    constructor(private psa:PsaService) { }
  
    ngOnInit() {
     this. getDocument();
    }
    //getall
    getDocument(){
  console.log("getDocument called");
  
  
  var Requestdata={
    "doucumentStageList":[{
    
        
  
  
  
    }],    
    "transactionType":"getall"
  }
  console.log("success",Requestdata)
  this.psa.getDocument(Requestdata).subscribe(responce=>{
  this.documenttype=responce;
  
  console.log("Get response",this.documenttype)
  console.log("Get response",this.documenttype. doucumentStageList)
  this.table=this.documenttype. doucumentStageList;
  })
  
  }
  //get all close
  
  //save
  setDocument()
  {
    console.log()
  var reqData=
  {
    "doucumentStageList":[{
       
  "documentstage":"this.documentstage",
  "status":true
   
    }],   
    "transactionType":"save"
  }
  
  
  
  
  console.log("reqdata",reqData);
  
  this.psa.setDocument(reqData).subscribe((response:any)=>{
    this. documenttype= response;
    console.log("Save response",this. documenttype);
   
    if(this. documenttype.message == "document stage details has saved successfully ")
    {
    
      swal("document stage details has saved successfully ", "","success");
      this. getDocument();
    }
    
  },
  error => 
    {
    swal("Duplicates are not allowed","","error");
  
    if(this.documenttype.message == "document stage details has saved successfully ")
    this.documenttypearr = this. documenttype.documentTypeList;
    this. getDocument();
   
  });
  
  this.id="",
  this. documenttype="",
  this.value=false;
  
  }
  //save close
  
  UpdateDocument(documenttypeTable){
    
   // this.searchfield=false;
  
    console.log("documenttypetable",documenttypeTable);
    var updateRequestData = 
    {
      "doucumentStageList":[{
          "documentstageId":2,
         
  "documentstage":this.documenttype,
  "status":false
     
      }],   
      "transactionType":"update"
  }
  
  console.log("success",updateRequestData)
  this.addb=true;
    this.psa.UpdateDocument(updateRequestData).subscribe((res:any) =>{
      this.masterList = res;
      console.log(this.masterList);
       if(this.masterList.message == "service details has updated successfully"){
         swal("Project tech stack has updated successfully", "","success");
         this.getDocument();
         this.noedit = false;
       }
       this.getDocument();
      },
      error => 
    {
    swal("Duplicates are not allowed","","error");
    this.getDocument();
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
   this.getDocument();
    }
    clear(){
     this.documenttype="";
   }
   cancel() {
    this.noedit=false;
    this.searchfield=false;
    this.addb=true;
    this.getDocument();
      }
  }