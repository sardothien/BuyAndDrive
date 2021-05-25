import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCarComponent } from './approve-car.component';

describe('ApproveCarComponent', () => {
  let component: ApproveCarComponent;
  let fixture: ComponentFixture<ApproveCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
