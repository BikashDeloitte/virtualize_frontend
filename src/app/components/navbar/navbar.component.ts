import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  isLoggedIn=false;
  user=null;
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.loginService.isLoggedIn();
    this.user=this.loginService.gotUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginService.isLoggedIn();
      this.user=this.loginService.gotUser();
    })
  }

  public logout(){
    this.loginService.logout();
    //this.loginService.loginStatusSubject.next(false);
    window.location.reload();
  }

}
