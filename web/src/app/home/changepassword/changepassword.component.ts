import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import  swal   from 'sweetalert';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  model = {
    employeeId: '',
    curruntPassword: '',
    Password   : '',
    confirmPassword: ''
  };
  errMsg;
  response;
  errResp = false;


  errState: boolean;
  loggeduser;

  constructor(private auth: AuthService, private route: Router) { 
    this.loggeduser = localStorage.getItem('UserName');
  }
  ngOnInit() {
    setTimeout(err => { err = this.auth.errorMsg; this.errState = err; }, 500);
    
    console.log('Error state : ', this.errState);
    
  }
// goToLogin() {
//   this.route.navigate(['/dashboard']);
// }

number(e){
  var key=e.keyCode
  if(key>=48 && key<=57)
  return true
  else
  return false
}


onSubmit(data) {
  let req ={
    "pwd":{
        "employeeId": this.loggeduser,
        "curruntPassword": data.currentpassword,
        "newPassword": data.password,
        "updatedBy": this.loggeduser
    },
    "transactionType":"update"
}

console.log("datda", req);

  this.auth.ResetPassword(req).subscribe(res => {
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


eye1=true;

val:any="password";
val1:any="password";
val2:any="password";
 
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
