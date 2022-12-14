import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }
  public user={
    userName:'',
    userPassword:'',
    userEmail:'',
    location:''
  };

  ngOnInit(): void {}
  formSubmit(){
    // alert('submit');
    console.log(this.user);
    if(this.user.userName == '' || this.user.userName==null){
      alert('User is required !!');


      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //Success
        console.log(data);
        Swal.fire('Success','user is registered','success');
      },
      (error)=>{
        //error
        console.log(error);
        this.snack.open('User is already Registered !!','',{
          duration:3000,
        });
      }
    )


    }
    handleClear(){
      this.user={
        userName:'',
        userPassword:'',
        userEmail:'',
        location:''
      }
    }

}


