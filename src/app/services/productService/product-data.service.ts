import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

   http:HttpClient;
    type:any

  constructor(http:HttpClient, private spinnerService: NgxSpinnerService) {
    this.http = http;
  }

  /**
   * This function will fetch all the product details form apis.
   */
   fetchProductData(){
    const productDataUrl= environment.productUrl + "/" + this.type;
    return this.http.get(productDataUrl).pipe(retry(1),catchError(this.httpErrorProduct));
  }

  //getting and storing the tpye of product
  typeOfProduct(type: String){
     this.type=type;
  }

  //error handling for product api fail
  httpErrorProduct(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}\n Due to serve fail, page is not working`;
    }
    window.alert(msg)
    return throwError(msg);
  }
}
