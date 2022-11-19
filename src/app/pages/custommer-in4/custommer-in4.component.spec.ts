import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommerIn4Component } from './custommer-in4.component';

describe('CustommerIn4Component', () => {
  let component: CustommerIn4Component;
  let fixture: ComponentFixture<CustommerIn4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommerIn4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustommerIn4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
