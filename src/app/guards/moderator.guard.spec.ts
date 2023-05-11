import { TestBed } from '@angular/core/testing';

import { ModeratorGuard } from './moderator.guard';

describe('ModeratorGuard', () => {
  let moderator: ModeratorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    moderator = TestBed.inject(ModeratorGuard);
  });

  it('should be created', () => {
    expect(moderator).toBeTruthy();
  });
});
