import { TestBed } from '@angular/core/testing';

import { RecommedationService } from './recommedation.service';

describe('RecommedationService', () => {
  let service: RecommedationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommedationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
