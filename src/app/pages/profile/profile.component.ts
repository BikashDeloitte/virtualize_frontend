import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user=null;
  userCompleteDetails=null;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.user=this.loginService.gotUser();
    this.userCompleteDetails=this.loginService.getUserCompleteDetail();
    // console.log(this.userCompleteDetails,"Admin Profile");
    // console.log(this.user,"Admin Detail");

  }

}
