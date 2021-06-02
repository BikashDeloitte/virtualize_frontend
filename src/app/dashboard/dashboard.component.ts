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
  highPerLinkToGoProductDetail = environment.highPerLinkToGoProductDetail;
  dialogBoxProduct: any;

  constructor(private _productDataService: ProductDataService, private _sendProductDetail: ParticularProductDetailService, private routerValue: ActivatedRoute, private spinnerService: NgxSpinnerService) {

  }

  typeOfProduct = this._productDataService.type

  ngOnInit(): void {
    // it will show loading spinner
    this.spinnerService.show("abc");

    //for product data
    this._productDataService.fetchProductData().subscribe((Response: any) => {
      this.productData = Response;
      // it will hide loading spinner
      this.spinnerService.hide("abc");
    });

    setTimeout(() => {
      this.spinnerService.hide("abc");
    }, 8000);

    //going to user dashboard through url
    this.routerValue.params.subscribe((Data) => {
      if (typeof (this.typeOfProduct) == "undefined") {
        this.typeOfProduct = Data.type
        this._productDataService.typeOfProduct(Data.type)

        //for product data
        this._productDataService.fetchProductData().subscribe((Response: any) => {
          this.productData = Response;
          // it will hide loading spinner
          this.spinnerService.hide("abc");
        });
      }
    })
  }

  //dialog box
  onClickProductData($event: Event) {
    this.flag2 = 1;
    this.flag = Number((<HTMLInputElement>$event.target).alt);

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
  onClickSendProductDetail($event: any) {
    this.productData.forEach(element => {
      if (element.productId == $event.target.target) {
        const category = element.categoryType
        this._sendProductDetail.set($event.target.target, category)
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