import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCarsComponent } from './approve-cars.component';

describe('ApproveCarsComponent', () => {
  let component: ApproveCarsComponent;
  let fixture: ComponentFixture<ApproveCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
