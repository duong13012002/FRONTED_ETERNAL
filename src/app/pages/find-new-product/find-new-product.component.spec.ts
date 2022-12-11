import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindNewProductComponent } from './find-new-product.component';

describe('FindNewProductComponent', () => {
  let component: FindNewProductComponent;
  let fixture: ComponentFixture<FindNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindNewProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
