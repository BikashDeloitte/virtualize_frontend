import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private snack: MatSnackBar, private loginService:LoginService,private router:Router ) { }

  public login={
    id:'',
    password:'',
    type:''
  };


  ngOnInit(): void {
  }

  check:boolean=false;
  func(){
    this.check=true;
  }

  loginUser(){
    this.login.type="USER";
  }
  loginAdmin(){
    this.login.type="ADMIN";
  }

  formSubmit(){
    // alert('submit');
    console.log(this.login);
    if(this.login.id.trim() == '' || this.login.id==null){
      alert('User is required !!');

      return;
    }
    if(this.login.password.trim() == '' || this.login.password==null){
      alert('Password is required !!');

      return;
    }

    this.loginService.getUser(this.login).subscribe(
      (data)=>{
        //Success
        console.log(data);


        if(this.loginService.generateToken(this.login)=="shashank-token"){
          //Login..
          this.loginService.loginUser(this.loginService.generateToken(this.login))
          this.loginService.setUser(this.login);
          this.loginService.setUserCompleteDetail(data);
          console.log(this.loginService.generateToken(this.login));
          //console.log(this.login);
        }
        else{
          console.log("Not found");
        }

        if(this.loginService.getUserRole() =="USER"){
          window.location.href="/"
          // this.router.navigate(['user-dashboard']);
          this.loginService.loginStatusSubject.next(true);
        }
        else if(this.loginService.getUserRole()=="ADMIN"){
          //window.location.href="/admin"
          this.router.navigate(['/admin']);
         this.loginService.loginStatusSubject.next(true);
        }else{
          this.loginService.logout();
        }


      },
      (error)=>{
        //error
        console.log(error);
        //alert("something went wrong");
        this.snack.open('User Not Registered !!','OK',{
          duration:3000,
        });
      }

    )


   }


}
