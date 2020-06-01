import { TestBed } from '@angular/core/testing';

import { SpinnerRouterService } from './spinner-router.service';

describe('SpinnerRouterService', () => {
  let service: SpinnerRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
