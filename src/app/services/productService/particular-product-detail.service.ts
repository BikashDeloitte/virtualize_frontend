import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ParticularProductDetailService {

  constructor() { }

  //setting local store (productId)
  set(data: any): void {
      localStorage.setItem('key', JSON.stringify(data));
  }

  //setting local store (product type)
  setType(data: any): void {
    localStorage.setItem('type', JSON.stringify(data));
}
  //setting local store (product category)
  setCategory(category: any): void {
    localStorage.setItem('category', JSON.stringify(category));
}


  //getting local data (productId)
  get():any {   
    return localStorage.getItem('key');
  }

  //getting local data (product type or product name like jean)
  getType():any {   
    return localStorage.getItem('type');
  }

  //getting local data (productId)
  getCategory():any {   
    return localStorage.getItem('category');
  }

  //clear the local data (productId)
  clearLocal(){
    localStorage.clear();
  }
}
