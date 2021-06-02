import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlProductsService } from 'src/app/services/control-products.service';
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor(private _product:ControlProductsService,private _snack:MatSnackBar,private loginService :LoginService,private http:HttpClient) { }


  temp:any;
  admin=null;

  updproduct=null;
  ngOnInit(): void {
    this.updproduct=this._product.getUpdatedProduct();
    console.log(this.updproduct,"Product for update")
    this.admin=this.loginService.getUserCompleteDetail();
  }
  url="../../../../assets/logo.jpg";
  selectedFile=null
  onselectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.selectedFile=<File>e.target.files[0];
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }

  onUpload(pId){
    const fd= new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    // ,{
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    // }

    this.http.post(`${baseUrl}/product/insertImage/${pId}`,fd).subscribe(res=>{
      console.log(res);
    });

  }

  formSubmit(){
    if(this.updproduct.brandName.trim() =='' || this.updproduct.brandName==null){
      this._snack.open("Product Name Required !!",'Ok',{
        duration:3000,
      });
      return;
    }
    this._product.updateProduct(this.updproduct).subscribe(
      (data:any)=>{
        this.onUpload(this.updproduct.productId);
        localStorage.setItem('userDetail',JSON.stringify(data));
        Swal.fire("Success !!",'Product Updated Sucessfully','success');
        // window.location.reload();

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server Error !!','error');
      }
    );
  }




}
