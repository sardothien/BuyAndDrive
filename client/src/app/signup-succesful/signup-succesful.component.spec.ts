import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccesfulComponent } from './signup-succesful.component';

describe('SignupSuccesfulComponent', () => {
  let component: SignupSuccesfulComponent;
  let fixture: ComponentFixture<SignupSuccesfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSuccesfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSuccesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
