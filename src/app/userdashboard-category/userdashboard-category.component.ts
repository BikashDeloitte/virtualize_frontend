import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProductData } from '../interfaces/product-data';
import { environment } from '../../environments/environment';
import { ProductDataService } from '../services/productService/product-data.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryBarService } from '../services/categoryService/category-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-userdashboard-category',
  templateUrl: './userdashboard-category.component.html',
  styleUrls: ['./userdashboard-category.component.scss']
})
export class UserdashboardCategoryComponent implements OnInit {
  @Output() productEmitter = new EventEmitter<ProductData[]>();

  priceBar = [
    { value: 1000, isSelected:false},
    { value: 5000, isSelected:false},
    { value: 10000, isSelected:false}
  ];

  discountBar = [
    { value: 10, isSelected:false},
    { value: 20, isSelected:false},
    { value: 50, isSelected:false}
  ];

  storeSet = new Set<string>();
  productSet = new Set<string>();
  sizeSet = new Set<string>();
  genderSet = new Set<string>();

  // it contain all product item data.
  productData: ProductData[] = [] ;

  storeNames: string[] = [];
  productNames: string[] = [];

  // this will indiacte what type of product user check
  productType:string ;

  constructor(private categoryBarService: CategoryBarService,
    private activatedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    // get course id from url
    // get course on the basis of course id
    this.activatedRoute.params.subscribe( (param) => {
        this.productType = param.type;
    });

    // // fectch all stores name
    this.categoryBarService.fetchStoresNames(this.productType).subscribe( (Response: any) => {
      this.storeNames = Response;
    });

    // // fetch all product item name
    this.categoryBarService.fetchProductNames(this.productType).subscribe( (Response: any) => {
      this.productNames = Response;
    });

    // // fetch all product items
    this.categoryBarService.fetchProductData(this.productType).subscribe( (Response: any) => {
      this.productData = Response;
      this.spinnerService.hide();
    });
  }

  /**
   * This function will fetch the data from apis and return to the front end
   */
  getAllStoreName(): string[] {
    return this.storeNames;
  }

  getAllProductName(): string[] {
    return this.productNames;
  }

  // this will lisen when store click
  getStore(event: any): void {
    this.setValue(this.storeSet, event.value );
  }

  /**
   * This function will set the product name in filter list.
   * @param event
   */
  getProduct(event: any): void {
    this.setValue(this.productSet, event.value);
  }

  /**
   * This function will check the price box.
   * And only one box is check at a time.
   * @param event event tag
   */
  getPrice(event: any): void {
    // only one checkbox active at a time.
    this.priceBar.forEach( price => {
      if(price.value == event.value && price.isSelected == false) {
        price.isSelected = true;
      } else {
        price.isSelected = false;
      }
    });

    // call show data method
    this.setShowData();
  }

  /**
   * This function will set the active discont bar at a time.
   * Only one checkbox active at a time.
   * @param event event tag
   */
  getDiscount(event: any): void {

    // only one checkbox active at a time.
    this.discountBar.forEach( discount => {
      if(discount.value == event.value && discount.isSelected == false) {
        discount.isSelected = true;
      } else {
        discount.isSelected = false;
      }
    });

    // call show data method
    this.setShowData();
  }

  // this will lisen when size click
  getSize(event: any): void {
    this.setValue(this.sizeSet, event.value );
  }

  // this will lisen when gender click
  getGender(event: any): void {
    this.setValue(this.genderSet, event.value );
  }

  /**
   * This function will add the value in the set object.
   * @param set set object
   * @param value value add in set
   */
  setValue(set: any, value:string) {
    if(set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }
    this.setShowData();
  }

  /**
   * This function filter the data and will show on the dashboard.
   * @returns list of product.
   */
  setShowData()  {

    let storeFilter: ProductData[] = [];


// open-----------------------------------------------------------------------------------------
    // select on the basis of store name
    this.productData.forEach( product => {
      // if brand is present in the list or list is empty
      if(this.storeSet.size == 0 || this.storeSet.has(product.brandName)) {
        storeFilter.push(product);
      }
    });
// close-----------------------------------------------------------------------------------------


// open-----------------------------------------------------------------------------------------
    // filter on the basis of product item
    let productNameFilter: ProductData[] = [];

    storeFilter.forEach( product => {
      // if brand is present in the list or list is empty
      if(this.productSet.size == 0 || this.productSet.has(product.productName) ) {
        productNameFilter.push(product);
      }
    });
// close-----------------------------------------------------------------------------------------


//  open -----------------------------------------------------------------------------------------
    // filter on the basis of price
    let priceFilter: ProductData[] = [];
    let maxPrice:number = 0;

    this.priceBar.forEach( price => {
      if(price.isSelected == true) {
        maxPrice = Math.max(maxPrice, price.value);
      }
    });

    productNameFilter.forEach(product => {
      if(maxPrice == 0 || product.productPrice <= maxPrice) {
        priceFilter.push(product);
      }
    });
// close-----------------------------------------------------------------------------------------

// open-----------------------------------------------------------------------------------------
    // filter on the basis of discount
    let discountFilter: ProductData[] = [];
    let minDiscount:number = 100;

    this.discountBar.forEach(discount => {
      if(discount.isSelected == true) {
        minDiscount = Math.min(minDiscount, discount.value);
      }
    });

    priceFilter.forEach( product => {
      if(minDiscount == 100 ) {
        discountFilter.push(product);
      } else {
        let productPushed = false;
        // check if any discount will less than given criteria, then it will sho to the user
        product.productDiscounts.forEach( discount => {
          if(discount.discountPercentage >= minDiscount && productPushed == false) {
            discountFilter.push(product);
            productPushed = true;
          }
        });
      }
    });
// close-----------------------------------------------------------------------------------------



    //  // filter on the basis of gender
    //  let genderFilter: ProductData[] = [];

    //  discountFilter.forEach( product => {
    //    if(this.genderSet.size == 0 || this.genderSet.has(product.productType)) {
    //      genderFilter.push(product);
    //    }
    //  });

    //  // filter on the basis of size
    //  let sizeFilter: ProductData[] = [];

    //  genderFilter.forEach( product => {
    //    if(this.sizeSet.size == 0 || this.sizeSet.has(product.productSize)) {
    //      sizeFilter.push(product);
    //    }
    //  });

    this.productEmitter.emit(discountFilter);
  }
}
