import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-projecttechstack',
  templateUrl: './projecttechstack.component.html',
  styleUrls: ['./projecttechstack.component.scss']
})
export class ProjecttechstackComponent implements OnInit {

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
  projectTypeList: string;
  projecttypearr: any;
  technology: string;
 

  constructor(private psa:PsaService) { }

  ngOnInit() {
   this. getProjectTechStack();
  }
  //getall
  getProjectTechStack(){
console.log("getproject called");


var Requestdata={
  "projectTechStackList": [
      {
          
      }
  ],
  "transactionType": "getall"
}
console.log("success",Requestdata)
this.psa.getProjectTechStack(Requestdata).subscribe(responce=>{
this.projecttype=responce;

console.log("Get response",this.projecttype)
console.log("Get response",this.projecttype.projectTechStackList)
this.table=this.projecttype.projectTechStackList;
})

}
//get all close

//save
setProject()
{
  
var reqData=
{
 "projectTechStackList": [
      {
      "technology":this.technology,
      "status":"true"
         
      }
  ],
  "transactionType": "save"
}




console.log("reqdata",reqData);

this.psa.setProjectTechStack(reqData).subscribe((response:any)=>{
  this. projecttype= response;
  console.log("Save response",this. projecttype);
 
  if(this. projecttype.message == "Project Tech Stack details has saved successfully")
  {
  
    swal("Projecttechstack has saved successfully", "","success");
    this. getProjectTechStack();
  }
  
},
error => 
  {
  swal("Duplicates are not allowed","","error");

  if(this.projecttype.message == "service details has saved successfully")
  this.projecttypearr = this. projecttype.projectTypeList;
  this. getProjectTechStack();
 
});
this.id="",
this.technology="",
this.value=false;

}
//save close

UpdateProject(projecttypeTable){
  
 // this.searchfield=false;

  console.log("ratetypeTable",projecttypeTable);
  var updateRequestData = 
  {
    "projectTechStackList": [
        {
            "id": this.sid,
            "technology": projecttypeTable.technology,
            "status": false
        }
    ],
    "transactionType": "update"
}

console.log("success",updateRequestData)
this.addb=true;
  this.psa.UpdateProjectTechstack(updateRequestData).subscribe((res:any) =>{
    this.masterList = res;
    console.log(this.masterList);
     if(this.masterList.message == "service details has updated successfully"){
       swal("Project tech stack has updated successfully", "","success");
       this.getProjectTechStack();
       this.noedit = false;
     }
     this.getProjectTechStack();
    },
    error => 
  {
  swal("Duplicates are not allowed","","error");
  this.getProjectTechStack();
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
 this.getProjectTechStack();
  }
  clear(){
   this.technology="";
 }
 cancel() {
  this.noedit=false;
  this.searchfield=false;
  this.addb=true;
  this.getProjectTechStack();
    }
}