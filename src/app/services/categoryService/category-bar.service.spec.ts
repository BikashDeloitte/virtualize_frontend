import { TestBed } from '@angular/core/testing';

import { CategoryBarService } from './category-bar.service';

describe('CategoryBarService', () => {
  let service: CategoryBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
