import { Component, OnInit} from '@angular/core';
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
  //remove of error this was happaning due to ngOnInit slow loading
  loaded = false;

  // this variable conatin product image url fetch from environment.ts file.
  recommedationImage = environment.recommedationImage;
  count:any
  diff:any

  constructor(private _recommedation: RecommedationService,
     private _productData: ProductDataService,
     ) {
  }

  ngOnInit(): void {

    //array contain recommedation image ids
    this._recommedation.fetchRecommedationImageIds().subscribe(data => {
      this.imageIds = data
      this.loaded = true;
      this.countTimes()
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

//differences in given time and current time
  calculateDifferentTime(expiredDate: any) {
    // let expiredDate = this.imageIds[this.imageId].endDate
    let currentDate: any = new Date();
    if (expiredDate == null) {
      return -1;
    }
    // expiredDate = new Date(expiredDate);
    // this.diff = (expiredDate - currentDate);
    return (expiredDate - currentDate);
  }

  //time count down of expire date
  countTimes(){
    setInterval(()=>{
      var diff = this.calculateDifferentTime(this.imageIds[this.imageId].endDate)
      var days = Math.floor(diff/(1000*24*60*60))
      var hour = Math.floor((diff % (1000*60*60*24))/(1000*60*60))
      var min = Math.floor((diff % (1000*60*60))/(1000*60))
      var sec = Math.floor((diff % (1000*60))/(1000))
      this.count = days + "d " + hour + "h " + min + "m " + sec + "s";
    })
  }

}