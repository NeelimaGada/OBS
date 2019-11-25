
import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Resourcetype } from './resource.model';
import swal from 'sweetalert';
import { HrmsService } from '../services/hrms.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-resoucetype',
  templateUrl: './resoucetype.component.html',
  styleUrls: ['./resoucetype.component.scss']
})
export class ResoucetypeComponent implements OnInit {

  

  
  order: string = 'resourceType'
  value: boolean;
  data; 
  resource: any;
  private pageSize: number = 5;

  
  
  resourcetype: any;
  isEditable:boolean = false;
  reverse: boolean = false;
  resourceTypeName: any;
  reid: any;
  
  
  constructor(private hrms:HrmsService)
{

}

  
  ngOnInit() 
 
  {

    this.getResource();
  }
  


  

getResourceDetails:any;
getResourceList:any;
getResource()
{
  var getresrequest =
  {
    "resourceTypes":[
            {
            
            }
    ],
    "transactionType":"getAll"
}
  this.hrms.getResourceType(getresrequest).subscribe(res =>{
    this.getResourceDetails = res;
    console.log(this.getResourceDetails);
    this.getResourceList = this.getResourceDetails.employmentDetailsList;
    console.log(this.getResourceList);
    
  })
}



//--Set Resource--------------------
res:any;
setResourceTypeReq:any;

setResource(e){
  var requestsaveData = 
  {
    "resourceTypes":[
            {
                    
                    "resourceTypeName":this.resourceTypeName
                    
            }
    ],
    "transactionType":"save"
}
  
this.hrms.setResourceType(requestsaveData).subscribe((response:any) =>
  {

this.setResourceTypeReq = response;
console.log(this.setResourceTypeReq);


if(this.setResourceTypeReq.statusMessage == "Resource Type saved successfully")
{
 swal(this.setResourceTypeReq.statusMessage, "","success");
 this.resourceTypeName=null;
 //this.getResource();
}
  },
  error => 
  {
  swal("Duplicates are not allowed","","error");
})

this.res="";
this.getResource();
this.value=false;

}

//----updateSeparation--------------------
updateResResp:any;
updateResRespListArr:any
noedit: boolean;
searchfield=false;
addb=true;
edit(id){
  this.reid=id;
  this.noedit = true;
  this.value=false;
  this.addb=false;
  this.searchfield=true;
}
cancel() {
  this.noedit=false;
  this.searchfield=false;
this.addb=true;
  this.getResource();
    }

updateResource(rtlist)
{
  this.searchfield=false;
 
  var updateResRequestData = 
  {
    "resourceTypes":[
            {
                    "id":this.reid,
                    "resourceTypeName":rtlist.resourceTypeName
                    
            }
    ],
    "transactionType":"update"
}

this.addb=true;
  this.hrms.updateResourceType(updateResRequestData).subscribe((res:any) =>{
    this.updateResResp = res;
    this.updateResRespListArr=this.updateResResp.employmentDetailsList;
    console.log(this.updateResResp);
    if(this.updateResResp.statusMessage == "Resource Type updated successfully"){
      this.noedit = false;
      swal(this.updateResResp.statusMessage, "","success");
      this.getResource();
    }
  },
  error => 
  {
    this.noedit = false;
  swal("Duplicates are not allowed","","error");
  })
  this.getResource();
}


cancelrtlist()
  {
    this.value=false;
  }
  clear(){
    this.resourceTypeName="";
  }

}

