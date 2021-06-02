import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideRecommedationComponent } from './slide-recommedation.component';

describe('SlideRecommedationComponent', () => {
  let component: SlideRecommedationComponent;
  let fixture: ComponentFixture<SlideRecommedationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideRecommedationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideRecommedationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
