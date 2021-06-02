import { TestBed } from '@angular/core/testing';

import { ParticularProductDetailService } from './particular-product-detail.service';

describe('ParticularProductDetailService', () => {
  let service: ParticularProductDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularProductDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
