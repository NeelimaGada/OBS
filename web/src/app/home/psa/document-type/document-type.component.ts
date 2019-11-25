import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  
 
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

  documenttypelist: any;
  documenttype: any;
  setdocumetdata: any;

  documentArr: (arg0: string, documenttypelist: any) => any;

  getDocumentTypeInfo: any;
  documenttype_type: string;
  documenttypeId: any;
  dId: any;

  constructor(private psa:PsaService) { }

  ngOnInit() {
    this.getdocumenttype()
  }




 getdocumenttype(){
    //console.log("servicetype info function called");
    
    var Requestdata={

      
        "documenttypelist":[{
        
        
        }], 
        "transactionType":"getall"
      }
  
    
    console.log("success",Requestdata)
    this.psa.getDocument_Type(Requestdata).subscribe(responce=>{
    this.documenttypelist=responce;
    //this.servicetypelist=this.servicetypelist.servicetypeList;
    console.log("Get response",this.documenttypelist)
    console.log("Get response",this.documenttypelist.documenttypelist)
    this.table=this.documenttypelist.documenttypelist;
    })
    console.log("documenttype function called");
    }
    //get all close
    





    //save
    setdocumenttype(s)
    {
    var reqData=
    {
      "documenttypelist": [
          {
              "documenttype":s.adddocument,
              "status":true
          }
      ],
      "transactionType": "save"
  }
 
    console.log("success",reqData);
    
    this.psa.setDocument_Type(reqData).subscribe(response=>{
      this.setdocumetdata = response;
      console.log("Save response",this.setdocumetdata,this.setdocumetdata.message);
     
  
      
        swal(this.setdocumetdata.message, "","success");
    this.getdocumenttype()
      
      
    },
    error => 
      {
      swal("Duplicates are not allowed","","error");
    
      this.documentArr = this.setdocumetdata.documenttypelist;
      this.getdocumenttype()
     
    });
    this.documenttype="",
    this.value=false;
    
    }
    // //save close
    



    

    updatedocument(documenttable){
      
     // this.searchfield=false;
    
      console.log("documenttable",documenttable);


      var updateRequestData = 
      {
        "documenttypelist": [
            {
                "documenttypeId": this.dId,
                "documenttype": documenttable.documenttype_type,
                "status": this.status
            }
        ],
        "transactionType": "update"
    }
    console.log("success",updateRequestData)
    this.addb=true;
      this.psa.updateDocument_Type(updateRequestData).subscribe((res:any) =>{
        this.masterList = res;
        console.log(this.masterList);
    
           swal(this.masterList.message, "","success");
           this.getDocumentTypeInfo;
           this.noedit = false;

         this.getdocumenttype()
        },
        error => 
      {
      swal("Duplicates are not allowed","","error");
      this.getdocumenttype()
      this.noedit = false;
      })
      this.searchfield=false;
      }
    
    
        edit(id,status){
          console.log("edit",id)
          this.dId=id;
          this.noedit = true;
          this.value=false;
          this.status=status;
          this.addb=false;
          this.searchfield=true;
          }
    
    
    
    
    cancelbulist(){
      this.value=false;
      this.addb=true;
      this.getdocumenttype()
      }
      clear(){
       this.documenttype_type="";
     }
     cancel() {
      this.noedit=false;
      this.searchfield=false;
      this.addb=true;
      this.getdocumenttype()
        }



}