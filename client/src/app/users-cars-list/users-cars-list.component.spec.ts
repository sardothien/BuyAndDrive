import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCarsListComponent } from './users-cars-list.component';

describe('UsersCarsListComponent', () => {
  let component: UsersCarsListComponent;
  let fixture: ComponentFixture<UsersCarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
