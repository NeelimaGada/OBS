import { Injectable } from "@angular/core";
import { HrmsService } from '../home/services/hrms.service';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  accessToken: any;
  responseData:any;
  multiple_roles: any;
   roles:any=[]
   errorMsg: boolean;
  constructor(private obj:HrmsService,private http:HttpClient,private routerNavigate:Router) {}


  

  public isAuthenticate(): boolean {
    //method return true or false based on login credential
   const userData=localStorage.getItem('userData');

    if(userData && userData.length>0){
      return true;
    }
    else{
    return false;
    }
  }
 
  url:any="http://192.168.1.48:8089";

  public loginAction(postData){

    var userObj={username:postData.UserName,password:postData.UserPassword}
    
    

  
    return this.http
      .post(this.url + '/login', userObj);
     
     
    }
  
  
    
   
  public SignUp(postData) {
    //registraion api
  }
  public async logOutAction() {
    //session/local storage clear
    await localStorage.removeItem('userData');
    await localStorage.removeItem('UserName');
    await localStorage.clear();
    return true;
  }

  public async getUserdata(){
    
    const userData=sessionStorage.getItem('userData');
    return JSON.parse(userData)
  }

  public getToken(): string {
    return localStorage.getItem('userData');
  }

  public  getEmployeeData():any{
    var res= this.http.get('http://192.168.7.64:8089/backend/user');
    return res;
  }

  
  public sendOtp(req) {
    return this.http.post(this.url + '/forgot/set', req);
  }

  public updatePassword(req){
    return this.http.post(this.url + '/forgot/set', req);
  }

  public ResetPassword(req){
   return this.http.post(this.url + '/obs/ResetPassword/set', req);

  }
}

