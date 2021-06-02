import { Component, OnInit } from '@angular/core';
import { ControlProductsService } from 'src/app/services/control-products.service';
import { LoginService } from 'src/app/services/login.service';
import { StoresService } from 'src/app/services/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  userStores=null;
  delShop={
    "adminId": 0,
    "shopId": 0
  }
  updShop={
    "adminId": 0,
    "shopId": 0,
    "shopLocation": "",
    "shopName": ""
  }
  product={
    "brandName": "",
    "categoryType": "",
    "productDescription": "",
    "productId": 0,
    "productImage": "",
    "productName": "",
    "productPrice": 0,
    "productType": "",
    "shopId": 0
  }
  constructor(private _stores:StoresService, private loginService:LoginService,private _controlProduct:ControlProductsService) { }



  ngOnInit(): void {
    this.userStores=this.loginService.getUserCompleteDetail().adminShops;
    this.delShop.adminId=this.loginService.getUserCompleteDetail().adminId;
    this.updShop.adminId=this.loginService.getUserCompleteDetail().adminId;
    console.log(this.userStores);
  }
  // formSubmit(){
  //   if(this.store.shopName.trim() =='' || this.store.shopName==null){
  //     this._snack.open("Shop Name Required !!",'Ok',{
  //       duration:3000,
  //     });
  //     return;
  //   }
  //   this._store.addStore(this.store).subscribe(
  //     (data:any)=>{
  //       Swal.fire("Success !!",'Store Added Sucessfully','success');
  //     },
  //     (error)=>{
  //       console.log(error);
  //       Swal.fire('Error !!','Server Error !!','error');
  //     }
  //   );
  // }

  onUpdateStore(val){
      this.updShop.shopId=val.shopId;
      this._stores.setUpdatedShop(this.updShop);

  }
  onDelStore(val){
    this.delShop.shopId=val.shopId;
    console.log(this.delShop)
    this._stores.deleteStore(this.delShop).subscribe(
      (data:any) =>{
        console.log(data);

        localStorage.setItem('userDetail',JSON.stringify(data));
        alert("Your Store Deleted")
        // Swal.fire("Success !!",'Deleted Sucessfully','success');
        window.location.reload();

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server Error !!','error');
      }

    );

  }
  addProduct(store){
    this.product.shopId=store.shopId;
    this.product.brandName=store.shopName;
    console.log(this.product);
    this._controlProduct.selectStore(this.product);
  }

}
