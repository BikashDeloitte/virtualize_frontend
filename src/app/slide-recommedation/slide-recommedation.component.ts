import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDataService } from '../services/productService/product-data.service';
import { RecommedationService } from '../services/recommedationService/recommedation.service';

@Component({
  selector: 'app-slide-recommedation',
  templateUrl: './slide-recommedation.component.html',
  styleUrls: ['./slide-recommedation.component.scss']
})
export class SlideRecommedationComponent implements OnInit {

  //index of array contain recommedation images id
  imageId = 0;
  imageIds: any

  // this variable conatin product image url fetch from environment.ts file.
  recommedationImage = environment.recommedationImage;

  constructor(private _recommedation: RecommedationService, private _productData: ProductDataService) {
  }

  ngOnInit(): void {

    //array contain recommedation image ids
    this._recommedation.fetchRecommedationImageIds().subscribe(data => {
      this.imageIds = data
    })
    this.autoSlider()
  }

  //use in dots part 
  currentSlide(n: number) {
    this.imageId = n;
  }

  //pre button on recommedation image
  plusSlidesPrev() {
    if (this.imageId == 0) {
      this.imageId = 2;
    }
    else {
      this.imageId = this.imageId - 1;
    }

  }

  //next button on recommedation image
  plusSlidesNext() {
    if (this.imageId == 2) {
      this.imageId = 0;
    }
    else {
      this.imageId = this.imageId + 1;
    }
  }

  // for auto slide
  autoSlider() {
    setTimeout(() => {
      if (this.imageId == 2) {
        this.imageId = 0;
      }
      else {
        this.imageId = this.imageId + 1;
      }
      this.autoSlider()
    }, 7000);
  }

  //sending the type of product to service
  onTypeOfProduct(type: String) {
    this._productData.typeOfProduct(type);
  }
}