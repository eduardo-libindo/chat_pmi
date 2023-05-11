import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let admin: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    admin = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(admin).toBeTruthy();
  });
});
