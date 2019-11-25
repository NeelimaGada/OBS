import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  OBSLoginForm: FormGroup;
  userid: any;
  val:any="password";
  eye1=true;
 
 
  eye(){
    if(this.eye1==true){
    this.val="text";
      this.eye1=false;
  }
    else{
      this.val="password";
      this.eye1=true;
    }

   
  }
  
  constructor(private fb: FormBuilder, private authService: AuthService, private routerNavigate: Router) { }
  responseData: any;
  multiple_roles: any;
  roles: any = []
  status
  LoginAction(formData: any) {


    this.authService.loginAction(formData).subscribe(res => {
      this.multiple_roles = res['authorities']
      this.roles.push(this.multiple_roles.split(" ", 1));

      this.roles.push(this.multiple_roles);
      localStorage.setItem('userData', res['authorization']);
      localStorage.setItem("UserName", formData.UserName);
      localStorage.setItem("Role", this.roles[0])


      this.routerNavigate.navigate(['dashboard']);
    },
      err => {
        console.log(err)
        console.log("error");
        this.status = true;
      }
    );

  }

  ngOnInit() {
    $(document).ready(function () {
      $('.login-content [data-toggle="flip"]').click(function () {
        $('.login-box').toggleClass('flipped');
        return false;
      });
    });


    this.OBSLoginForm = this.fb.group({
      'UserName': [null, (Validators.required,Validators.pattern('[0-9]*'))],
      'UserPassword': [null, Validators.required]
    });
    this.userid=this.OBSLoginForm;
    this.forgotForm = new FormGroup({
      'eid': new FormControl('', [Validators.required, Validators.pattern('[0-9]*[A-Z]*')])
    });

    localStorage.removeItem("error")
  }

  link(){
    if(this.OBSLoginForm.invalid)
    return false;

  }
  //jquery
  isError: boolean = false;
  errMsg;
  forgotForm;
  mailResp;
  sendMail() {
    console.log('forgot clicked');
    let req = {
      'forgotPassword':
      {
        'employeeId': this.forgotForm.value.eid
      }
      ,
      'transactionType': 'sendMail'
    };
    this.routerNavigate.navigate(['forgot']);
    this.authService.sendOtp(req).subscribe(res => {
      this.mailResp = res;


    },
      err => {
        this.mailResp = err;
        this.isError = true;
        this.errMsg = this.mailResp.error.message;
        this.authService.errorMsg = this.isError;
        console.log('Error state in login : ', this.authService.errorMsg);


      }
    );

  }
  number(e){
    var key=e.keyCode
    if(key>=48 && key<=57)
    return true
    else
    return false
  }
}
