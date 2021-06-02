import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { WelcomeAdminService } from 'src/app/services/welcome-admin.service';
import {environment} from '../../../../environments/environment';
import {ShopData} from '../../../interfaces/shop-data';



@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrls: ['./welcome-admin.component.scss']
})
export class WelcomeAdminComponent implements OnInit {

  // constructor(private stores:StoresService) { }

  shop:ShopData[]=[];
  shopId:number=4;
  shopData:any;
  shopImageUrl=environment.storeImageUrl;

  constructor(private welAdminService:WelcomeAdminService,private loginService:LoginService) {}
  storesD=null;
  ngOnInit(): void {

    this.storesD=this.loginService.getUserCompleteDetail().adminShops;

    console.log(this.storesD);

  }
    selectShop(data:any){
    console.log(data.shopName);
    this.welAdminService.setSelectedShop(data.shopName);

  }

}
