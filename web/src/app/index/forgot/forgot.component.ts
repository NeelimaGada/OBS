import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {


  model = {
    employeeId: '',
    otp: '',
    password: '',
    confirmPassword: ''
  };
  errMsg;
  response;
  errResp = false;
  onSubmit() {
    let req = {
      "forgotPassword":
      {
        "employeeId": this.model.employeeId,
        "otp": this.model.otp,
        "newPassword": this.model.confirmPassword
      }
      ,
      "transactionType": "update"
    };
    this.auth.updatePassword(req).subscribe(res => {
      this.response = res;
      this.errResp = false;
      swal('', this.response.message, 'success');
      this.route.navigate(['login']);
    },
      err => {
        this.response = err;
        this.errResp = true;
        this.errMsg = this.response.error.message;
        swal('', this.response.error.message, 'error');
      }
    );
  }

  errState: boolean;

  constructor(private auth: AuthService, private route: Router) { }
  ngOnInit() {
    setTimeout(err => { err = this.auth.errorMsg; this.errState = err; }, 500);
    
    console.log('Error state : ', this.errState);
    
  }
goToLogin() {
  this.route.navigate(['/login']);
}

number(e){
  var key=e.keyCode
  if(key>=48 && key<=57)
  return true
  else
  return false
}
eye1=true;


val1:any="password";
val2:any="password";
 


eyeA(){
  if(this.eye1==true){
  this.val1="text";
    this.eye1=false;
}
  else{
    this.val1="password";
    this.eye1=true;
  }
}

eyeB(){
 
  if(this.eye1==true){
  this.val2="text";
    this.eye1=false;
}
  else{
    this.val2="password";
    this.eye1=true;
  }
}
}


