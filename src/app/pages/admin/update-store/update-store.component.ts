import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { StoresService } from 'src/app/services/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.scss']
})
export class UpdateStoreComponent implements OnInit {

  store={
    "adminId": 1,
    "shopLocation": '',
    "shopName": ''
  };


  constructor(private _store:StoresService,private _snack:MatSnackBar,private loginService :LoginService) { }

  updShop=this._store.getUpdatedShop();
  ngOnInit(): void {
    this.store.adminId=this.loginService.getUserCompleteDetail().adminId;
    // console.log(this.store,"add-store shashank");
    console.log("Shashank",this.updShop);
  }
  formSubmit(){
    if(this.updShop.shopName.trim() =='' || this.updShop.shopName==null){
      this._snack.open("Shop Name Required !!",'Ok',{
        duration:3000,
      });
      return;
    }
    this._store.updateStore(this.updShop).subscribe(
      (data:any)=>{
        localStorage.setItem('userDetail',JSON.stringify(data));
         Swal.fire("Success !!",'Store Updated Sucessfully','success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server Error !!','error');
      }
    );
  }


}
