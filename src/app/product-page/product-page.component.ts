import { Component, OnInit } from '@angular/core';
import { ParticularProductDetailService } from '../services/productService/particular-product-detail.service'
import { ProductDataService } from '../services/productService/product-data.service';
import { ProductData } from '../interfaces/product-data';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})

export class ProductPageComponent implements OnInit {

  product: ProductData[] = [];
  productId: number = 1;
  productData: any
  productImageUrl = environment.productImageUrl;
  productCategory: any
  expansionPlane = [];
  productExpansionPlane = 0;
  loaded = false;

  constructor(private _productDataService: ProductDataService, private _particularProductDataService: ParticularProductDetailService) {
  }

  ngOnInit(): void {
    this.productCategory = JSON.parse(this._particularProductDataService.getCategory());
    this._productDataService.typeOfProduct(this.productCategory);

    //for product data
    this._productDataService.fetchProductData().subscribe((Response: any) => {
      this.productId = parseInt(JSON.parse(this._particularProductDataService.get()))
      this.product = Response;
      this.storeParticularProductDetail();
      this.loaded = true;
      
    });

  }

  //remaining day before expire of product offer
  calculateDiffDays(expiredDate: any) {
    let currentDate: any = new Date();
    if (expiredDate == null) {
      return -1;
    }
    expiredDate = new Date(expiredDate);
    return Math.floor((expiredDate - currentDate) / (1000 * 60 * 60 * 24));
  }

  //storing particular product detail
  storeParticularProductDetail() {
    this.product.forEach(element => {
      if (element.productId == this.productId) {
        this.productData = element;
      }
    });
    this._productDataService.getCategory();
  }

  //array with 0 for explansion plane to differentiate decsribsion of discount
  differentiateDiscount(){
    this.productData.productDiscounts.forEach(element => {
      this.expansionPlane.push(0);
    });
  }

  //Expansion Plane opening and closing discount
  onExpansionPlane(indexDiscount: number) {
    if (this.expansionPlane[indexDiscount] == 0) {
      this.expansionPlane[indexDiscount] = 1;
    }
    else {
      this.expansionPlane[indexDiscount] = 0;
    }
  }

  //Expansion Plane opening and closing for product
  onProductExpansionPlane() {
    if (this.productExpansionPlane == 0) {
      this.productExpansionPlane = 1;
    }
    else {
      this.productExpansionPlane = 0;
    }
  }
}