import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WelcomeAdminService {

  constructor() { }

  temp=null;
  setSelectedShop(data){

    this.temp=data;

  }

  getSelectedShop(){
    // console.log(this.temp,"welcome-service");
    return this.temp;
  }
}
