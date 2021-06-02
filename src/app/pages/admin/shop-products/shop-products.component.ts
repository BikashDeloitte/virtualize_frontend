import { Component, OnInit } from '@angular/core';
import { ControlProductsService } from 'src/app/services/control-products.service';
import { LoginService } from 'src/app/services/login.service';
import { WelcomeAdminService } from 'src/app/services/welcome-admin.service';
import Swal from 'sweetalert2';
import {environment} from '../../../../environments/environment';
import { ProductData} from '../../../interfaces/product-data';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss']
})
export class ShopProductsComponent implements OnInit {
  product: ProductData[];
  productId: number=1;
  productDetails: any
  productImageUrl = environment.productImageUrl;


  delProduct={
    "adminId": 0,
    "productId": 0,
    "shopId": 0
  }

  updProduct={
    "adminId": 0,
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

  adminStores=null;
  x:any
  t:any


  constructor(private loginService:LoginService,private wlcAdmService:WelcomeAdminService,private _product:ControlProductsService) { }

  ngOnInit(): void {

    this.adminStores=this.loginService.getUserCompleteDetail().adminShops;//[0].shopProducts;
    this.delProduct.adminId=this.loginService.getUserCompleteDetail().adminId;
    this.updProduct.adminId=this.loginService.getUserCompleteDetail().adminId;
    console.log(this.adminStores,"products");
  }


  nameSearch:string='';
  // temp=this.wlcAdmService.getSelectedShop();
  // if(temp){
  //   this.nameSearch=temp;
  // }



  onUpdateProduct(product,store){
    this.updProduct.shopId=store.shopId;
    this.updProduct.brandName=store.shopName;
    this.updProduct.productId=product.productId;
    this.updProduct.productName=product.productName;

    this._product.setUpdatedProduct(this.updProduct);

    console.log(product,store,"shashank");

  }

  onDeleteProduct(product,store){
    this.delProduct.shopId=store.shopId;
    this.delProduct.productId=product.productId;

    this._product.deleteProduct(this.delProduct).subscribe(
      (data:any) =>{
        console.log(data);
        localStorage.setItem('userDetail',JSON.stringify(data));
        alert("Your Product Deleted")
        // Swal.fire("Success !!",'Deleted Sucessfully','success');
        window.location.reload();

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Server Error !!','error');
      }

    );

  }
  searchProducts=()=>{

    var input= (<HTMLInputElement>document.getElementById('myInput'));
    var filter=input.value.toUpperCase();
    var tab= document.getElementsByClassName('shop-Products');
    for(var i=0;i<tab.length;i++){
      var temp= tab[i];
      if(temp){
        var textvalue=temp.textContent || temp.innerHTML;
        if(textvalue.toUpperCase().indexOf(filter)>-1){
          (document.getElementsByClassName('shop-product-card')as HTMLCollectionOf<HTMLElement>)[i].style.display="";
        }
        else{
          (document.getElementsByClassName('shop-product-card')as HTMLCollectionOf<HTMLElement>)[i].style.display="None";
        }
      }
    }

  }



}
