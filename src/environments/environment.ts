// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  productCategoryStoresUrl: 'http://localhost:8090/productCategory/stores',
  productCategoryProductsUrl: 'http://localhost:8090/productCategory/products',
  productUrl: 'http://localhost:8090/product',
  productImageUrl: 'http://localhost:8090/product/image/',
  recommedationImageIds: 'http://localhost:8090/recommend/showRecommend',
  recommedationImage: 'http://localhost:8090/recommend/bar/',
  storeImageUrl: 'http://localhost:8090/admin/shop/image/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
