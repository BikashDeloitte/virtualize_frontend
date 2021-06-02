import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../services/productService/product-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  typesOfProduct = ["CLOTHS", "RESTAURANT", "MEDICINE", "FUNRITURE", "KITCHEN_UTENSILS"]
  typesOfProductImage = ["../../assets/images/clothes.png", "../../assets/images/restaurant.png",
    "../../assets/images/medician.jpg", "../../assets/images/funriture.png", "../../assets/images/kitchen.png"]

  constructor(private _productData: ProductDataService) { }

  ngOnInit(): void {
  }

  //sending the type of product to service
  onTypeOfProduct(type: String) {
    this._productData.typeOfProduct(type);
  }
}