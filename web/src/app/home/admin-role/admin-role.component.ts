import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss']
})
export class AdminRoleComponent implements OnInit {

  public userData:object
  constructor(private authService:AuthService) { }
  role:any;
  ngOnInit() {
    this.authService.getUserdata().then(data=>{
      this.userData=data;
      console.log(this.userData);
      this.role=localStorage.getItem('Role');
    })
  }
 

}
