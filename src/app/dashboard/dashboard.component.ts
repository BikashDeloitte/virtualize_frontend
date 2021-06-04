import { Component, ErrorHandler, Input, OnInit } from '@angular/core';
import { ProductDataService } from '../services/productService/product-data.service';
import { ProductData } from '../interfaces/product-data';
import { environment } from '../../environments/environment';
import { ParticularProductDetailService } from '../services/productService/particular-product-detail.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  @Input() productData: ProductData[] = [];

  // this variable conatin product image url fetch from environment.ts file.
  productImageUrl = environment.productImageUrl;

  flag = 0;
  flag2 = 0;
  dialogBoxProduct: any;

  constructor(private _productDataService: ProductDataService, private _sendProductDetail: ParticularProductDetailService, private routerValue: ActivatedRoute, private spinnerService: NgxSpinnerService) {

  }

  typeOfProduct = this._productDataService.getCategory()

  ngOnInit(): void {
    // it will show loading spinner
    this.spinnerService.show();

    //for product data
    this._productDataService.fetchProductData().subscribe((Response: any) => {
      this.productData = Response;
      // it will hide loading spinner
      this.spinnerService.hide();
    });

    setTimeout(() => {
      this.spinnerService.hide();
    }, 8000);

    //going to user dashboard through url
    this.routerValue.params.subscribe((Data) => {
      //setting the category in local store
        this._sendProductDetail.setCategory(Data.type);

        //for product data again calling product details
        this._productDataService.fetchProductData().subscribe((Response: any) => {
          this.productData = Response;
          // it will hide loading spinner
          this.spinnerService.hide();
        });
      // }
    })
  }

  //dialog box
  onClickProductData(event: any) {
    this.flag2 = 1;
    this.flag = event;

    //dialog box product data
    this.productData.forEach(product => {
      if (product.productId == this.flag) {
        this.dialogBoxProduct = product;
      }
    });
  }

  //close dialog box
  onclickClose() {
    this.flag2 = 0;
  }

  /**
   * This function will return the maximum discount for the product.
   * @param array dicount list.
   * @returns maximum discount
   */
  getMaximumDiscount(discountArray: any[]): number {
    let maximum = 0;

    discountArray.forEach(discount => {
      maximum = Math.max(maximum, discount.discountPercentage);
    });
    return maximum;
  }

  //send data of product to service
  onClickSendProductDetail(event: any) {

    this.productData.forEach(element => {
      if (element.productId == event) {
        const category = element.categoryType
        this._sendProductDetail.set(event)
      }
    })
  }

  //remaining day before expire of product offer
  calculateDiffDays(expiredDate: any) {
    let currentDate: any = new Date();
    if (expiredDate == null || expiredDate == undefined) {
      return -1;
    }
    expiredDate = new Date(expiredDate);
    return Math.floor((expiredDate - currentDate) / (1000 * 60 * 60 * 24));
  }
}