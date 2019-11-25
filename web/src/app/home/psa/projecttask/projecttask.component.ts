import { Component, OnInit } from '@angular/core';
import { PsaService } from '../psa.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-projecttask',
  templateUrl: './projecttask.component.html',
  styleUrls: ['./projecttask.component.scss']
})
export class ProjecttaskComponent implements OnInit {


  projecttasklist:any;
  table:any;
  projecttasklistarr:any;
  id:any;
  projecttask:String;
  value:boolean;
  private pageSize: number = 5;
  addb=true;
  sid:any;
  noedit:boolean;
  status:any;
  searchfield:boolean;


  constructor(private psa: PsaService) { }

  ngOnInit() {

    this.getProjectTaskList();
  }



  // getAll

  getProjectTaskList(){
    var ptaskList={
      "projecttasklist": [
          {
             
          }
      ],
      "transactionType": "getall"
  }

this.psa.getProjectTask(ptaskList).subscribe(res=>{
  
      // console.log(res)

      this.projecttasklist = res;
      console.log("Get response", this.projecttasklist)
      console.log("Get response", this.projecttasklist.projecttasklist)
      this.table = this.projecttasklist.projecttasklist;
})


  }


  saveProjectTask(){

  //  console.log("saveptaskreq",saveptaskreq)

    var saveProjectTaskReqObject={
      "projecttasklist": [
          {
             "projecttask": this.projecttask,
              "status": true
          }
      ],
      "transactionType": "save"
  }


  this.psa.setProjectTask(saveProjectTaskReqObject).subscribe(res=>
    {

this.projecttasklist=res;
console.log("Save response",this.projecttasklist,this.projecttasklist.message);
 
if(this.projecttasklist.message == "project task details has saved successfully")
{

  swal("project task details has been saved successfully", "","success");
  this.getProjectTaskList();
}

},
error => 
{
swal("Duplicates are not allowed","","error");

this.projecttasklistarr = this.projecttasklist.projecttasklist[0];
this.getProjectTaskList();

});
this.id="",
this.projecttask="",
this.value=false;

  }



  edit(id, status) {
    console.log("edit", id)
    this.sid = id;
    this.noedit = true;
    this.value = false;
    this.status = status
    this.addb = false;
    this.searchfield = true;
  }



  //update Action Type

taskList:any;

updateProjectTask(updateptaskobj){

  console.log("updateptaskobj",updateptaskobj)
  var updateProjectreq={
    "projecttasklist": [
        {
            "projecttaskId":this.sid,
            "projecttask": updateptaskobj.projecttask,
            "status": true
        }
    ],
    "transactionType": "update"
}
this.addb = true;
this.psa.updateProjectTask(updateProjectreq).subscribe(res=>{
  
this.taskList=res;
console.log("res",this.taskList)

if (this.taskList.message == "project task has updated successfully") {
  swal("Project Task has been updated successfully", "", "success");
  this.getProjectTaskList();
  this.noedit = false;
}
console.log("success update")

},
error => {
  console.log("error")
  swal("Duplicates are not allowed", "", "error");
  this.getProjectTaskList();
  this.noedit = false;
})

this.searchfield = false;



}

cancelbulist() {
  this.value = false;
  this.addb = true;
  this.getProjectTaskList
}


clear() {
  this.projecttask = "";
}


cancel() {
  this.noedit = false;
  this.searchfield = false;
  this.addb = true;
  this.getProjectTaskList();
}


}
