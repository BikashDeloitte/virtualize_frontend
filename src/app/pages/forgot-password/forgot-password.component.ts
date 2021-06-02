import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  data={
    to:"",
    subject:"Reset Your Password",
    message:""

  }

  flag:boolean=false;

  constructor(private emailService:ForgotPasswordService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  doSubmitForm(){
    console.log("Trying to submit form");
    console.log("Data",this.data);
    if(this.data.to=='' || this.data.subject=='' || this.data.message==''){
      this.snack.open('Fields can not be empty !!',"OK");
      return;
    }
    this.flag=true;
    this.emailService.sendEmail(this.data).subscribe(
      response=>{
        console.log(response);
        this.flag=false;
        this.snack.open("Send Success","OK");
      },
      error=>{
        console.log(error);
        this.flag=false;
        this.snack.open("Error","OK");
      }

    )
  }

}
