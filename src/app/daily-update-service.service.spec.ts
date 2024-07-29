import { TestBed } from '@angular/core/testing';

import { DailyUpdateServiceService } from './daily-update-service.service';

describe('DailyUpdateServiceService', () => {
  let service: DailyUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
