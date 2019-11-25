import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http:HttpClient) {}
  host_url:any=`${environment.host_url}`;

  
  getTimesheets(requestObj){
    return this.http.post(this.host_url+"/obs/timesheet/get",requestObj);
  }
  saveTimesheet(requestObj){
    return this.http.post(this.host_url+"/obs/timesheet/set",requestObj);
  }
  updateTMSStatus(requestObj){
    return this.http.post(this.host_url+"/obs/timesheet/set",requestObj);
  }
  getProjectDetails(){

  }
  getfile(requestObj){
    return this.http.post(this.host_url+"/obs/timesheet/get",requestObj);
  }
  getemployees(requestObj){
    return this.http.post(this.host_url+"/obs/employeeInfo/get",requestObj);

  }
}
