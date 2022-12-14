import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlProductsService } from 'src/app/services/control-products.service';
import baseUrl from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {


  constructor(private _product:ControlProductsService,private _snack:MatSnackBar,private loginService :LoginService,private http:HttpClient) { }
  shopProduct=null;
  admin=null;
  temp:any;
  ngOnInit(): void {
    this.shopProduct=this._product.getSelectedStoreProduct();
    this.shopProduct.adminId=this.loginService.getUserCompleteDetail().adminId;
    this.admin=this.loginService.getUserCompleteDetail();
    console.log(this.admin,"shashank");
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
    if(this.shopProduct.brandName.trim() =='' || this.shopProduct.brandName==null){
      this._snack.open("Shop Name Required !!",'Ok',{
        duration:3000,
      });
      return;
    }
    this._product.addProduct(this.shopProduct).subscribe(
      (data:any)=>{
        console.log(data);
        console.log(data.adminShops)
        let selProduct=null;
        let foundProductId:any;
        this.temp=[];
        for(var j=0;j<this.admin.adminShops.length;j++){
          if(this.admin.adminShops[j].shopId==this.shopProduct.shopId){
            for(var k=0;k<this.admin.adminShops[j].shopProducts.length;k++){
              this.temp.push(this.admin.adminShops[j].shopProducts[k].productId)

            }

          }

        }
        console.log(this.temp);
        for(var i=0;i<data.adminShops.length;i++){
          if(data.adminShops[i].shopId==this.shopProduct.shopId){
            for(var l=0;l<data.adminShops.length;l++){
              if(data.adminShops[l].shopId==this.shopProduct.shopId){
                for(var m=0;m<data.adminShops[l].shopProducts.length;m++){
                  if(this.temp.includes(data.adminShops[l].shopProducts[m].productId)){

                }
                else{
                  foundProductId=data.adminShops[l].shopProducts[m].productId
                }

              }

            }

          }
        }
        }
        console.log(foundProductId);
        this.onUpload(foundProductId);
        localStorage.setItem('userDetail',JSON.stringify(data));
        Swal.fire("Success !!",'Product Added Sucessfully','success');
        // window.location.reload();

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server Error !!','error');
      }
    );
  }





}
