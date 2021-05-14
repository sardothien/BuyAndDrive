import { TestBed } from '@angular/core/testing';

import { LoggedUsersService } from './logged-users.service';

describe('LoggedUsersService', () => {
  let service: LoggedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
