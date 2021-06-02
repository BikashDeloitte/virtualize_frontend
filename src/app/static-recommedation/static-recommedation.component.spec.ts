import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticRecommedationComponent } from './static-recommedation.component';

describe('StaticRecommedationComponent', () => {
  let component: StaticRecommedationComponent;
  let fixture: ComponentFixture<StaticRecommedationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticRecommedationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticRecommedationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
