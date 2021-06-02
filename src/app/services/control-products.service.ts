import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ControlProductsService {

  constructor(private _http:HttpClient) { }

  selectedShopProduct=null;
  selectStore(product){
    this.selectedShopProduct=product;
  }
  getSelectedStoreProduct(){
    return this.selectedShopProduct;
  }



  updProduct=null;

  public setUpdatedProduct(product){
    this.updProduct=product;

  }

  public getUpdatedProduct(){
    return this.updProduct;
  }

  //Add New Product
  public addProduct(product){
    return this._http.post(`${baseUrl}/admin/product/create`,product);
  }


  public updateProduct(product){
    return this._http.put(`${baseUrl}/admin/product/update`,product);

  }

  public deleteProduct(delProduct){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        adminId: delProduct.adminId,
        productId:delProduct.productId,
        shopId: delProduct.shopId
      },
    };

    return this._http.delete(`${baseUrl}/admin/product/delete`,options);
  }



}
